# DRAFT: Ansible development workspaces: browser-based environments for automation content creation

*Red Hat OpenShift Dev Spaces meets Ansible Development Tools, giving every automation developer a governed, consistent environment in under five minutes.*

---

Onboarding a new automation developer is rarely quick. The timeline is familiar: Day 1 is paperwork. Day 10, the laptop arrives. Day 20, the IDE and tools are finally installed. Day 30, Git access is granted. Day 60, still waiting for the right Linux environment or sudo permissions. Months before a single playbook gets written.

Even after that initial setup, keeping environments consistent across a team is a challenge that documentation alone can't solve. One developer runs ansible-lint 24.x while another has 25.x. Molecule tests pass on one workstation but fail on another because of a missing system dependency. When something breaks, the first question is always "which version were you running?" instead of "what changed?"

**Ansible development workspaces**, powered by Red Hat OpenShift Dev Spaces, eliminate this entire category of problems. Developers open a browser, navigate to their Dev Spaces dashboard, and launch a workspace. Within minutes, they have a full VS Code environment running in the cloud with every Ansible development tool pre-installed, the Ansible VS Code extension configured, and the team's linting profile active. No local Python. No container runtime. Just a browser and credentials.

## What if it took five minutes?

Ansible Development Tools (DevTools) already bundles the essential CLI tools for the Ansible content lifecycle (ansible-creator, ansible-lint, molecule, ansible-navigator, ansible-builder, ansible-sign, and more) into a single, versioned package. The maturity path for delivering Ansible DevTools to automation developers (also known as automation content creators) looks like this:

| Stage | Method | Onboarding time | Environment consistency |
|-------|--------|----------------|------------------------|
| **Crawl** | pip / uv | ~30 min | Low: each developer manages their own |
| **Walk** | RPM | ~15 min | Medium: same package, no IDE config |
| **Run** | Dev Container | ~10 min | High: same image, tools, and config |
| **Fly** | Dev Spaces | ~5 min | Highest: centrally managed, browser-only |

Most organizations are somewhere between Crawl and Walk today. Dev containers and Dev Spaces are the target. They require an initial investment in image management, but once that investment is made, the environment is completely transparent to developers.

Ansible Workspaces is the "Fly" stage. Maximum consistency, minimum friction.

## What the developer sees

From the developer's perspective, the complexity is invisible. They see a VS Code interface in their browser with a terminal, file explorer, extensions panel, and all the Ansible tooling ready to go. They can scaffold new collections and roles with `ansible-creator`, lint against the team's standard profile, run `molecule` integration tests inside nested Podman containers, build execution environments with `ansible-builder`, and push code to Git to trigger CI. All from the browser. No local installs, no "which Python version do I need" conversations.

The workspace itself is defined declaratively in a `devfile.yaml` checked into the project repository. When a developer clicks **Create Workspace** on that repository, Dev Spaces reads the devfile, provisions the environment, and presents a ready-to-use IDE. Every developer who opens the same repository gets the same environment.

## Why this matters for enterprise teams

Ansible Workspaces isn't just about convenience. For platform teams, automation architects, and engineering managers, it's about **governance without friction**.

When the platform team controls the workspace image, they control the toolchain version, the linting rules, the VS Code extensions, and the resource limits. Standards aren't documented and hoped-for; they're inherited automatically by every workspace that uses the image.

This matters most for organizations where automation architects manage multiple automation domains. Consider the package requirements across different teams:

- **Network automation:** `libssh-devel`, `python3-netaddr`, `paramiko`
- **Windows automation:** `krb5-workstation`, `python3-pykerberos`
- **AAP config-as-code:** `httpie`, `python3-pyyaml`
- **Cloud automation:** `awscli`, `python3-boto3`

A single monolithic image either bloats with every team's dependencies or satisfies no one. The Ansible DevTools container image has `/var` read-only at runtime, and that's by design. Container immutability is a feature, not a limitation. You don't want developers running `dnf install` inside their workspaces, because that creates drift.

## Tiered image strategy: customization without compromise

The solution is a tiered approach to image management, using standard OpenShift build primitives:

| Tier | Scope | What it adds | Managed by |
|------|-------|-------------|------------|
| **1: Base Image** | Everyone | Ansible Development Tools | Red Hat |
| **2: Org / Domain** | Domain teams | Domain-specific system packages | Platform team |
| **3: Team** | One team | Team-specific extras | Team lead |
| **4: Personal** | One developer | Individual niche needs (opt-in) | Individual |

