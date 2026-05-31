<!-- .slide: class="divider-dark" data-background-color="#292929" -->

<div class="slide-body">
<p class="section-marker">Deep Dive</p>

## Dev Spaces & <!-- .element: style="font-size: 3.4em;" --> <br/>Image Customization

<img src="assets/ansible-stack-white.png" alt="" class="slide-decor slide-decor-right" style="opacity: 0.06;" />
</div>

<div class="slide-footer">
<img src="assets/redhat-logo-white.png" alt="Red Hat" class="footer-logo" />
</div>

Note: This module covers the tiered image strategy for customizing Dev Spaces environments. The problem: the upstream image can't include every team's dependencies. The solution: layered images managed through standard OpenShift build primitives.

---

<!-- .slide: class="content-light" data-background-color="#ffffff" -->

<div class="slide-body">
<div class="accent-bar"></div>
<p class="section-marker">Module C — The Problem</p>

## Why customize images?

- Upstream image has `/var` read-only — no `dnf install` at runtime
- Different teams need different system packages:
  - Network: `libssh-devel`, `python3-netaddr`
  - Windows: `krb5-workstation`, `python3-pykerberos`
  - AAP config-as-code: `httpie`, `python3-pyyaml`
- One shared image either bloats or satisfies no one

</div>

<div class="slide-footer">
<img src="assets/redhat-logo-color.png" alt="Red Hat" class="footer-logo" />
</div>

Note: Container immutability is a feature, not a bug — we don't want developers running dnf install in their workspaces because that creates drift. But different automation domains genuinely need different system-level dependencies. The tiered image strategy lets you customize without breaking immutability.

---

<!-- .slide: class="content-light" data-background-color="#ffffff" -->

<div class="slide-body">
<div class="accent-bar"></div>
<p class="section-marker">Module C — Strategy</p>

## Tiered image strategy

<div class="mermaid">
%%{init: {'theme': 'base', 'themeVariables': {'primaryColor': '#ee0000', 'primaryTextColor': '#fff'}}}%%
graph TB
    T1[Tier 1: Upstream Base] --> T2[Tier 2: Org/Domain Image]
    T2 --> T3[Tier 3: Team Image]
    T3 --> T4[Tier 4: Personal Image]
    style T1 fill:#ee0000,stroke:#a60000,color:#fff,stroke-width:2px
    style T2 fill:#ee0000,stroke:#a60000,color:#fff,stroke-width:2px
    style T3 fill:#f0f0f0,stroke:#ee0000,color:#151515,stroke-width:2px
    style T4 fill:#f0f0f0,stroke:#a3a3a3,color:#151515,stroke-width:1px
</div>

Each tier adds specificity without modifying the layer below

</div>

<div class="slide-footer">
<img src="assets/redhat-logo-color.png" alt="Red Hat" class="footer-logo" />
</div>

Note: Tier 1 is managed by the ansible-dev-tools upstream project. Tier 2 is where most organizations focus — it's the standard deployment path. Tier 3 is for team-specific extras beyond the domain image. Tier 4 is opt-in personal customization for individual experimentation. Each tier is an OpenShift BuildConfig that layers on top of the previous tier's ImageStream.

---

<!-- .slide: class="content-light" data-background-color="#ffffff" -->

<div class="slide-body">
<div class="accent-bar"></div>
<p class="section-marker">Module C — Tier 2</p>

## Tier 2: the core deployment path

- Platform team manages domain-specific images via OpenShift BuildConfig
- One image per automation domain (network, Windows, cloud, AAP config)
- Standard Containerfile: `FROM upstream-base` + `dnf install` + `pip install`
- For 5+ domain variants: CEKit factory model generates Containerfiles from YAML definitions

</div>

<div class="slide-footer">
<img src="assets/redhat-logo-color.png" alt="Red Hat" class="footer-logo" />
</div>

Note: Tier 2 is where the real value is for enterprise customers. Instead of one giant image with everything, you maintain focused domain images. Each is a simple Containerfile that starts from the upstream base and adds domain packages. When you hit 5+ domain variants, maintaining individual Containerfiles becomes tedious — that's when CEKit (Container Environment Kit) pays off. CEKit uses YAML module definitions to generate Containerfiles, so adding a new domain is a YAML file, not a Containerfile. The platform team manages the factory; teams request additions via PR.

---

<!-- .slide: class="content-light" data-background-color="#ffffff" -->

<div class="slide-body">
<div class="accent-bar"></div>
<p class="section-marker">Module C — Auto-rebuild</p>

## Auto-rebuild cascade

- OpenShift ImageStream triggers connect all tiers
- Upstream update → Org rebuild → Team rebuild (automatic)
- Security patches flow through the chain without manual intervention
- Rollback: re-tag the previous ImageStream tag to restore a known-good image

</div>

<div class="slide-footer">
<img src="assets/redhat-logo-color.png" alt="Red Hat" class="footer-logo" />
</div>

Note: ImageStream triggers are the key automation mechanism. When the upstream base image updates (e.g., a CVE fix), OpenShift automatically triggers a rebuild of every Tier 2 image that depends on it, which in turn triggers Tier 3 rebuilds. No manual intervention required. Security patches propagate in minutes, not days. For rollback, you simply re-tag the ImageStream to point to the previous image SHA — instant rollback, no rebuild needed.

---

<!-- .slide: class="content-light" data-background-color="#ffffff" -->

<div class="slide-body">
<div class="accent-bar"></div>
<p class="section-marker">Module C — Self-service</p>

## Self-service workflow

- Teams request image customizations via PR to the config repo
- Platform team reviews and approves; rebuild is automatic
- Personal tier (Tier 4): opt-in fork for individual experimentation
- Image scanning and lifecycle policies prevent sprawl

</div>

<div class="slide-footer">
<img src="assets/redhat-logo-color.png" alt="Red Hat" class="footer-logo" />
</div>

Note: The self-service model keeps the platform team as gatekeepers without making them a bottleneck. A team that needs a new package submits a PR to the image config repo — the platform team reviews it for security and compatibility, merges, and the rebuild happens automatically. Personal tier is opt-in and clearly marked as unsupported — it lets individual developers experiment without affecting the team image. Set lifecycle policies to clean up stale personal images after 30/60/90 days.
