<!-- .slide: class="divider-dark" data-background-color="#292929" -->

<div class="slide-body">
<p class="section-marker">Deep Dive</p>

## Dev Spaces & <!-- .element: style="font-size: 3.4em;" --> <br/>Image Customization

<img src="assets/ansible-stack-white.png" alt="" class="slide-decor slide-decor-right" style="opacity: 0.06;" />
</div>

<div class="slide-footer">
<img src="assets/redhat-logo-white.png" alt="Red Hat" class="footer-logo" />
</div>

---

<!-- .slide: class="content-light" data-background-color="#ffffff" -->

<div class="slide-body">
<div class="accent-bar"></div>
<p class="section-marker">Module C — Dev Spaces Deep Dive</p>

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

</div>

<div class="slide-footer">
<img src="assets/redhat-logo-color.png" alt="Red Hat" class="footer-logo" />
</div>

---

<!-- .slide: class="content-light" data-background-color="#ffffff" -->

<div class="slide-body">
<div class="accent-bar"></div>
<p class="section-marker">Module C — Dev Spaces Deep Dive</p>

## Auto-rebuild cascade

- OpenShift ImageStream triggers connect tiers
- Upstream update → Org rebuild → Team rebuild (automatic)
- Security patches flow through the chain without manual intervention

</div>

<div class="slide-footer">
<img src="assets/redhat-logo-color.png" alt="Red Hat" class="footer-logo" />
</div>

---

<!-- .slide: class="content-light" data-background-color="#ffffff" -->

<div class="slide-body">
<div class="accent-bar"></div>
<p class="section-marker">Module C — Dev Spaces Deep Dive</p>

## Self-service workflow

- Teams request image customizations via PR to config repo
- Platform team approves; rebuild is automatic
- Personal tier: opt-in fork for individual experimentation

</div>

<div class="slide-footer">
<img src="assets/redhat-logo-color.png" alt="Red Hat" class="footer-logo" />
</div>
