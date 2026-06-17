# DRAFT: Accelerate automation content development with AI and the Ansible DevTools MCP Server

*What if your AI assistant could actually run ansible-lint instead of just telling you how? The Ansible DevTools MCP Server makes that real, turning any MCP-compatible AI into an Ansible-aware operator that creates, lints, and debugs your automation content, and helps you develop playbooks grounded in real module documentation.*

---

Ask an AI assistant how to lint an Ansible playbook today, and you'll likely get a helpful but generic answer: "Use ansible-lint. Install it with pip install ansible-lint, then run it against your playbook." Correct. Also not very useful when you already have ansible-lint installed, your team has a custom linting profile, and what you actually wanted was for the tool to just run and fix the violations.

That's the gap between an AI that **describes** and an AI that **does**. The Ansible DevTools MCP Server bridges it, and it works with whatever AI model you already use.

## The context switching problem

Developing Ansible automation today involves constant context switching. Checking module documentation across upstream docs, Red Hat knowledge base articles, and internal communities of practice. Figuring out which tool to use and how to run it. Parsing AI-generated suggestions against what's actually installed. Correlating lint violations with runtime failures. All of it means jumping between browser tabs, terminals, and the editor. It adds up.

The workflow is fragmented, and it hits new automation developers hardest. When someone asks an AI assistant for help writing a playbook, the assistant generates code that looks syntactically correct, but it may reference collections that aren't installed, use module parameters that don't exist in the installed version, or ignore the organization's naming conventions entirely. The AI doesn't know what's actually in the developer's local environment.

## Model Context Protocol: from advisor to operator

The [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) is an open standard for connecting AI assistants to external tools through a unified interface. Instead of the AI guessing how to use a tool, MCP provides a structured contract: the tool declares what it can do (with full parameter schemas), and the AI calls it deterministically.

The Ansible DevTools MCP Server (`@ansible/ansible-mcp-server`) wraps the Ansible Development Tools CLI into this protocol. With the MCP server configured, the interaction changes:

| Without MCP | With MCP |
|-------------|----------|
| *"How do I lint my playbook?"* → AI explains how to install and run ansible-lint | *"Lint my playbook"* → AI finds the ansible-lint MCP tool, executes it, and returns results |
| *"Set up my environment"* → AI suggests various pip and galaxy commands | *"Set up my environment with collection X"* → AI calls the environment setup tool directly |
| *"Create a playbook for..."* → AI scaffolds from memory, may hallucinate module names | *"Create a playbook for..."* → AI uses ansible-creator through MCP, producing valid scaffolding |
| Quality check requires reading logs, fixing manually, re-prompting | *"Lint and fix issues"* → AI runs lint, applies --fix, iterates until clean |

MCP adds a layer of abstraction between the AI and the tool, providing context around **when**, **why**, and exactly **how** to execute a particular process. This cuts back on the guesswork and non-deterministic behaviors that make AI-driven development unreliable.

## What the MCP server can do

The current Ansible DevTools MCP Server covers the core automation developer workflow across several areas:

- **Code quality:** Run ansible-lint against playbooks, roles, and collections, with the option to auto-fix violations.
- **Project scaffolding:** Create new collections, playbooks, and roles through ansible-creator, following organizational templates and standards.
- **Playbook execution:** Run playbooks through ansible-navigator with execution environment support.
- **Environment management:** Set up, inspect, and verify Ansible development environments, including tool versions and dependencies.
- **Execution environments:** Define and build EE container images from within the conversation.
- **Best practices:** Surface community and organizational guidelines so the AI generates code that follows your team's conventions.

These aren't wrappers around generic shell commands. Each tool encodes the specific way an Ansible development tool needs to be invoked, with the right flags, the right order, and proper error handling. The AI doesn't figure out how to run `ansible-lint` on its own; it follows the implementation the Ansible engineering team built.

A next-generation MCP server is already in development, expanding coverage to include plugin discovery and documentation lookup across installed collections, Galaxy browsing, task and playbook generation grounded in real module schemas, and tighter integration between the MCP tools and the VS Code extension UI. The goal is full parity: anything a developer can do through the extension's interface, an AI agent can do through MCP, and vice versa.

## Bring your own model

The Ansible DevTools MCP Server doesn't require a specific AI provider. It works with any MCP-compatible client, so automation developers and content creators can use the AI assistant they already have:

