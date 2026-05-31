<!-- .slide: class="divider-dark" data-background-color="#292929" -->

<div class="slide-body">
<p class="section-marker">Deep Dive</p>

## CI/CD <!-- .element: style="font-size: 3.4em;" --> <br/>Integration

<img src="assets/automation-watermark.png" alt="" class="slide-decor slide-decor-right" style="opacity: 0.06;" />
</div>

<div class="slide-footer">
<img src="assets/redhat-logo-white.png" alt="Red Hat" class="footer-logo" />
</div>

Note: This module covers the outer loop — what happens when a developer pushes code. The CI/CD pipeline validates content quality, builds execution environments, and syncs approved content to Automation Controller.

---

<!-- .slide: class="content-light" data-background-color="#ffffff" -->

<div class="slide-body">
<div class="accent-bar"></div>
<p class="section-marker">Module D — PR Gates</p>

## The outer loop: PR quality gates

- **ansible-lint** in CI: enforce the team's lint profile (moderate → production)
- **molecule** CI: run integration tests against target platforms
- **ansible-sign** verification: validate content signatures on merge
- SARIF output for GitHub code scanning annotations on PRs

</div>

<div class="slide-footer">
<img src="assets/redhat-logo-color.png" alt="Red Hat" class="footer-logo" />
</div>

Note: The outer loop is the automated enforcement layer. When a developer opens a PR, GitHub Actions runs ansible-lint with the team's profile and molecule tests against the target platforms. SARIF output means lint violations show as inline PR annotations — developers see exactly what to fix. ansible-sign verifies that the content hasn't been tampered with between the developer's machine and the CI pipeline. These gates ensure quality standards are enforced consistently, not just documented.

---

<!-- .slide: class="content-light" data-background-color="#ffffff" -->

<div class="slide-body">
<div class="accent-bar"></div>
<p class="section-marker">Module D — EE Pipeline</p>

## Execution Environment pipeline

- On merge: **ansible-builder** builds the EE container image
- Image pushed to registry (Quay, GHCR, or private registry)
- Automation Controller pulls the updated EE automatically
- Same image runs in dev, CI, and production — no drift

</div>

<div class="slide-footer">
<img src="assets/redhat-logo-color.png" alt="Red Hat" class="footer-logo" />
</div>

Note: This is the deployment pipeline for automation content. When a PR merges, CI builds a new execution environment image using ansible-builder, tags it, and pushes it to the container registry. Automation Controller is configured to pull from that registry — it gets the updated collections, Python dependencies, and system packages in a single image pull. This eliminates the "install collections on Controller" manual step and ensures the exact same runtime in dev and production. The EE definition file (execution-environment.yml) is versioned in the repo, so the image is always reproducible.

---

<!-- .slide: class="content-light" data-background-color="#ffffff" -->

<div class="slide-body">
<div class="accent-bar"></div>
<p class="section-marker">Module D — GitOps</p>

## Controller sync: GitOps for automation

- Automation Controller syncs projects from Git on schedule or webhook
- Approved content flows from PR → merge → Controller without manual steps
- RBAC controls who can run what — separation of dev and ops
- Audit trail: every execution traced back to a specific commit

</div>

<div class="slide-footer">
<img src="assets/redhat-logo-color.png" alt="Red Hat" class="footer-logo" />
</div>

Note: Controller project sync is the GitOps mechanism for Ansible. Configure a project to point at your Git repo and branch — Controller pulls the latest on a schedule or when triggered by a webhook from your CI pipeline. Combined with EEs, this means the full pipeline is: developer pushes code → CI validates → merge → Controller syncs content and pulls updated EE → ready to run. RBAC ensures developers can write automation but only approved operators can execute it in production. Every job execution in Controller records the project revision (commit SHA), so you always know exactly what code ran.

---

<!-- .slide: class="content-light" data-background-color="#ffffff" -->

<div class="slide-body">
<div class="accent-bar"></div>
<p class="section-marker">Module D — Observability</p>

## Development observability

- Grafana dashboards for workflow and development metrics
- Track: build times, lint violations over time, test coverage trends
- Identify bottlenecks: which teams are blocked? Where do PRs stall?
- Data-driven decisions on tooling investment and training needs

</div>

<div class="slide-footer">
<img src="assets/redhat-logo-color.png" alt="Red Hat" class="footer-logo" />
</div>

Note: Observability closes the feedback loop. Grafana dashboards pull metrics from GitHub Actions (CI run times, failure rates), ansible-lint (violation counts by profile level), and Automation Controller (job success rates, execution times). Engineering managers use this data to identify which teams need more training, which lint profiles are too aggressive, and where the CI pipeline is the bottleneck. This is step 4 of the engagement model — data-driven improvement. Start with simple metrics (build pass/fail rate) and add complexity as you mature.
