# OpenShoot NetSuite v0.2 — evidence-backed open-source launch copy

Oracle's NetSuite AI Connector has changed the economics of basic ERP-to-AI integration.

NetSuite 2026.2 includes MCP Standard Tools and Oracle's SuiteSkills plug-in with 48 business skills. That's Oracle's innovation, and it's already available through its own supported platform.

But any real implementation still has difficult questions: Is the role correctly restricted? Are OAuth and feature prerequisites enabled? Which tools can actually be seen? What about OneWorld subsidiaries, custom fields, scripts, workflows and approvals?

So I've published **OpenShoot NetSuite v0.2** — an independent MIT-licensed project to make the repeatable *administrator onboarding and readiness* work free.

The public repo now contains:
- A step-by-step NetSuite administrator onboarding guide aligned to Oracle's official connector requirements
- An offline readiness CLI and candidate MCP endpoint generator
- An evidence-based 16-check assessment with explicit blockers
- A reusable AI Skill, synthetic examples, unit tests and automated CI configuration
- Security boundaries and troubleshooting guidance

You can run the checker without providing passwords, OAuth tokens or NetSuite data.

**Important:** This is an administrator-guided toolkit, not yet a one-click live NetSuite connection or production-certified integration. Authenticated discovery and real tenant end-to-end validation remain roadmap items.

The bigger idea is to open-source repetitive, documentable setup work — and keep expert effort focused on complex implementation-specific risks.

Source, tests and how-to guide: https://github.com/ashunand-ai/openshoot-netsuite

If you're a NetSuite administrator, CFO, developer or SI: please review it, challenge the gaps and contribute improvements.

#NetSuite #MCP #OpenSource #SuiteCloud #EnterpriseAI #Claude
