<!-- .slide: class="divider-red" data-background-color="#ee0000" -->

<div class="slide-body">
<p class="section-marker">Deep Dive</p>

## ADT Tools <!-- .element: style="font-size: 3.4em;" --> <br/>in Detail

<img src="assets/ansible-a-3d.png" alt="" class="slide-decor slide-decor-right" style="opacity: 0.12; max-height: 65%;" />
</div>

<div class="slide-footer">
<img src="assets/redhat-logo-white.png" alt="Red Hat" class="footer-logo" />
</div>

---

<!-- .slide: class="content-light" data-background-color="#ffffff" -->

<div class="slide-body">
<div class="accent-bar"></div>
<p class="section-marker">Module A — ADT Deep Dive</p>

## ansible-creator

- Scaffold collections, playbooks, devcontainers, EE templates
- Opinionated project structure out of the box
- Consistent starting point for every automation project

</div>

<div class="slide-footer">
<img src="assets/redhat-logo-color.png" alt="Red Hat" class="footer-logo" />
</div>

---

<!-- .slide: class="content-light" data-background-color="#ffffff" -->

<div class="slide-body">
<div class="accent-bar"></div>
<p class="section-marker">Module A — ADT Deep Dive</p>

## ansible-lint

- Opinionated profiles: min → basic → moderate → safety → shared → production
- Auto-fix with `--fix` for common violations
- CI integration: exit codes, SARIF output, GitHub Actions

</div>

<div class="slide-footer">
<img src="assets/redhat-logo-color.png" alt="Red Hat" class="footer-logo" />
</div>

---

<!-- .slide: class="content-light" data-background-color="#ffffff" -->

<div class="slide-body">
<div class="accent-bar"></div>
<p class="section-marker">Module A — ADT Deep Dive</p>

## molecule

- Multi-scenario testing with shared state
- Collection-aware: test roles in collection context
- Pluggable drivers: Podman, Docker, delegated, cloud

</div>

<div class="slide-footer">
<img src="assets/redhat-logo-color.png" alt="Red Hat" class="footer-logo" />
</div>
