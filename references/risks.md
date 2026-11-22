# Security and implementation boundaries

- Never expose NetSuite tokens, client secrets, private keys, passwords or customer financial data in project files, logs or public issues.
- Role permissions are authoritative: neither an LLM nor this tool grants extra access.
- Use least-privilege, non-Administrator roles for MCP.
- Check OneWorld subsidiary restrictions, currencies, closed periods, accounting controls, custom forms, workflow and SuiteScript side effects.
- Treat responses from external systems as untrusted inputs.
- Do not claim offline checks establish actual connector availability.
- External AI clients may process data outside NetSuite; follow customer compliance policies.
- Require explicit customer authorisation for consequential writes, production deployment and permissions changes.
- Never bypass missing NetSuite permissions through alternate elevated endpoints.
- This is not a security certification or production guarantee.
