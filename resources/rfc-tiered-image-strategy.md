# RFC: Tiered Image Layering Strategy for Ansible Dev Spaces

| Field | Value |
|---|---|
| **Status** | Draft — open for discussion |
| **Author** | Leo Gallego |
| **Date** | April 27, 2026 |
| **Tracking** | [ansible-devspaces-cop#1](https://github.com/leogallego/ansible-devspaces-cop/issues/1) |
| **Related** | [ansible/ansible-dev-tools#738](https://github.com/ansible/ansible-dev-tools/issues/738), [redhat-cop/devspaces-images](https://github.com/redhat-cop/devspaces-images), [rhpds/ansible-dev-tools-automation#14](https://github.com/rhpds/ansible-dev-tools-automation/issues/14) |

---

## Table of Contents

1. [Summary](#1-summary)
2. [Problem Statement](#2-problem-statement)
3. [Proposed Solution: Tiered Image Layers](#3-proposed-solution-tiered-image-layers)
4. [Tier 2 — Org-Wide Image (Core Approach)](#4-tier-2--org-wide-image-core-approach)
5. [Tier 3 — Per-Team Image Layers](#5-tier-3--per-team-image-layers)
6. [Tier 4 — Optional Personal Image Layer](#6-tier-4--optional-personal-image-layer)
7. [Production Scale: CEKit Factory Model (Hybrid)](#7-production-scale-cekit-factory-model-hybrid)
8. [Adoption Guidance](#8-adoption-guidance)
9. [Registry Strategy](#9-registry-strategy)
10. [Security and Governance](#10-security-and-governance)
11. [Image Lifecycle and Sprawl Management](#11-image-lifecycle-and-sprawl-management)
12. [Rollback and Recovery](#12-rollback-and-recovery)
13. [Developer Experience Integration](#13-developer-experience-integration)
14. [AAP Self-Service Portal Integration](#14-aap-self-service-portal-integration)
15. [Operational Cost Estimates](#15-operational-cost-estimates)
16. [Alternatives Considered](#16-alternatives-considered)
17. [Success Criteria](#17-success-criteria)
18. [Ownership Summary](#18-ownership-summary)
19. [Proposed Timeline](#19-proposed-timeline)
20. [Open Questions](#20-open-questions)
21. [References](#21-references)

---

## 1. Summary

This RFC proposes a tiered container image layering strategy for Ansible Dev Spaces. The approach uses standard OpenShift build primitives (ImageStreams and BuildConfigs) to produce customized developer environment images without modifying the upstream base or breaking container immutability. A 4-tier model allows org-wide, team-level, and optional personal customizations, each managed independently and auto-rebuilt when upstream images change.

---

## 2. Problem Statement

The upstream `ansible-devspaces` image has `/var` read-only at runtime, which prevents `dnf install` for additional system packages. Making `/var` writable is an anti-pattern for container immutability.

Different teams need different system-level dependencies depending on what they automate:

- **Network teams** need `libssh-devel`, `python3-netaddr`
- **Windows teams** need `krb5-workstation`, `python3-pykerberos`
- **AAP config-as-code teams** need `httpie`, `python3-pyyaml`

A single shared image either bloats with every team's packages or satisfies no one. Rather than patching `/var` permissions or waiting for every package to be baked upstream, we can layer custom images on top of the upstream base using standard container build patterns.

---

## 3. Proposed Solution: Tiered Image Layers

A 4-tier model where each tier adds specificity without affecting others:

| Tier | Scope | What It Provides | Managed By |
|---|---|---|---|
| **1 — Upstream** | Everyone | Base Ansible dev tooling | `ansible-dev-tools` project |
| **2 — Org / Domain** | Everyone in a domain | Domain-specific packages (network, AAP, Windows...) | Platform team |
| **3 — Team** | One team | Team-specific extras | Team lead |
| **4 — Personal** | One developer | Individual niche needs (opt-in) | Individual developer |

### Visual overview

```
  Upstream base (ansible-devspaces)
       |
       v
  Org/domain image
       |  common or domain-specific extras
       |
       +----------------------+----------------------+
       v                      v                      v
  Network team             AAP CaC team          Windows team
  + libssh-devel           + httpie               + krb5-workstation
  + python3-netaddr        + python3-pyyaml       + python3-pykerberos
       |                      |                      |
       v                      v                      v
  [Optional]              [Optional]              [Optional]
  Personal layers         Personal layers         Personal layers
```

---

## 4. Tier 2 — Org-Wide Image (Core Approach)

Use an ImageStream + BuildConfig pair to build and maintain a custom image that layers extra packages on top of the upstream base — entirely within the cluster, no external CI or registry needed.

### 4.1 Architecture

```
  ghcr.io/ansible/ansible-devspaces:v26.4.5
       |
       v
  ImageStream (ansible-devspaces-base)
       |  scheduled import (polls for tag changes)
       |
       v  triggers rebuild
  BuildConfig (ansible-devspaces-custom)
       |  applies Containerfile: dnf install ...
       |
       v  pushes to
  ImageStream (ansible-devspaces-custom)
       |  internal registry
       |
       v  referenced by
  devfile.yaml / DevWorkspace spec
```

### 4.2 Auto-Rebuild Behavior

- When the upstream image publishes a new version at the same tag, the base ImageStream detects the change (`importPolicy.scheduled: true`) and triggers a new build automatically.
- When the BuildConfig itself changes (e.g., adding a new package), a `ConfigChange` trigger fires a rebuild.
- No manual intervention needed in either case.

### 4.3 Resource Definitions

**ImageStreams:**

```yaml
apiVersion: image.openshift.io/v1
kind: ImageStream
metadata:
  name: ansible-devspaces-base
spec:
  tags:
    - name: latest
      from:
        kind: DockerImage
        name: ghcr.io/ansible/ansible-devspaces:v26.4.5
      importPolicy:
        scheduled: true
      referencePolicy:
        type: Local
---
apiVersion: image.openshift.io/v1
kind: ImageStream
metadata:
  name: ansible-devspaces-custom
spec: {}
```

**BuildConfig (with inline Containerfile):**

```yaml
apiVersion: build.openshift.io/v1
kind: BuildConfig
metadata:
  name: ansible-devspaces-custom
spec:
  source:
    type: Dockerfile
    dockerfile: |
      FROM ghcr.io/ansible/ansible-devspaces:v26.4.5
      USER root
      RUN dnf install -y pinentry-curses && dnf clean all
      USER 1000
  strategy:
    type: Docker
    dockerStrategy:
      from:
        kind: ImageStreamTag
        name: ansible-devspaces-base:latest
  output:
    to:
      kind: ImageStreamTag
      name: ansible-devspaces-custom:latest
  triggers:
    - type: ImageChange
      imageChange: {}
    - type: ConfigChange
```

> **Note:** `dockerStrategy.from` overrides the `FROM` in the inline Dockerfile at build time. This connects the ImageStream trigger to the actual build — even though the Dockerfile says a specific tag, the build resolves it through the ImageStream.

**Devfile image reference:**

```yaml
image: image-registry.openshift-image-registry.svc:5000/<namespace>/ansible-devspaces-custom:latest
```

### 4.4 Where the Containerfile Lives

For simple layers (a few `dnf install` lines), **inline in the BuildConfig** is recommended — self-contained, no git dependency at build time. If customizations grow complex (multi-stage builds, many packages, config files), migrate to a dedicated Containerfile in a git repo.

---

## 5. Tier 3 — Per-Team Image Layers

Each team maintains a Containerfile at the root of their workspace repo, alongside the devfile. A BuildConfig in a team namespace layers on top of the org-wide image.

### 5.1 Architecture

```
  Upstream base (ansible-devspaces)
       |
       v
  Org-wide image (shared BuildConfig in infra namespace)
       |  common extras: pinentry-curses, jq, etc.
       |
       +----------------------+----------------------+
       v                      v                      v
  Network team             AAP CaC team          Windows team
  + libssh-devel           + httpie               + krb5-workstation
  + python3-netaddr        + python3-pyyaml       + python3-pykerberos
       |                      |                      |
       v                      v                      v
  Team devfile             Team devfile            Team devfile
  (points to team image)   (points to team image)  (points to team image)
```

### 5.2 Implementation

**Team BuildConfig:**

```yaml
apiVersion: build.openshift.io/v1
kind: BuildConfig
metadata:
  name: devspaces-network-team
  namespace: ansible-network-devspaces
spec:
  source:
    type: Git
    git:
      uri: https://github.com/myorg/ansible-network-workspace.git
      ref: main
  strategy:
    type: Docker
    dockerStrategy:
      dockerfilePath: Containerfile
      from:
        kind: ImageStreamTag
        namespace: <infra-namespace>
        name: ansible-devspaces-custom:latest
  output:
    to:
      kind: ImageStreamTag
      name: devspaces-network-team:latest
  triggers:
    - type: ImageChange
      imageChange: {}
    - type: ConfigChange
```

**Team Containerfile (minimal):**

```dockerfile
FROM ansible-devspaces-custom:latest
USER root
RUN dnf install -y \
      libssh-devel \
      python3-netaddr \
    && dnf clean all
USER 1000
```

**Team devfile.yaml:**

```yaml
components:
  - name: ansible
    container:
      image: image-registry.openshift-image-registry.svc:5000/ansible-network-devspaces/devspaces-network-team:latest
```

### 5.3 Auto-Rebuild Chain

```
upstream tag changes
  -> org-wide ImageStream detects it
    -> org-wide BuildConfig rebuilds
      -> team ImageStream detects org-wide output changed
        -> team BuildConfig rebuilds
```

No manual intervention at any tier.

### 5.4 Why Team-Level, Not Per-User

- **Manageable number of builds** — a handful of team images vs. one per developer.
- **Package lists are version-controlled and reviewed** — Containerfile in git, not ad-hoc edits.
- **Shared context** — teammates working on the same collection/domain need the same packages.
- **Escape hatches exist** — users who need something extra can still use user-space tools (`pip install`, direct binary downloads) or request an opt-in personal layer (Tier 4).

### 5.5 Ownership Model

| Concern | Owner |
|---|---|
| Upstream base image version | Platform admin (org-wide ImageStream tag) |
| Org-wide extra packages | Platform admin (org-wide BuildConfig) |
| Team-specific packages | Team lead (team Containerfile in git) |
| Personal one-off tools | Individual developer (user-space install, or opt-in personal layer) |

---

## 6. Tier 4 — Optional Personal Image Layer

### 6.1 When to Use Tier 4

- A developer needs a system package no one else on the team needs.
- The package requires system-level installation (not solvable with `pip install` or a binary download).
- The need is ongoing, not a one-off experiment (use nested Podman for those).
- If multiple individuals on the same team end up needing the same package, promote it to Tier 3.

### 6.2 Workflow

The user forks their team's workspace repo and modifies two files:

```
jsmith-ansible-network-workspace/         # fork of team workspace repo
+-- Containerfile                         # MODIFIED - layers on TEAM image
|     FROM devspaces-network-team:latest
|     USER root
|     RUN dnf install -y niche-package-xyz && dnf clean all
|     USER 1000
+-- devfile.yaml                          # MODIFIED - points to PERSONAL image
+-- devspaces.code-workspace              # unchanged from team
```

**Personal BuildConfig:**

```yaml
apiVersion: build.openshift.io/v1
kind: BuildConfig
metadata:
  name: devspaces-personal
  namespace: jsmith-devspaces
spec:
  source:
    type: Git
    git:
      uri: https://github.com/jsmith/ansible-network-workspace.git
      ref: main
  strategy:
    type: Docker
    dockerStrategy:
      dockerfilePath: Containerfile
      from:
        kind: ImageStreamTag
        namespace: ansible-network-devspaces
        name: devspaces-network-team:latest
  output:
    to:
      kind: ImageStreamTag
      name: devspaces-personal:latest
  triggers:
    - type: ImageChange
      imageChange: {}
    - type: ConfigChange
```

### 6.3 Full Auto-Rebuild Cascade

```
upstream tag changes
  -> org-wide ImageStream detects it
    -> org-wide BuildConfig rebuilds (tier 2)
      -> team ImageStream detects org-wide output changed
        -> team BuildConfig rebuilds (tier 3)
          -> personal ImageStream detects team output changed
            -> personal BuildConfig rebuilds (tier 4)
```

### 6.4 Operational Comparison

| Factor | 3 Tiers (Team) | 4 Tiers (+ Personal Opt-In) |
|---|---|---|
| Repos | 1 automation + 1 per team | Same + 1 fork per opted-in user |
| BuildConfigs | 1 org-wide + 1 per team | Same + 1 per opted-in user |
| Rebuild cascade on upstream change | upstream -> org -> teams (minutes) | Same + opted-in users (a few more minutes) |
| Node image cache | One image per team | + one unique image per opted-in user |
| Support burden | Team lead owns team build | Individual owns personal build |
| Fork drift | None | User must pull upstream periodically |

### 6.5 Recommendation

- Tiers 1-3 are the **standard path** — provision them for every team by default.
- Tier 4 is **opt-in** — only create personal BuildConfigs on request.
- Document the self-service process: "Fork your team repo, add your packages to the Containerfile, request a BuildConfig in your namespace."
- If the same package shows up in multiple personal layers on the same team, promote it to Tier 3.

---

## 7. Production Scale: CEKit Factory Model (Hybrid)

For organizations with 5+ domain variants, a centralized image factory using CEKit can manage Tier 2 more efficiently. The tiered approach (Tiers 3-4) and the factory model aren't competing — they solve different problems at different layers and combine naturally.

### 7.1 Hybrid Architecture

| Layer | Approach | Managed By | Where It Builds |
|---|---|---|---|
| Tier 1 — Upstream | External image | `ansible-dev-tools` project | GHCR |
| Tier 2 — Domain variants | **Factory (CEKit)** | Platform team | CI -> Quay.io |
| Tier 3 — Team | **Tiered (Containerfile)** | Team lead | OpenShift BuildConfig |
| Tier 4 — Personal | **Tiered (fork)** | Individual | OpenShift BuildConfig |

```
  Upstream base (ansible-devspaces)
       |
       v
  Factory repo (CEKit)                        <- platform team, central CI
       |  modules composed into domain variants
       +-- devspaces-ansible-network
       +-- devspaces-ansible-aap
       +-- devspaces-ansible-windows
       |
       v  published to Quay.io
  ImageStream (tracks factory output)         <- OpenShift cluster
       |
       v  triggers rebuild
  Team BuildConfig (Containerfile)            <- team workspace repo
       |  + team-specific extras
       |
       v  triggers rebuild
  Personal BuildConfig (fork)                 <- user fork
            + individual extras
```

### 7.2 Why This Split Works

**Factory (CEKit) for Tiers 1-2:**

- Composing `libssh-devel` + `python3-netaddr` + `paramiko` + custom install scripts into a "network" image is non-trivial — modules make this DRY and testable.
- Domain variants are stable, shared across many teams, and deserve governed CI pipelines.
- CEKit's override system makes it trivial to add a new domain: one YAML file selecting which modules to include.
- Weekly scheduled rebuilds catch upstream base image updates.

**Tiered Containerfiles for Tiers 3-4:**

- A team adding `our-internal-tool` on top of the network image is a 4-line Containerfile — no CEKit needed.
- BuildConfig + ImageStream on the cluster provides auto-rebuild when the factory image updates.
- Teams and individuals stay autonomous without needing access to the factory repo.

### 7.3 Factory Repo Structure

```
ansible-devspaces-factory/
+-- image.yaml                                # base image definition
+-- images/                                   # one override per domain variant
|   +-- devspaces-ansible-base.yaml
|   +-- devspaces-ansible-network.yaml
|   +-- devspaces-ansible-aap.yaml
|   +-- devspaces-ansible-windows.yaml
+-- modules/                                  # reusable building blocks
|   +-- developer-base/
|   |   +-- module.yaml
|   |   +-- setup-entrypoint.sh
|   +-- ansible-common/
|   |   +-- module.yaml
|   |   +-- install.sh
|   +-- ansible-network/
|   |   +-- module.yaml
|   |   +-- install.sh
|   +-- kerberos/
|   |   +-- module.yaml
|   +-- signing-tools/
|       +-- module.yaml
+-- .github/workflows/
    +-- post-merge.yaml                       # matrix build, all variants in parallel
```

**Adding a new domain variant** requires only one new YAML file composing existing modules:

```yaml
# images/devspaces-ansible-network.yaml
name: devspaces-ansible-network
from: ghcr.io/ansible/ansible-devspaces:v26.4.5
version: latest
modules:
  repositories:
    - path: "../modules"
  install:
    - name: ansible-common
    - name: ansible-network
    - name: signing-tools
```

### 7.4 CI Pipeline (All Variants in Parallel)

```yaml
# .github/workflows/post-merge.yaml
on:
  push:
    branches: ["main"]
  schedule:
    - cron: "0 0 * * 0"   # weekly rebuild

jobs:
  build-images:
    strategy:
      fail-fast: false
      matrix:
        image:
          - devspaces-ansible-base
          - devspaces-ansible-network
          - devspaces-ansible-aap
          - devspaces-ansible-windows
    uses: ./.github/workflows/cekit-build.yaml
    with:
      tag: quay.io/myorg/${{ matrix.image }}:latest
      image: ${{ matrix.image }}
```

### 7.5 Connecting Factory Output to Tiered Layers

On the cluster, ImageStreams track the factory-published images:

```yaml
apiVersion: image.openshift.io/v1
kind: ImageStream
metadata:
  name: devspaces-ansible-network
spec:
  tags:
    - name: latest
      from:
        kind: DockerImage
        name: quay.io/myorg/devspaces-ansible-network:latest
      importPolicy:
        scheduled: true
      referencePolicy:
        type: Local
```

Team BuildConfigs reference this ImageStream as their base — same pattern as the tiered approach, just pointing at a factory output instead of the raw upstream image.

---

## 8. Adoption Guidance

| Scenario | Recommended Deployment |
|---|---|
| **Lab / workshop** | Tiers 1-2 only (inline BuildConfig, no factory) |
| **Small org, getting started** | Tiers 1-3 with simple Containerfiles |
| **Growing org, 5+ domain variants** | Add factory for Tier 2, keep tiered for 3-4 |
| **Large org, many teams per domain** | Full hybrid — factory + tiered + opt-in personal |

---

## 9. Registry Strategy

Image distribution follows a layered preference model, moving outward only when the inner tier doesn't meet the use case:

### 9.1 Registry Hierarchy

| Priority | Registry | When to Use | Trade-offs |
|---|---|---|---|
| **1st (default)** | OpenShift internal registry | Tiers 3-4 (team and personal images) — cluster-local consumption only | Zero external dependencies, no credentials to manage, fastest pull times. Not shareable across clusters. |
| **2nd** | Self-hosted Quay (or equivalent) | Tier 2 domain variants, multi-cluster orgs, governed pipelines | Org-controlled, image scanning built in, mirror-able. Requires infrastructure to run. |
| **3rd (if needed)** | Public registry (Quay.io, GHCR) | Community-shared images, upstream references, cross-org collaboration | Accessible to everyone, good for open-source. Requires public image policy approval, exposes package choices externally. |

### 9.2 Mapping to Tiers

```
Tier 1 (upstream)       -> Public registry (GHCR)           [consumed, not managed by us]
Tier 2 (domain)         -> Self-hosted Quay                 [governed CI pushes here]
                            or internal registry             [if single-cluster]
Tier 3 (team)           -> Internal OCP registry             [cluster-local, no external deps]
Tier 4 (personal)       -> Internal OCP registry             [cluster-local, ephemeral by nature]
```

### 9.3 Rationale

- **Internal first** avoids credential management, network egress costs, and external dependency for day-to-day developer workflows.
- **Self-hosted Quay** adds image scanning (Clair), robot accounts for CI, and cross-cluster pull capability without publishing to the internet.
- **Public registries** are reserved for images the broader community or external partners need access to — this should be an explicit decision, not a default.

---

## 10. Security and Governance

### 10.1 Image Content Approval

| Tier | Approval Mechanism | Rationale |
|---|---|---|
| Tier 2 (domain) | PR review by platform team + security sign-off | Shared by many teams, high blast radius |
| Tier 3 (team) | PR review by team lead, platform team notified | Team-scoped, lower blast radius but still shared |
| Tier 4 (personal) | Self-service, no approval required | Individual scope, user accepts risk |

### 10.2 Image Scanning

- **Self-hosted Quay** (Tier 2): Clair vulnerability scanning on every push. Block promotion of images with Critical/High CVEs.
- **Internal registry** (Tiers 3-4): Integrate with OpenShift's built-in image scanning or deploy a cluster-side scanner (e.g., ACS/StackRox) to flag vulnerable images before they're referenced in devfiles.
- **Scanning policy**: All images must pass a scan before being referenced in any devfile that ships in a Software Template or catalog entry.

### 10.3 Compliance Inheritance

Images built at Tiers 3-4 inherit the compliance posture of their parent tier. This means:

- If the Tier 2 base passes STIG or CIS benchmarks, team layers should not introduce packages that break that posture.
- Containerfile changes at Tiers 3-4 should be limited to `dnf install` of approved packages — no `chmod 777`, no disabling SELinux, no adding arbitrary repos.
- Consider maintaining an allowlist of approved packages per domain that teams can draw from.

### 10.4 Supply Chain

- All Containerfiles must use pinned base image references (digest or versioned tag, not `latest` in production).
- Factory-built images (Tier 2) should be signed using cosign or Sigstore, and cluster ImagePolicies should enforce signature verification.

---

## 11. Image Lifecycle and Sprawl Management

### 11.1 The Problem

Tier 4 personal images can accumulate over time — developers leave teams, experiments get abandoned, BuildConfigs continue triggering rebuilds for images nobody uses.

### 11.2 Lifecycle Policy

| Condition | Action |
|---|---|
| Personal BuildConfig has not triggered a build in **90 days** | Flag for review, notify the developer |
| Personal BuildConfig has not triggered a build in **180 days** | Auto-disable the BuildConfig (stop scheduled rebuilds) |
| Developer leaves the team or org | Team lead removes the personal BuildConfig and ImageStream |
| Team image has zero referencing devfiles for **90 days** | Platform team reviews for decommission |

### 11.3 Implementation

- Use OpenShift labels on BuildConfigs and ImageStreams to track tier, team, and owner: `devspaces.ansible.io/tier: personal`, `devspaces.ansible.io/owner: jsmith`, `devspaces.ansible.io/team: network`.
- A periodic CronJob or platform automation (Ansible, naturally) scans for stale resources and sends notifications.
- Consider integrating lifecycle management into the AAP self-service portal (see Section 14) — users can see and manage their personal image builds from the same interface where they request them.

---

## 12. Rollback and Recovery

### 12.1 What Can Go Wrong

- An upstream image update introduces a broken package or incompatibility.
- A team Containerfile change adds a package that conflicts with existing tooling.
- A factory module update breaks one domain variant while others are fine.

### 12.2 Rollback Mechanisms

**ImageStream tag history:** OpenShift ImageStreams maintain a history of image references per tag. To roll back:

```bash
# List tag history
oc get istag ansible-devspaces-custom:latest -o jsonpath='{.tag.items[*].dockerImageReference}'

# Roll back to previous image
oc tag ansible-devspaces-custom@sha256:<previous-digest> ansible-devspaces-custom:latest
```

**Devfile pinning:** In an emergency, a team can pin their devfile to a specific image digest instead of `:latest`:

```yaml
image: image-registry.openshift-image-registry.svc:5000/ns/devspaces-network-team@sha256:abc123...
```

**Factory rollback:** Revert the offending commit in the factory repo. CI rebuilds and republishes the corrected image. Downstream ImageStreams pick up the fix on the next scheduled import (or force an import with `oc import-image`).

### 12.3 Prevention

- Factory CI should include a basic smoke test — start a container from the built image and verify key binaries are present and functional.
- Consider promoting images through stages: `build` -> `staging` -> `latest`, with a manual gate or automated test between `staging` and `latest`.

---

## 13. Developer Experience Integration

### 13.1 The Vision

The tiered image strategy should not be a platform-team-only concern. Developers interact with it through their daily tools — and those touchpoints should be seamless.

### 13.2 Current Developer Journey

Today, a developer who needs a system package has to:

1. Discover that `/var` is read-only and `dnf install` won't work.
2. Figure out who to ask or what process to follow.
3. Wait for someone to build a custom image (or give up and use workarounds).

This proposal improves the situation, but without self-service tooling the journey for Tiers 3-4 still requires git knowledge, Containerfile authoring, and OpenShift build familiarity.

### 13.3 Target Developer Journey

1. Developer opens the **self-service portal** (see Section 14).
2. Browses available domain images in a catalog — sees what's already built for their domain.
3. If their team image exists: launches a Dev Space directly from the catalog.
4. If they need extra packages: submits a request through the portal. The portal scaffolds the Containerfile change as a PR or triggers a build directly.
5. Image builds, scans pass, Dev Space is ready — without touching `oc`, `git`, or YAML.

### 13.4 Dev Spaces Workspace Lifecycle

The tiered image strategy integrates with the Dev Spaces workspace lifecycle at these points:

| Lifecycle Stage | Integration Point |
|---|---|
| **Workspace creation** | Devfile references the correct tier image (from catalog or team template) |
| **Workspace startup** | Image pulled from the appropriate registry tier (internal > Quay > public) |
| **Runtime customization** | User-space tools (`pip install`, binary downloads) for ephemeral needs |
| **Persistent customization** | Tier 3-4 image build for system-level packages |
| **Workspace sharing** | Team devfile in git ensures all teammates get the same environment |

---

## 14. AAP Self-Service Portal Integration

### 14.1 Context

Ansible Automation Platform is introducing a self-service portal — a productized developer experience layer similar in concept to Red Hat Developer Hub (based on Backstage). This portal will include **Execution Environment (EE) builder capabilities**, allowing users to define and build custom EE images through a guided UI rather than raw Containerfiles.

The tiered image strategy proposed here has natural integration points with this portal, though the exact level of integration remains to be defined.

### 14.2 Parallels Between EE Builder and Dev Spaces Image Tiers

| Concept | EE Builder (AAP Portal) | Dev Spaces Image Tiers |
|---|---|---|
| Base image | `ansible-runner` / EE base | `ansible-devspaces` upstream |
| Customization inputs | Collections, Python deps, system packages | System packages, dev tooling |
| Build mechanism | Podman / `ansible-builder` | OpenShift BuildConfig / CEKit |
| Output | Execution Environment image | Dev Spaces container image |
| Consumer | AAP Controller / automation jobs | Dev Spaces / developer workspaces |

The pattern is the same: take a base, layer domain-specific content, build an image, distribute it. The portal could serve as the unified frontend for both workflows.

### 14.3 Potential Integration Points

**Catalog and discovery:**
- The portal's **Software Catalog** (Backstage concept) could list available Dev Spaces domain images alongside EEs — developers browse one catalog for both "what can I run automation with" and "what can I develop in."
- Each catalog entry is a **Software Template** backed by a devfile + Containerfile in git.

**Self-service image requests (Tiers 3-4):**
- A portal **Software Template** could scaffold a Tier 3 team image request: the developer selects packages from an approved list, the template generates a Containerfile and BuildConfig, opens a PR, and triggers a build — all through a guided form, no YAML knowledge required.
- For Tier 4 personal images: the portal could automate the fork + BuildConfig creation workflow, including lifecycle tracking and cleanup.

**Build pipeline unification:**
- If the portal's EE builder already has a build pipeline (image build, scan, publish), Dev Spaces image builds could potentially share that infrastructure.
- A shared build service avoids maintaining two separate image build systems — one for EEs and one for Dev Spaces.
- The CEKit factory model (Section 7) could be the underlying engine that the portal's UI drives.

**Golden path templates:**
- The portal could offer **"Start developing for [domain]"** golden path templates that provision both: (1) a Dev Space with the correct domain image, and (2) the matching EE for testing automation against the target platform.
- This connects the inner loop (developing in Dev Spaces) with the outer loop (running automation in AAP) through a single portal experience.

### 14.4 Architectural Sketch

```
  AAP Self-Service Portal (Developer Hub)
       |
       +-- Software Catalog
       |     +-- EE images (for automation runtime)
       |     +-- Dev Spaces images (for development)        <- NEW
       |     +-- Golden path templates
       |
       +-- Software Templates
       |     +-- "Create new EE" (existing)
       |     +-- "Create team Dev Space image" (Tier 3)     <- NEW
       |     +-- "Request personal Dev Space image" (Tier 4)<- NEW
       |     +-- "Start developing for [domain]"            <- NEW
       |
       +-- Build Service
       |     +-- EE builds (ansible-builder)
       |     +-- Dev Spaces image builds (BuildConfig/CEKit) <- NEW (or shared)
       |
       +-- Lifecycle Management
             +-- Image usage tracking
             +-- Stale image cleanup
             +-- Upgrade notifications
```

### 14.5 What Needs to Be Defined

| Question | Options | Impact |
|---|---|---|
| **Shared build pipeline?** | (A) Portal drives both EE and Dev Spaces builds through a single service. (B) Separate build systems, portal is just the UI. | (A) reduces infra duplication but couples the systems. (B) is simpler to start. |
| **Catalog ownership** | (A) Portal team owns the catalog, platform team contributes entries. (B) Platform team owns Dev Spaces entries independently. | Affects who approves new domain images. |
| **Template granularity** | (A) One template per domain ("Network developer setup"). (B) Composable templates ("Add network packages to any base"). | (A) is simpler for users, (B) is more flexible. |
| **Portal as gate vs. shortcut** | (A) Portal is the only way to request Tier 3-4 images (enforced). (B) Portal is a convenience, git workflows remain available. | (A) ensures governance, (B) preserves power-user workflows. Recommend (B). |

### 14.6 Recommendation

Start with the portal as a **convenience layer, not a gate**:

- Publish Tier 2 domain images in the portal catalog for discovery.
- Create Software Templates for Tier 3 image requests — guided form that generates a PR.
- Keep the git-native workflow (Containerfile + BuildConfig) as the underlying mechanism.
- Explore build pipeline unification as a follow-up once both EE builder and Dev Spaces image builds are mature enough to evaluate shared infrastructure.

This avoids blocking the tiered image strategy on portal readiness, while ensuring the two converge naturally as the portal matures.

---

## 15. Operational Cost Estimates

### 15.1 Build Resources

| Resource | Per Build | Frequency | Notes |
|---|---|---|---|
| CPU | ~0.5-1 core | During build only (~3-5 min) | BuildConfig resource limits configurable |
| Memory | ~512 MB - 1 GB | During build only | Primarily `dnf` resolution and install |
| Storage (image layers) | ~50-200 MB per tier | Persisted in registry | Layered images share base layers |
| Network (registry pulls) | ~200-500 MB per build | Mostly cached after first pull | ImageStream `Local` policy caches in internal registry |

### 15.2 Rebuild Frequency

| Trigger | Expected Frequency |
|---|---|
| Upstream base image update | Monthly (follows `ansible-dev-tools` release cadence) |
| Factory/org-wide Containerfile change | Ad-hoc, typically 1-2 times per month |
| Team Containerfile change | Ad-hoc, typically 1-2 times per quarter |
| Scheduled rebuild (factory CI) | Weekly (catches base image security patches) |

### 15.3 Steady-State Cluster Impact

For a typical deployment (1 org-wide + 5 team images + 10 personal images):

- **16 BuildConfigs** total, each triggering ~1-4 builds/month
- **~50-80 builds/month**, each running 3-5 minutes
- **Peak concurrent builds**: 5-6 (during cascade after upstream update)
- **Registry storage**: ~2-4 GB (with layer sharing)
- **Node image cache**: ~1-3 GB per node (only images actively in use)

---

## 16. Alternatives Considered

| Alternative | Why Not |
|---|---|
| Make `/var` writable | Anti-pattern, breaks container immutability |
| `rpm2cpio` extraction at runtime | Fragile dependency resolution, manual `LD_LIBRARY_PATH` management |
| Sidecar container | Resource overhead, tool config (git, SSH) not shared, context switching |
| Ephemeral volume mounts on `/var` subdirs | `/usr/bin` is also read-only, so `dnf` still can't write binaries |
| Nested Podman (run tools in a container) | Already works as an escape hatch but not ergonomic for daily use |

---

## 17. Success Criteria

### 17.1 Functional

- A team can add a new system package to their Dev Spaces environment and have a working image **within 30 minutes**, without platform team intervention.
- Upstream image updates propagate to all team images **within 1 hour** with zero manual steps.
- A new domain variant can be added to the factory **within 1 day** (one YAML file + PR review).
- A developer who has never touched OpenShift builds can request a personal image through the self-service workflow (git or portal) **without reading infrastructure documentation**.

### 17.2 Operational

- Zero developer-reported incidents caused by stale or broken Dev Spaces images per quarter.
- Image rebuild cascade completes end-to-end (Tier 1 through Tier 4) in **under 30 minutes**.
- No orphaned BuildConfigs or ImageStreams older than 180 days.

### 17.3 Adoption

- **Phase 1 target**: at least 2 teams using Tier 3 team images in production within 3 months of launch.
- **Phase 2 target**: at least 3 domain variants available in the catalog within 6 months.
- Developer satisfaction with Dev Spaces environment setup rated **4+/5** in post-adoption survey.

---

## 18. Ownership Summary

| Concern | Owner | Mechanism |
|---|---|---|
| Upstream base image | `ansible-dev-tools` project | External |
| Domain variants + modules | Platform team | Factory repo + CI |
| Team-specific extras | Team lead | Workspace repo Containerfile + BuildConfig |
| Personal extras | Individual developer | Fork + BuildConfig (opt-in) |
| ImageStream tracking | Platform admin | ArgoCD / Helm |
| Portal catalog entries | Platform team + portal team | Software Templates in git |
| Image lifecycle enforcement | Platform automation | CronJob / Ansible playbook |

---

## 19. Proposed Timeline

| Phase | Timeframe | Scope | Deliverables |
|---|---|---|---|
| **Phase 1 — Foundation** | Q3 2026 | Tiers 1-2, internal registry | Org-wide BuildConfig + ImageStream deployed. 2 pilot teams onboarded with inline Containerfiles. Documentation and runbooks. |
| **Phase 2 — Team adoption** | Q4 2026 | Tier 3 rollout | Team workspace repos with Containerfiles for 3+ teams. Auto-rebuild cascade validated end-to-end. Registry strategy finalized (internal vs. self-hosted Quay). |
| **Phase 3 — Factory + portal** | Q1 2027 | CEKit factory, portal integration | Factory repo with 3+ domain variants. Portal catalog entries for domain images. Software Templates for Tier 3 image requests. |
| **Phase 4 — Self-service maturity** | Q2 2027 | Tier 4, lifecycle automation, portal convergence | Personal image opt-in workflow through portal. Lifecycle cleanup automation. Evaluate shared build pipeline with EE builder. |

Each phase has a **go/no-go checkpoint** — proceed to the next phase only after success criteria for the current phase are met.

---

## 20. Open Questions

1. **Starting tier** — Is Tier 2 (simple BuildConfig) a good enough starting point, or should we invest in the factory model from day one?
   - *Recommendation*: Start with Tier 2. The factory model adds value at 5+ domain variants — invest when demand justifies it.

2. **Domain variants** — What domain-specific images would be most valuable first?
   - *Candidates*: Network (`libssh-devel`, `python3-netaddr`), AAP config-as-code (`httpie`), Windows (`krb5-workstation`), Cloud/AWS (`awscli`, `python3-boto3`).
   - *Decision needed*: Poll domain communities for demand — top 2-3 become Phase 3 factory targets.

3. **Image registry** — Layered approach proposed in Section 9. Decision needed on self-hosted Quay deployment:
   - *Option A*: Use existing self-hosted Quay instance if available.
   - *Option B*: Deploy a dedicated Quay instance for Dev Spaces + EE images (shared with AAP).
   - *Option C*: Start with internal OCP registry only, add Quay when multi-cluster distribution is needed.
   - *Recommendation*: Option C — defer Quay until Phase 3 when factory images need cross-cluster distribution.

4. **Ownership model** — Who owns domain variant definitions?
   - *Option A*: Central platform team owns all variants (consistent governance, bottleneck risk).
   - *Option B*: Domain communities own their variants, platform team provides guardrails (distributed, harder to govern).
   - *Option C*: Shared governance — domain communities propose via PR, platform team reviews and merges.
   - *Recommendation*: Option C — scales with the community without creating bottlenecks.

5. **Portal integration depth** — How tightly should Dev Spaces image management integrate with the AAP self-service portal?
   - *Option A*: Portal is the primary interface — all Tier 3-4 requests go through it (enforced).
   - *Option B*: Portal is a convenience layer — git workflows remain the source of truth (recommended).
   - *Decision needed*: Depends on portal maturity timeline and EE builder architecture decisions.

---

## 21. References

- Upstream issue: [ansible/ansible-dev-tools#738](https://github.com/ansible/ansible-dev-tools/issues/738)
- Reference implementation: [redhat-cop/devspaces-images](https://github.com/redhat-cop/devspaces-images)
- CEKit documentation: [cekit.io](https://cekit.io)
- Lab implementation tracking: [rhpds/ansible-dev-tools-automation#14](https://github.com/rhpds/ansible-dev-tools-automation/issues/14)
- Red Hat Developer Hub (Backstage): [developers.redhat.com/rhdh](https://developers.redhat.com/rhdh)

---

*This RFC is a draft for community discussion, not a committed plan. Feedback and alternative proposals are welcome.*
