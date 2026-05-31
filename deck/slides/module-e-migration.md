<!-- .slide: class="divider-dark" data-background-color="#292929" -->

<div class="slide-body">
<p class="section-marker">Deep Dive</p>

## Legacy Automation <!-- .element: style="font-size: 3.4em;" --> <br/>to Ansible

<img src="assets/ansible-a-3d.png" alt="" class="slide-decor slide-decor-right" style="opacity: 0.08;" />
</div>

<div class="slide-footer">
<img src="assets/redhat-logo-white.png" alt="Red Hat" class="footer-logo" />
</div>

Note: This module covers the migration path from legacy automation tools to Ansible. Many enterprise customers have years of Chef recipes, Puppet manifests, or BMC Bladelogic jobs that need to be converted — doing it manually is slow, error-prone, and expensive.

---

<!-- .slide: class="content-light" data-background-color="#ffffff" -->

<div class="slide-body">
<div class="accent-bar"></div>
<p class="section-marker">Module E — The Problem</p>

## Why migrate?

- Legacy tool contracts expiring or costs rising
- Skills gap: fewer engineers know Chef/Puppet/Bladelogic, more know Ansible
- Consolidation: one automation platform instead of three or four
- Manual conversion is slow (~2-4 weeks per complex recipe) and error-prone

</div>

<div class="slide-footer">
<img src="assets/redhat-logo-color.png" alt="Red Hat" class="footer-logo" />
</div>

Note: The business case is usually one of three: contract renewal (legacy vendor raised prices), consolidation (CTO wants one automation platform), or skills (team can't hire Chef/Puppet engineers anymore). Manual conversion — reading a Chef recipe, understanding the intent, rewriting as an Ansible role — takes 2-4 weeks per complex recipe and requires deep expertise in both the source and target tools. That's where x2Ansible comes in.

---

<!-- .slide: class="content-light" data-background-color="#ffffff" -->

<div class="slide-body">
<div class="accent-bar"></div>
<p class="section-marker">Module E — x2Ansible</p>

## x2Ansible: AI-assisted conversion

- Converts Chef recipes, Puppet manifests, BMC Bladelogic jobs → Ansible roles
- Powered by OpenShift AI — understands automation intent, not just syntax
- Generates idiomatic Ansible: FQCN, proper module usage, role structure
- Output follows ADT conventions: molecule-ready, lint-clean

</div>

<div class="slide-footer">
<img src="assets/redhat-logo-color.png" alt="Red Hat" class="footer-logo" />
</div>

Note: x2Ansible is not a syntax translator — it's an AI that understands the intent of the source automation and generates idiomatic Ansible. A Chef recipe that uses `package`, `service`, and `template` resources gets converted to `ansible.builtin.dnf`, `ansible.builtin.systemd`, and `ansible.builtin.template` tasks with proper FQCN, handlers, and role structure. The output is scaffold-ready: molecule scenario included, lint config set to moderate profile. The engineer's job shifts from writing the conversion to validating and testing it.

---

<!-- .slide: class="content-light" data-background-color="#ffffff" -->

<div class="slide-body">
<div class="accent-bar"></div>
<p class="section-marker">Module E — Workflow</p>

## Migration workflow

<div class="mermaid">
%%{init: {'theme': 'base', 'themeVariables': {'primaryColor': '#ee0000', 'primaryTextColor': '#fff'}}}%%
graph LR
    A[Assessment] --> B[Conversion]
    B --> C[Validation]
    C --> D[Rollout]
    style A fill:#f0f0f0,stroke:#ee0000,color:#151515,stroke-width:2px
    style B fill:#f0f0f0,stroke:#ee0000,color:#151515,stroke-width:2px
    style C fill:#f0f0f0,stroke:#ee0000,color:#151515,stroke-width:2px
    style D fill:#ee0000,stroke:#a60000,color:#fff,stroke-width:2px
</div>

- **Assessment:** inventory legacy automation, classify complexity, estimate effort
- **Conversion:** x2Ansible generates Ansible roles from source recipes/manifests
- **Validation:** molecule tests + side-by-side comparison with legacy output
- **Rollout:** phased deployment via Controller, parallel-run with legacy until confident

</div>

<div class="slide-footer">
<img src="assets/redhat-logo-color.png" alt="Red Hat" class="footer-logo" />
</div>

Note: The workflow is designed to minimize risk. Assessment inventories all legacy automation and classifies each piece by complexity (simple package installs vs. complex multi-service orchestration). Conversion uses x2Ansible for the bulk work — engineers focus on the complex cases. Validation is critical: run molecule tests AND compare the output side-by-side with the legacy tool's results on identical test infrastructure. Rollout is phased — run Ansible in parallel with the legacy tool for a period, compare drift, then cut over. This de-risks the migration and builds confidence with stakeholders who are nervous about changing automation that "works."
