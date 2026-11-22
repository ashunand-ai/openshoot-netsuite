---
name: openshoot-netsuite
description: Guide secure NetSuite AI Connector readiness, MCP preparation, least-privilege administrator onboarding, customer-specific discovery planning, read-only tests and implementation validation. Use for Oracle NetSuite to Claude or compatible AI client connection assessment, permission reviews, customisation checks and deployment handover.
---

# OpenShoot NetSuite

1. Start with Oracle's native NetSuite AI Connector Service and Standard Tools SuiteApp. Consult current Oracle documentation and account release.
2. Ask only for authorised NetSuite account ID, environment, AI client and use case; never ask the user to paste passwords, tokens, secrets or private keys.
3. Use `python scripts/openshoot.py --account-id ACCOUNT --environment sandbox` for an **offline** readiness report. The report is not a connection test.
4. Work with the administrator to verify relevant feature prerequisites, the installed SuiteApp, roles, OAuth access and approved client setup using the official [deployment guide](references/deployment.md).
5. Avoid Administrator role access. Follow least privilege and documented policies in [references/risks.md](references/risks.md).
6. After a separately authorised live connection, enumerate available tools and inspect only permitted metadata. Label VERIFIED, USER_CONFIRMED, UNKNOWN and NOT_ACCESSIBLE with evidence.
7. Evaluate OneWorld subsidiaries, custom records, fields, forms, accounting periods, scripts, workflows and integrations, without assuming they are API-discoverable.
8. Prioritise read-only validation. Never perform consequential writes, permission changes or production deployment without explicit approval.
9. Distinguish mock/local tests from sandbox and production evidence. Never claim live access based on generated URLs.
10. Do not represent Oracle's native MCP tools or business SuiteSkills as OpenShoot-built features.

Produce an evidence table, readiness checklist, unknowns, safe next steps and handover.
