# From context switching to vibe coding: AI-assisted Ansible development with MCP

*The Ansible DevTools MCP Server and the Ansible VS Code extension turn AI assistants from tentative advisors into trusted operators — scaffolding, linting, and debugging automation content through natural language, with any AI model you choose.*

---

Ask an AI assistant how to lint an Ansible playbook today, and you will likely get a helpful but generic answer: "Use ansible-lint. Install it with pip install ansible-lint, then run it against your playbook." Correct, but not very useful when you already have ansible-lint installed, your team has a custom linting profile, and what you actually wanted was for the tool to run and fix the violations for you.

This is the gap between an AI that **describes** and an AI that **does**. The Ansible DevTools MCP Server bridges that gap — and it works with whatever AI model you already use.

## The context switching problem

Developing Ansible automation today involves constant context switching. Finding community documentation and Community of Practice resources. Locating the right tool for the job and figuring out how to run it. Parsing AI-generated output for reliability. Correlating best practice violations with runtime issues. Each of these requires switching between browser tabs, terminals, documentation sites, and the editor — and the research, correlation effort, and resource switching adds up.

The result is a fragmented workflow that decreases productivity and raises the barrier to entry for new automation developers. When a developer asks an AI assistant for help writing a playbook, the assistant generates code that looks syntactically correct — but it may reference collections that are not installed, use module parameters that do not exist in the installed version, or ignore the organization's naming conventions entirely. The AI does not know what is actually in the developer's local environment.

## Model Context Protocol: from advisor to operator

The [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) is an open standard for connecting AI assistants to external tools through a unified interface. Instead of the AI guessing how to use a tool, MCP provides a structured contract: the tool declares what it can do (with full parameter schemas), and the AI calls it deterministically.

The Ansible DevTools MCP Server (`@ansible/ansible-mcp-server`) wraps the Ansible Development Tools CLI into this protocol. When an AI assistant has the MCP server configured, the interaction changes fundamentally:

| Without MCP | With MCP |
|-------------|----------|
| *"How do I lint my playbook?"* → AI explains how to install and run ansible-lint | *"Lint my playbook"* → AI finds the ansible-lint MCP tool, executes it, and returns results |
| *"Set up my environment"* → AI suggests various pip and galaxy commands | *"Set up my environment with collection X"* → AI calls the environment setup tool directly |
| *"Create a playbook for..."* → AI scaffolds from memory, may hallucinate module names | *"Create a playbook for..."* → AI uses ansible-creator through MCP, producing valid scaffolding |
| Quality check requires reading logs, fixing manually, re-prompting | *"Lint and fix issues"* → AI runs lint, applies --fix, iterates until clean |

MCP adds a layer of abstraction between the AI and the tool — providing context around **when**, **why**, and exactly **how** to execute a particular process. This cuts back on the guesswork and non-deterministic behaviors that make AI-driven development unreliable.

## Ten tools, one server

The Ansible DevTools MCP Server currently exposes ten tools covering the core developer workflow:

| Tool | What it does |
|------|-------------|
| `ansible_lint` | Run ansible-lint, optionally apply --fix |
| `create_ansible_projects` | Scaffold collections, playbooks, and roles via ansible-creator |
| `ansible_navigator` | Run playbooks through ansible-navigator with execution environments |
| `define_and_build_execution_env` | Create and build execution environment definitions |
| `ade_setup_environment` | Set up a complete Ansible development environment |
| `ade_environment_info` | Check installed tool versions and environment status |
| `adt_check_env` | Verify ansible-dev-tools installation |
| `ansible_content_best_practices` | Retrieve community and organizational best practice guidelines |
| `zen_of_ansible` | Surface the 20 design philosophy aphorisms that guide Ansible development |
| `list_available_tools` | Discover all available MCP tools |

These tools are not wrappers around generic shell commands. Each one encodes the specific way an Ansible development tool needs to be invoked — the right flags, the right order, the right error handling. When the AI calls `ansible_lint`, it does not figure out how to run the tool on its own; it follows the implementation that the Ansible engineering team built.

## Bring your own model

A key design principle of the DevTools MCP Server is **model flexibility**. The MCP server does not require a specific AI provider — it works with any MCP-compatible client. Developers can use the AI assistant they already have:

- **GitHub Copilot** in VS Code
- **Claude Code** in the terminal or VS Code
- **Gemini CLI** for Google's models
- **Cursor**, **Windsurf**, or any other MCP-compatible editor

The Ansible VS Code extension makes setup even simpler. The MCP server implementation lives inside the extension itself — enable the `ansible.mcpServer.enabled` setting, and the server starts automatically. No separate process, no npm install, no additional configuration. Installing the Ansible extension makes the MCP server immediately available to any AI agent in the IDE.

