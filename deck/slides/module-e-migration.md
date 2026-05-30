<!-- .slide: class="divider-dark" data-background-color="#292929" -->

<div class="slide-body">
<p class="section-marker">Deep Dive</p>

## Legacy Automation <!-- .element: style="font-size: 3.4em;" --> <br/>to Ansible

<img src="assets/ansible-a-3d.png" alt="" class="slide-decor slide-decor-right" style="opacity: 0.08;" />
</div>

<div class="slide-footer">
<img src="assets/redhat-logo-white.png" alt="Red Hat" class="footer-logo" />
</div>

---

<!-- .slide: class="content-light" data-background-color="#ffffff" -->

<div class="slide-body">
<div class="accent-bar"></div>
<p class="section-marker">Module E — Migration</p>

## x2Ansible

- AI-assisted conversion: Chef, Puppet, BMC Bladelogic → Ansible
- Powered by OpenShift AI
- Converts recipes/manifests/jobs to Ansible roles and playbooks

</div>

<div class="slide-footer">
<img src="assets/redhat-logo-color.png" alt="Red Hat" class="footer-logo" />
</div>

---

<!-- .slide: class="content-light" data-background-color="#ffffff" -->

<div class="slide-body">
<div class="accent-bar"></div>
<p class="section-marker">Module E — Migration</p>

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

</div>

<div class="slide-footer">
<img src="assets/redhat-logo-color.png" alt="Red Hat" class="footer-logo" />
</div>
