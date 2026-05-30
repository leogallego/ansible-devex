<!-- .slide: class="title-red" data-background-color="#ee0000" -->

<div class="slide-body">
<img src="assets/aap-logo-white.png" alt="Red Hat Ansible Automation Platform" class="product-logo" />

# The Ansible Developer Experience

From individual setup to enterprise workspace

<span class="presenter">Presenter Name — Title</span>

<img src="assets/ansible-stack-white.png" alt="" class="slide-decor slide-decor-right-visible" />
</div>

<div class="slide-footer">
<img src="assets/redhat-logo-white.png" alt="Red Hat" class="footer-logo" />
</div>

Note: Set context: this is about the journey every automation team goes through.

---

<!-- .slide: class="content-light" data-background-color="#ffffff" -->

<div class="slide-body">
<div class="accent-bar"></div>
<p class="section-marker">The Challenge</p>

## The onboarding problem

<div class="mermaid">
timeline
    title Developer Onboarding Timeline
    Day 1 : Kick-off & paperwork
    Day 10 : Laptop arrives
    Day 20 : IDE & tools installed
    Day 30 : Git access granted
    Day 60 : Still waiting for Linux/sudo
</div>

*Months before writing a single playbook*

</div>

<div class="slide-footer">
<img src="assets/redhat-logo-color.png" alt="Red Hat" class="footer-logo" />
</div>

Note: Adjust these numbers to your customer — regulated industries skew higher, cloud-native shops lower. The point isn't the exact days, it's that none of them are 5 minutes.

---

<!-- .slide: class="divider-red" data-background-color="#ee0000" -->

<div class="slide-body">

## What if it took <!-- .element: style="font-size: 3.4em;" --> <br/>5 minutes?

<img src="assets/lightbulb-red.png" alt="" class="slide-decor slide-decor-right" style="opacity: 0.15; max-height: 70%;" />
</div>

<div class="slide-footer">
<img src="assets/redhat-logo-white.png" alt="Red Hat" class="footer-logo" />
</div>

Note: Pause for effect. This is the thesis of the talk.

---

<!-- .slide: class="content-light" data-background-color="#ffffff" -->

<div class="slide-body">
<div class="accent-bar"></div>
<p class="section-marker">The Toolchain</p>

## Ansible Development Tools

<div class="tool-grid">
<div class="tool-group"><h3>Create</h3>
<ul><li>ansible-creator</li><li>ade</li></ul></div>
<div class="tool-group"><h3>Test</h3>
<ul><li>molecule</li><li>ansible-lint</li><li>pytest-ansible</li><li>tox-ansible</li></ul></div>
<div class="tool-group"><h3>Deploy</h3>
<ul><li>ansible-builder</li><li>ansible-navigator</li><li>ansible-sign</li></ul></div>
</div>
</div>

<div class="slide-footer">
<img src="assets/redhat-logo-color.png" alt="Red Hat" class="footer-logo" />
</div>

Note: ADT is one install — `adt --version` shows all tools with compatible versions. No more dependency conflicts.

---

<!-- .slide: class="content-light" data-background-color="#ffffff" -->

<div class="slide-body">
<div class="accent-bar"></div>
<p class="section-marker">The Journey</p>

## The maturity path

<div class="maturity-grid">
<div class="stage"><h3>Crawl</h3><p class="method">pip / uv</p><p class="time">~30 min</p><p class="consistency">Low consistency</p></div>
<div class="stage"><h3>Walk</h3><p class="method">RPM</p><p class="time">~15 min</p><p class="consistency">Medium consistency</p></div>
<div class="stage"><h3>Run</h3><p class="method">Dev Container</p><p class="time">~10 min</p><p class="consistency">High consistency</p></div>
<div class="stage"><h3>Fly</h3><p class="method">Dev Spaces</p><p class="time">~5 min</p><p class="consistency">Highest consistency</p></div>
</div>
<div class="maturity-arrow"><span>← Less governed</span><span>More governed →</span></div>

</div>

<div class="slide-footer">
<img src="assets/redhat-logo-color.png" alt="Red Hat" class="footer-logo" />
</div>

Note: Most customers are somewhere between Crawl and Walk. The container-based methods are the target.

---

<!-- .slide: class="content-light" data-background-color="#ffffff" -->

<div class="slide-body">
<div class="accent-bar"></div>
<p class="section-marker">The Workflow</p>

## The content lifecycle

<div class="lifecycle-flow">
<div class="phase active">Create</div>
<span class="arrow">→</span>
<div class="phase active">Test</div>
<span class="arrow">→</span>
<div class="phase active">Deploy</div>
</div>

<div class="two-col">
<div>

### Inner loop (developer)

Write → Lint → Test → Iterate

Fast feedback, local or container

</div>
<div>

### Outer loop (CI/CD)

PR → GitHub Actions → Controller sync

Automated gates, compliance scanning

</div>
</div>
</div>

