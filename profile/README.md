## Rossoctl - The Agentic Platform
An open source platform for building, deploying, securing, and governing AI agents on Kubernetes.

Built on open standards:
- [A2A](https://github.com/google/A2A) — agent-to-agent communication
- [MCP](https://modelcontextprotocol.io/) — agent-to-tool integration

### Repositories

#### Core

- **[rossoctl](https://github.com/rossoctl/rossoctl)** - Main installer, UI, and documentation (Python)
- **[operator](https://github.com/rossoctl/operator)** - Kubernetes operator for deploying and lifecycle management of agents and tools (Go)
- **[cortex](https://github.com/rossoctl/cortex)** - Kubernetes security extensions for zero-trust agent authentication (Go)
- **[examples](https://github.com/rossoctl/examples)** - Sample agents and tools (Python)
- **[.github](https://github.com/rossoctl/.github)** - Project website and documentation (Docusaurus/HTML)
- **[automation](https://github.com/rossoctl/automation)** - Automated org maintenance tooling using a scanner/fixer pattern (Shell)
- **[agent-skills](https://github.com/rossoctl/agent-skills)** - Reusable agent skills for org automation, such as link-health, automated pull request reviewing, and dependency scanning (Shell)
- **[rossoctl-cli](https://github.com/rossoctl/rossoctl-cli)** - Command-line interface for Rossoctl (Go)

#### Experimental

- **[mcp-gateway](https://github.com/Kuadrant/mcp-gateway)** - Envoy-based MCP Gateway (Go) — *hosted under [Kuadrant](https://github.com/Kuadrant) org*
- **[capture-the-flag](https://github.com/rossoctl/capture-the-flag)** - Capture the flag scenarios to demonstrate and test Rossoctl's security posture
- **[workload-harness](https://github.com/rossoctl/workload-harness)** - Benchmarking and load-generation harness for evaluating agents on the Rossoctl platform (Shell)
- **[context-guru](https://github.com/rossoctl/context-guru)** - Context engineering for agentic systems — compacts and summarizes LLM context to cut cost and latency while preserving accuracy (Go)
- **[aiac](https://github.com/rossoctl/aiac)** - AI-based Access Control — translates natural-language policy into enforced PDP rules for AI agents on Kubernetes (Python)

### Get involved

- 📖 Start with the [CONTRIBUTING](https://github.com/rossoctl/rossoctl/blob/main/CONTRIBUTING.md) guide
- 👥 Meet the [maintainers](https://github.com/rossoctl/rossoctl/blob/main/MAINTAINERS.md)
- 🌐 Learn more at [rossoctl.dev](https://rossoctl.dev/)
- 💬 Or just come say hi in the [Rossoctl Slack](https://ibm.biz/rossoctl-slack)