For organizations with specific AI governance requirements, this architecture means the choice of model is entirely in their hands. The Ansible engineering team is actively developing a provider-agnostic middleware approach that decouples AI provider logic from the core extension. The goal: users configure their endpoint and API key in one centralized location, enabling a "Bring Your Own Model" approach that works with local instances, air-gapped corporate servers, or any cloud provider — without vendor lock-in.

## The deterministic coding assistant

Beyond model flexibility, the roadmap for the DevTools MCP Server focuses on a critical challenge: **accuracy**. AI-generated Ansible code today often looks correct but fails immediately upon execution because the model does not know what is actually installed in the developer's environment.

The strategy is to feed the AI deterministic, real-time context from the local workspace — prioritizing correctness over velocity. This means:

- **Unified documentation access:** Delivering 100% coverage of ansible-doc via the MCP server, grounding the AI in authoritative schema data for every installed collection and module version.
- **Environment-aware generation:** The AI refuses to generate code for missing dependencies and instead offers a clear path to resolve them (such as `ansible-galaxy install`) within the chat interface.
- **Deterministic documentation generation:** A cycle of value where code generates structured reference guides, and the AI consumes those guides to ground its future coding suggestions.

The result is an AI assistant that does not hallucinate collection names, does not guess module parameters, and does not ignore what is actually available in the developer's environment.

## What this looks like in practice

### Inner loop: content development

A developer working on a network automation collection can have a conversation like this:

> *"Scaffold a network automation collection, add a backup role, lint it, write molecule tests, fix all violations."*

The AI assistant calls ansible-creator to scaffold the project, generates role defaults and tasks, runs ansible-lint against the team's profile, applies fixes, and presents the result for review. The developer stays in a single context — no switching between documentation, terminals, and the editor.

### Outer loop: operational integration

For teams with a development Ansible Automation Platform instance, the companion **AAP MCP Server** extends AI assistance into operations. Available starting with AAP 2.6.4, the AAP gateway exposes MCP endpoints for job management, inventory queries, system monitoring, and more.

A platform engineer can ask:

> *"Show me failed jobs in the last 24 hours, check inventory for hosts missing the security baseline, launch the remediation template."*

The AI queries the Controller API for failed jobs, cross-references inventory data, and launches a job template — all through structured MCP calls with the user's RBAC permissions. Tokens can be scoped as read-only for querying or read-write when job launching is needed.

Together, the DevTools MCP and AAP MCP connect the inner loop (content creation) with the outer loop (content execution) through the same AI interface. Write a playbook, push it to a dev AAP instance, run it, troubleshoot failures — in a single conversation.

## Getting started

**In the VS Code extension:** Install the [Ansible extension for VS Code](https://marketplace.visualstudio.com/items?itemName=redhat.ansible), then enable `ansible.mcpServer.enabled` in your settings. The MCP server starts automatically and is available to any AI chat client in VS Code.

**With Claude Code:**

```bash
claude mcp add ansible -- npx -y @ansible/ansible-mcp-server --stdio
```

**With any MCP client (VS Code Copilot Chat, Cursor, etc.):**

Add to your MCP configuration:

```json
{
  "mcp": {
    "servers": {
      "ansible": {
        "command": "npx",
        "args": ["-y", "@ansible/ansible-mcp-server", "--stdio"],
        "env": {
          "WORKSPACE_ROOT": "${workspaceFolder}"
        }
      }
    }
  }
}
```

**As a container:**

```bash
podman run --rm -i \
  -v /path/to/your/ansible/project:/workspace \
  -e WORKSPACE_ROOT=/workspace \
  ghcr.io/ansible/devtools-mcp-server:latest --stdio
```

The DevTools MCP Server is available as a Technology Preview. For the full setup guide, including AAP MCP Server configuration, see the [MCP server documentation](https://docs.ansible.com/projects/vscode-ansible/mcp/).

## Beyond development: MCP in execution environments

While the DevTools MCP Server focuses on the development experience, the Ansible ecosystem is also exploring MCP at runtime. The `ansible.mcp` collection (available as a Technology Preview) provides a standardized plugin framework for invoking MCP servers directly from Ansible playbooks — calling external tools and APIs using native Ansible module syntax within execution environments. That is a topic for another post, but the direction is clear: MCP is becoming a foundational integration layer across the Ansible platform, from development to execution.

---

*Visit the [Ansible Development Tools documentation](https://docs.redhat.com/en/documentation/red_hat_ansible_automation_platform/2.6/html/developing_automation_content/devtools-intro) for the full solution guide, or join the community on [Matrix #devtools:ansible.com](https://matrix.to/#/#devtools:ansible.com).*