- **GitHub Copilot** in VS Code
- **Claude Code** in the terminal or VS Code
- **Gemini CLI** for Google's models
- **Cursor**, **Windsurf**, or any other MCP-compatible editor

The Ansible VS Code extension makes setup even simpler. The `@ansible/ansible-mcp-server` package ships bundled inside the extension itself. Set `ansible.mcpServer.enabled` to `true` and the extension spawns the MCP server as a child process using VS Code's built-in Node.js runtime. No separate npm install, no Node.js on your PATH. It's available to any AI chat client in the IDE as soon as you enable the setting.

For organizations with specific AI governance requirements, the choice of model stays in their hands. The Ansible engineering team is developing a provider-agnostic middleware approach that decouples AI provider logic from the core extension. Users will configure their endpoint and API key in one place, enabling a "Bring Your Own Model" setup that works with local instances, air-gapped corporate servers, or any cloud provider.

## The deterministic coding assistant

Model flexibility is one piece. The harder problem is **accuracy**. AI-generated Ansible code today often looks correct but fails on execution because the model doesn't know what's actually installed in the developer's environment.

The strategy is to feed the AI deterministic, real-time context from the local workspace, prioritizing correctness over velocity:

- **Full ansible-doc coverage via MCP**, grounding the AI in authoritative schema data for every installed collection and module version.
- **Environment-aware generation**, where the AI won't generate code for missing dependencies and instead offers a path to resolve them (like `ansible-galaxy install`) within the chat interface.
- **A documentation feedback loop**, where code generates structured reference guides that the AI consumes to ground its future suggestions.

The goal: an AI assistant that doesn't hallucinate collection names or guess module parameters, because it knows what's actually available in your environment.

This also changes the game for automation architects and communities of practice standardizing across teams. Today, enforcing naming conventions, lint profiles, and approved patterns means writing a wiki and hoping everyone reads it. The MCP server includes a documentation and knowledge layer that surfaces best practices, module documentation, and organizational guidelines directly into the AI conversation. Every developer's AI assistant follows the same standards, not because someone read a document, but because the tooling makes it the path of least resistance.

This layer is expanding in the next generation of the server, with deeper coverage of collection docs, plugin schemas, and community guidance. If Ansible Workspaces governs the environment (same tools, same versions), the MCP server governs the content (same practices, same conventions).

## What this looks like in practice

### Inner loop: content development

An automation developer working on a network automation collection can have a conversation like this:

> *"Scaffold a network automation collection, add a backup role, lint it, write molecule tests, fix all violations."*

The AI calls ansible-creator to scaffold the project, generates role defaults and tasks, runs ansible-lint against the team's profile, applies fixes, and presents the result for review. One context. No tab switching.

### Outer loop: operational integration

For teams with a development Ansible Automation Platform instance, the companion **AAP MCP Server** extends AI assistance into operations. Available starting with AAP 2.6.4, the AAP gateway exposes MCP endpoints for job management, inventory queries, system monitoring, and more.

A platform engineer can ask:

> *"Show me failed jobs in the last 24 hours, check inventory for hosts missing the security baseline, launch the remediation template."*

The AI queries the Controller API for failed jobs, cross-references inventory data, and launches a job template, all through structured MCP calls with the user's RBAC permissions. Tokens can be scoped as read-only for querying or read-write when job launching is needed.

Together, the Ansible DevTools MCP and AAP MCP connect the inner loop (content creation) with the outer loop (content execution) through the same AI interface. Write a playbook, push it to a dev AAP instance, run it, troubleshoot failures. One conversation.

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

The Ansible DevTools MCP Server is available as a Technology Preview. For the full setup guide, including AAP MCP Server configuration, see the [MCP server documentation](https://docs.ansible.com/projects/vscode-ansible/mcp/).

## Beyond development: MCP in execution environments

The Ansible DevTools MCP Server covers the development side, but the Ansible ecosystem is also exploring MCP at runtime. The `ansible.mcp` collection (available as a Technology Preview) lets you invoke MCP servers directly from playbooks using native Ansible module syntax inside execution environments. That's a topic for another post, but the direction is worth noting: MCP is becoming an integration layer across the Ansible platform, from development through execution.

---

*Visit the [Ansible Development Tools documentation](https://docs.redhat.com/en/documentation/red_hat_ansible_automation_platform/2.6/html/developing_automation_content/devtools-intro) for the full solution guide, or join the community on the [Ansible Development Tools forum](https://forum.ansible.com/tag/devtools).*