<div class="slide-footer">
<img src="assets/redhat-logo-color.png" alt="Red Hat" class="footer-logo" />
</div>

Note: Two loops: the inner loop is your developer's daily experience, the outer loop is what happens when they push.

---

<!-- .slide: class="divider-dark" data-background-color="#292929" -->

<div class="slide-body">

## Scaling to <!-- .element: style="font-size: 3.4em;" --> <br/>the enterprise

<img src="assets/ansible-a-3d.png" alt="" class="slide-decor slide-decor-right" style="opacity: 0.08;" />
</div>

<div class="slide-footer">
<img src="assets/redhat-logo-white.png" alt="Red Hat" class="footer-logo" />
</div>

Note: Transition: we've shown the tools, now how do you roll them out to 50 or 500 developers?

---

<!-- .slide: class="content-light" data-background-color="#ffffff" -->

<div class="slide-body">
<div class="accent-bar"></div>
<p class="section-marker">Enterprise Scale</p>

## Dev Containers: team consistency

- Same image, same tools, same config — every developer
- `.devcontainer/` lives in the repo, versioned with code
- Works on any OS with VS Code + container runtime
- Nested Podman for molecule and ansible-builder

</div>

<div class="slide-footer">
<img src="assets/redhat-logo-color.png" alt="Red Hat" class="footer-logo" />
</div>

Note: This is the sweet spot for most teams starting out. Zero infrastructure investment, immediate consistency.

---

<!-- .slide: class="content-light" data-background-color="#ffffff" -->

<div class="slide-body">
<div class="accent-bar"></div>
<p class="section-marker">Enterprise Scale</p>

## Dev Spaces: zero local dependencies

- Browser-only — ~5 minutes to coding
- Centrally governed by platform team
- `devfile.yaml` defines everything: tools, config, extensions
- Developers just click Create — no local setup

</div>

<div class="slide-footer">
<img src="assets/redhat-logo-color.png" alt="Red Hat" class="footer-logo" />
</div>

Note: The value prop for Dev Spaces is governance + zero desktop requirements. IT loves it because nothing runs locally.

---

<!-- .slide: class="content-light" data-background-color="#ffffff" -->

<div class="slide-body">
<div class="accent-bar"></div>
<p class="section-marker">AI-Assisted Development</p>

## AI-assisted development

<div class="mcp-layout">
<div class="mcp-card">
<h3>Ansible Devtools MCP</h3>
<ul><li>Lint & auto-fix</li><li>Scaffold projects</li><li>Navigate collections</li><li>Build execution environments</li></ul>
</div>
<div class="mcp-card">
<h3>AAP MCP</h3>
<ul><li>Job management</li><li>Inventory queries</li><li>System monitoring</li><li>Gateway endpoints</li></ul>
</div>
</div>
</div>

<div class="slide-footer">
<img src="assets/redhat-logo-color.png" alt="Red Hat" class="footer-logo" />
</div>

Note: Both MCP servers are tech preview. Works with Claude Code, VS Code Copilot Chat, Gemini, Cursor, and other MCP-compatible tools.

---

<!-- .slide: class="content-light" data-background-color="#ffffff" -->

<div class="slide-body">
<div class="accent-bar"></div>
<p class="section-marker">Next Steps</p>

## What should I do next?

<div class="steps-list">
<div class="step"><span class="step-number">1</span><div class="step-content"><h3>Development Assessment</h3><p>1-day workshop</p></div></div>
<div class="step"><span class="step-number">2</span><div class="step-content"><h3>Proof of Concept</h3><p>Red Hat demos feasibility</p></div></div>
<div class="step"><span class="step-number">3</span><div class="step-content"><h3>Implementation & Onboarding</h3><p>Deploy tooling, onboard teams</p></div></div>
<div class="step"><span class="step-number">4</span><div class="step-content"><h3>Data-Driven Improvement</h3><p>Grafana monitoring, iterate</p></div></div>
</div>
</div>

<div class="slide-footer">
<img src="assets/redhat-logo-color.png" alt="Red Hat" class="footer-logo" />
</div>

Note: This is the engagement model. Start with the assessment — it's a 1-day whiteboard session.

---

<!-- .slide: class="thank-you" data-background-color="#ee0000" -->

<div class="slide-body">
<div class="thank-left">

## Thank you

Red Hat is the world's leading provider of enterprise open source software solutions, using a community-powered approach to deliver high-performing Linux, cloud, container, and Kubernetes technologies.

</div>
<div class="thank-right">
<div class="social-item"><span class="social-icon">in</span><span>linkedin.com/company/red-hat</span></div>
<div class="social-item"><span class="social-icon">▶</span><span>youtube.com/user/RedHatVideos</span></div>
<div class="social-item"><span class="social-icon">f</span><span>facebook.com/redhatinc</span></div>
</div>
</div>

<div class="slide-footer">
<img src="assets/redhat-logo-white.png" alt="Red Hat" class="footer-logo" />
</div>