Each tier is an OpenShift BuildConfig that layers on top of the previous tier's ImageStream. When the upstream base image receives a security patch, the entire chain rebuilds automatically, with no manual intervention at any tier. Security patches propagate in minutes, not days.

**Adding a new domain image** is as straightforward as writing a short Containerfile:

```dockerfile
FROM ansible-devspaces-custom:latest
USER root
RUN dnf install -y \
      libssh-devel \
      python3-netaddr \
    && dnf clean all
USER 1000
```

For organizations with five or more domain variants, a CEKit (Container Environment Kit) factory model generates Containerfiles from YAML definitions. Adding a new domain becomes a YAML file, not a Containerfile.

## Self-service without bottlenecks

The tiered model keeps the platform team as gatekeepers without making them a bottleneck. Teams request image customizations via pull request to the config repository. The platform team reviews for security and compatibility, merges, and the rebuild happens automatically.

For individual developers who need a system package no one else on the team requires, Tier 4 provides an opt-in personal layer: a fork of the team workspace repo with an additional Containerfile layer. If the same package shows up in multiple personal layers on the same team, it gets promoted to Tier 3. Lifecycle policies clean up stale personal images after 90 days.

The ownership model breaks down like this:

| Concern | Owner |
|---------|-------|
| Upstream base image version | Platform admin |
| Domain-specific packages | Platform team |
| Team-specific extras | Team lead |
| Personal extras | Individual developer (opt-in) |

## From local dev container to cloud workspace

If your team already uses the Ansible DevTools dev containers locally, the transition to Ansible Workspaces is straightforward. The same image that powers your `.devcontainer/` setup is the same image that runs in Dev Spaces. The difference is operational:

- **Dev containers** require each developer to have a local container runtime (Docker or Podman), sufficient disk space, and permissions to run containers on their workstation.
- **Dev Spaces** removes all of those requirements. The infrastructure is managed by OpenShift. Developers only need a browser.

Both deliver high environment consistency. Dev Spaces goes further by adding centralized governance: the platform team and automation architects control resource limits, image versions, and access policies from the cluster, not from documentation that developers may or may not follow.

## The content lifecycle in a governed workspace

With Ansible Workspaces, the full content lifecycle (Create, Test, Deploy) runs inside a governed environment:

**Inner loop (automation developer):** Write playbooks and roles → lint with `ansible-lint` → test with `molecule` in nested Podman → iterate. Fast feedback, consistent tools, no local setup.

**Outer loop (CI/CD):** Push to Git → PR triggers quality gates (ansible-lint, molecule, ansible-sign) → on merge, `ansible-builder` builds the execution environment → Automation Controller syncs the project. The same toolchain in the workspace matches the toolchain in CI.

Every execution in Automation Controller records the project revision, so the audit trail connects production runs back to specific commits, written in an environment that enforced the team's quality standards from the start.

## Getting started

Ansible Workspaces requires an OpenShift cluster with the [Red Hat OpenShift Dev Spaces](https://access.redhat.com/documentation/en-us/red_hat_openshift_dev_spaces/) operator installed. Point a workspace at any Git repository containing a `devfile.yaml` with the Ansible DevTools container image:

```yaml
schemaVersion: 2.2.2
metadata:
  name: ansible-dev-tools-workspace
components:
  - name: tooling-container
    container:
      image: ghcr.io/ansible/community-ansible-dev-tools:latest
      memoryRequest: 2Gi
      memoryLimit: 4Gi
      cpuRequest: 500m
      cpuLimit: 1000m
```

Developers log into the Dev Spaces dashboard, paste the repository URL, click **Create & Open**, and start coding.

For setup details and the supported image variants, see the [Ansible Development Workspaces documentation](https://docs.redhat.com/en/documentation/red_hat_ansible_automation_platform/2.6/html-single/using_ansible_development_workspaces_for_automation_content_development/index). For the tiered image strategy, see the [Ansible Development Tools container documentation](https://docs.ansible.com/projects/dev-tools/container/).

The recommended adoption path: start with a Tier 2 org-wide image using a simple inline BuildConfig, validate with two pilot teams, then expand to Tier 3 team images as demand grows. The infrastructure cost is low. A typical deployment of one org-wide image plus five team images produces around 50-80 builds per month, each running three to five minutes.

---

*Join the conversation on the [Ansible Development Tools forum](https://forum.ansible.com/tag/devtools), or visit the [Ansible Development Tools documentation](https://docs.redhat.com/en/documentation/red_hat_ansible_automation_platform/2.6/html/developing_automation_content/devtools-intro) for the full solution guide.*
