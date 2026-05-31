<!-- .slide: class="divider-red" data-background-color="#ee0000" -->

<div class="slide-body">
<p class="section-marker">Deep Dive</p>

## ADT Tools <!-- .element: style="font-size: 3.4em;" --> <br/>in Detail

<img src="assets/ansible-a-3d.png" alt="" class="slide-decor slide-decor-right" style="opacity: 0.12; max-height: 65%;" />
</div>

<div class="slide-footer">
<img src="assets/redhat-logo-white.png" alt="Red Hat" class="footer-logo" />
</div>

Note: This module walks through the key tools in the ADT bundle and how they connect across the Create → Test → Deploy lifecycle.

---

<!-- .slide: class="content-light" data-background-color="#ffffff" -->

<div class="slide-body">
<div class="accent-bar"></div>
<p class="section-marker">Module A — Create</p>

## ansible-creator & ansible-dev-environment

- **ansible-creator:** scaffold collections, roles, playbooks, and EE definitions
- **ansible-dev-environment (ade):** pip-like install for collections in virtual environments
- Opinionated project structure with molecule, lint config, and CI templates out of the box
- Consistent starting point — no more copy-pasting boilerplate from old projects

</div>

<div class="slide-footer">
<img src="assets/redhat-logo-color.png" alt="Red Hat" class="footer-logo" />
</div>

Note: ansible-creator replaces the old "copy an existing role and rename things" workflow. It generates the full directory structure including molecule scenarios, ansible-lint config, and .devcontainer setup. Run `ansible-creator init collection` or `ansible-creator init role` to get started.

---

<!-- .slide: class="content-light" data-background-color="#ffffff" -->

<div class="slide-body">
<div class="accent-bar"></div>
<p class="section-marker">Module A — Test</p>

## ansible-lint

- Opinionated profiles: min → basic → moderate → safety → shared → production
- Auto-fix with `--fix` for common violations
- CI integration: exit codes, SARIF output for GitHub code scanning
- VS Code extension shows violations inline as you type

</div>

<div class="slide-footer">
<img src="assets/redhat-logo-color.png" alt="Red Hat" class="footer-logo" />
</div>

Note: The profiles are the key feature — start a team on "moderate" and ratchet up to "production" over time. The --fix flag automatically corrects common issues (FQCN, YAML formatting, deprecated syntax). SARIF output integrates with GitHub Advanced Security for PR annotations. The VS Code Ansible extension uses ansible-lint under the hood for real-time feedback.

---

<!-- .slide: class="content-light" data-background-color="#ffffff" -->

<div class="slide-body">
<div class="accent-bar"></div>
<p class="section-marker">Module A — Test</p>

## molecule

- Integration testing with ephemeral infrastructure
- Pluggable drivers: Podman, Docker, delegated, cloud
- Collection-aware: test roles within their collection context
- Multi-scenario support for different test configurations

</div>

<div class="slide-footer">
<img src="assets/redhat-logo-color.png" alt="Red Hat" class="footer-logo" />
</div>

Note: Molecule creates a container (or VM, or cloud instance), runs your role, verifies the result, and tears it down. The Podman driver is the default — it works inside dev containers with nested Podman. Each scenario is a different test setup: default, multi-node, specific OS versions. `molecule test` runs the full create → converge → verify → destroy cycle.

---

<!-- .slide: class="content-light" data-background-color="#ffffff" -->

<div class="slide-body">
<div class="accent-bar"></div>
<p class="section-marker">Module A — Test</p>

## pytest-ansible & tox-ansible

- **pytest-ansible:** pytest plugin for testing Ansible module and plugin Python code
- **tox-ansible:** test matrix across multiple Python and ansible-core versions
- Complement molecule: unit tests for Python code, integration tests for roles

</div>

<div class="slide-footer">
<img src="assets/redhat-logo-color.png" alt="Red Hat" class="footer-logo" />
</div>

Note: pytest-ansible is for testing the Python code inside modules and plugins — not for testing playbooks (that's molecule). tox-ansible generates a test matrix so you can verify your collection works across Python 3.10/3.11/3.12 and ansible-core 2.16/2.17. These are advanced tools — most teams start with molecule and ansible-lint, then add pytest and tox as they mature.

---

<!-- .slide: class="content-light" data-background-color="#ffffff" -->

<div class="slide-body">
<div class="accent-bar"></div>
<p class="section-marker">Module A — Deploy</p>

## Execution Environments

- **ansible-builder:** build container images with your collections, Python deps, and system packages
- Reproducible automation runtime — same image runs in dev, CI, and Controller
- Replaces manual `pip install` on Controller nodes
- Definition file (`execution-environment.yml`) is versioned in your repo

</div>

<div class="slide-footer">
<img src="assets/redhat-logo-color.png" alt="Red Hat" class="footer-logo" />
</div>

Note: Execution Environments (EEs) are the deployment unit for automation content. Instead of installing collections and dependencies on every Controller node, you build a container image with everything baked in. The EE definition file lists your collections, Python packages, and system packages. ansible-builder creates the Containerfile and builds the image. This is a critical concept for the outer loop — CI builds the EE, pushes to a registry, Controller pulls it.

---

<!-- .slide: class="content-light" data-background-color="#ffffff" -->

<div class="slide-body">
<div class="accent-bar"></div>
<p class="section-marker">Module A — Deploy</p>

## ansible-navigator & ansible-sign

- **ansible-navigator:** TUI for running and troubleshooting automation with EEs
- **ansible-sign:** sign and verify Ansible project contents for supply chain security
- Navigator shows what runs inside the EE — collections, Python packages, settings
- Signing ensures content integrity from dev to production

</div>

<div class="slide-footer">
<img src="assets/redhat-logo-color.png" alt="Red Hat" class="footer-logo" />
</div>

Note: ansible-navigator replaces the traditional `ansible-playbook` command for EE-based workflows. It provides a TUI that lets you inspect the execution environment contents, replay task output, and debug failures interactively. ansible-sign uses GPG to sign project directories — CI can verify that the content deployed to Controller matches what was approved in the PR. This closes the supply chain loop.
