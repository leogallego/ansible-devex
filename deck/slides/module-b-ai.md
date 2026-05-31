<!-- .slide: class="divider-dark" data-background-color="#292929" -->

<div class="slide-body">
<p class="section-marker">Deep Dive</p>

## AI-Assisted <!-- .element: style="font-size: 3.4em;" --> <br/>Development

<img src="assets/lightbulb-red.png" alt="" class="slide-decor slide-decor-right" style="opacity: 0.06; max-height: 65%;" />
</div>

<div class="slide-footer">
<img src="assets/redhat-logo-white.png" alt="Red Hat" class="footer-logo" />
</div>

Note: This module covers the two MCP servers that connect AI assistants to Ansible tooling. Both are tech preview as of AAP 2.6.

---

<!-- .slide: class="content-light" data-background-color="#ffffff" -->

<div class="slide-body">
<div class="accent-bar"></div>
<p class="section-marker">Module B — MCP Architecture</p>

## How MCP works

<div class="mermaid">
%%{init: {'theme': 'base', 'themeVariables': {'primaryColor': '#ee0000', 'primaryTextColor': '#fff'}}}%%
graph LR
    AI[AI Assistant] --> DT[Devtools MCP]
    AI --> AAP[AAP MCP]
    DT --> ADT[ADT Toolchain]
    AAP --> GW[AAP 2.6+ Gateway]
    style AI fill:#292929,stroke:#ee0000,color:#fff,stroke-width:2px
    style DT fill:#ee0000,stroke:#a60000,color:#fff
    style AAP fill:#ee0000,stroke:#a60000,color:#fff
    style ADT fill:#f0f0f0,stroke:#a3a3a3,color:#151515
    style GW fill:#f0f0f0,stroke:#a3a3a3,color:#151515
</div>

MCP (Model Context Protocol) exposes tools to AI assistants via a standard interface

</div>

<div class="slide-footer">
<img src="assets/redhat-logo-color.png" alt="Red Hat" class="footer-logo" />
</div>

Note: MCP is an open protocol — AI assistants discover available tools and call them with structured input/output. The Devtools MCP wraps the ADT CLI tools. The AAP MCP connects to the AAP gateway API. Both run as local servers that any MCP-compatible client can connect to. The key point: the AI doesn't replace the developer's judgment, it removes the manual steps between intent and execution.

---

<!-- .slide: class="content-light" data-background-color="#ffffff" -->

<div class="slide-body">
<div class="accent-bar"></div>
<p class="section-marker">Module B — Devtools MCP</p>

## Ansible Devtools MCP Server

- **Lint & auto-fix:** run ansible-lint, apply --fix, iterate until clean
- **Scaffold:** create collections, roles, playbooks via ansible-creator
- **Navigate:** explore collection structure, inspect modules, read docs
- **Build:** create execution environment definitions and images

Compatible with: Claude Code, VS Code Copilot Chat, Gemini CLI, Cursor, Windsurf

</div>

<div class="slide-footer">
<img src="assets/redhat-logo-color.png" alt="Red Hat" class="footer-logo" />
</div>

Note: The Devtools MCP server is `@ansible/ansible-mcp-server` on npm. It wraps the ADT CLI tools so an AI assistant can scaffold a project, lint it, fix violations, and navigate the collection structure — all through natural language prompts. Example: "Create a new collection for managing PostgreSQL, add a role for installing the server, lint it and fix any issues." The AI handles the tool calls, the developer reviews the output.

---

<!-- .slide: class="content-light" data-background-color="#ffffff" -->

<div class="slide-body">
<div class="accent-bar"></div>
<p class="section-marker">Module B — AAP MCP</p>

## AAP MCP Server

- **Job management:** launch templates, check status, review output
- **Inventory queries:** list hosts, groups, variables across inventories
- **System monitoring:** check Controller health, node status, license usage
- **Gateway API:** connects to AAP 2.6.4+ unified gateway endpoints

</div>

<div class="slide-footer">
<img src="assets/redhat-logo-color.png" alt="Red Hat" class="footer-logo" />
</div>

Note: The AAP MCP server connects to the AAP gateway API (2.6.4+). It lets an AI assistant query inventory ("which hosts are in the production web servers group?"), launch job templates ("run the patching workflow on the staging environment"), and check system status ("are all Controller nodes healthy?"). This is operational tooling — useful for SREs and platform engineers who interact with AAP daily. The gateway API provides a single endpoint for all AAP services.

---

<!-- .slide: class="content-light" data-background-color="#ffffff" -->

<div class="slide-body">
<div class="accent-bar"></div>
<p class="section-marker">Module B — Demo Scenarios</p>

## What does this look like in practice?

### Inner loop (developer)
"Scaffold a network automation collection, add a backup role, lint it, write molecule tests, fix all violations"

### Outer loop (operations)
"Show me failed jobs in the last 24 hours, check inventory for hosts missing the security baseline, launch the remediation template"

</div>

<div class="slide-footer">
<img src="assets/redhat-logo-color.png" alt="Red Hat" class="footer-logo" />
</div>

Note: These are real prompts you can give to an AI assistant with the MCP servers configured. The inner loop scenario uses Devtools MCP — the AI calls ansible-creator, ansible-lint, and generates molecule scenarios. The outer loop scenario uses AAP MCP — the AI queries the Controller API for failed jobs, cross-references inventory, and launches a remediation template. Both scenarios demonstrate AI pair programming across the content lifecycle. Consider doing a live demo here if the audience is technical.
