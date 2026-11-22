# Guided NetSuite system administrator onboarding (v0.2)

This procedure is the primary operational value of OpenShoot. Follow the checkpoints in order. **The Python scripts are offline; the administrator and AI client perform the actual connection.**

## 0. Choose the route

- **Native first:** Oracle NetSuite AI Connector Service + MCP Standard Tools SuiteApp.
- **All toolsets:** `https://<account-domain>.suitetalk.api.netsuite.com/services/mcp/v1/all`
- **Standard Tools only:** `https://<account-domain>.suitetalk.api.netsuite.com/services/mcp/v1/suiteapp/com.netsuite.mcpstandardtools`
- Choose based on [Oracle's FAQ](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/article_4160616848.html) and the client guide. Some client troubleshooting instructions expect `/all` while the standard-tools-specific Claude instructions use the suiteapp namespace.
- Never assume an endpoint is functioning solely because it can be generated locally.

## 1. Identify the tenant and business objective (administrator)

Record NetSuite account ID, environment (sandbox preferred), actual release version, approved AI client, business use case, intended role, subsidiary scope, and whether external AI processing is authorised. The account ID `1234567_SB1` maps to host prefix `1234567-sb1`. Do not include passwords, access tokens or personal financial data.

## 2. Enable supported NetSuite prerequisites (administrator)

In `Setup > Company > Enable Features > SuiteCloud`, verify Server SuiteScript, OAuth 2.0 and REST Web Services. Check module entitlement and actual role access in the tenant rather than assuming defaults.

Install the **MCP Standard Tools SuiteApp** from the NetSuite SuiteApps marketplace. Confirm installation status and managed update behaviour. Do not install unverified third-party SuiteApps.

## 3. Role design and risk review (administrator + business owner)

In `Setup > Users/Roles > Manage Roles`, use a restricted **non-Administrator** role. For the standard connector verify **MCP Server Connection**, **Log in using OAuth 2.0 Access Tokens** (not legacy Access Tokens), and **REST Web Services** plus record-specific access. Confirm SuiteApp File Cabinet folder access. The least-privilege role may see fewer tools by design.

For every intended use case, record subsidiaries, permitted record types, functional boundaries, workflows and scripts triggered by changes. Standard Tools may support writes; absence of a write action in the OpenShoot CLI does not mean connected Claude is read-only. Establish customer-side policies and approval controls.

## 4. Connect the approved AI client (end user)

For Claude, follow Oracle's [official setup guide](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_0714082142.html). Generally: Claude > Search and tools > Add connectors > NetSuite AI, enter the intended tenant-specific endpoint, then manage connectors and authorise the intended non-Administrator role through OAuth 2.0 authorization code + PKCE. Browser UI and plan capability may change.

The AI client must support remote MCP, Streamable HTTP and protocol 2025-06-18. Do **not** paste OAuth tokens into OpenShoot, source files or ChatGPT messages. If an integration record is pending, inspect `Setup > Integration > Manage Integrations` and review required AI Connector Service scope and authorised redirect settings.

## 5. Verify session and role (end user)

Ask the connected AI client to list available tool descriptions, identify runtime account and role using permitted tools, and **only read** a test record or approved saved search. Capture: time, role name, environment, available tools, read result ID (non-sensitive) and execution-log reference. If a tool is missing, check role permissions, SuiteApp install, correct endpoint and File Cabinet access. Do not bypass security restrictions.

## 6. Discover customer-specific configuration (NetSuite specialist)

Check OneWorld subsidiary restrictions, multi-currency and accounting books, custom fields and records, saved searches, SuiteApps, SuiteScripts (User Event, Map/Reduce, RESTlets), workflows and approval states. Distinguish discovered from inaccessible objects. Never assume a metadata API shows all customisations.

## 7. Produce the evidence report

Generate a blank report:
```bash
python scripts/admin_readiness.py --account-id 1234567_SB1 --environment sandbox --format markdown --output readiness.md
```

Copy `examples/evidence.example.json` to a private customer-specific evidence file, fill in actual statuses and short evidence references, then run:
```bash
python scripts/admin_readiness.py --account-id 1234567_SB1 --environment sandbox --evidence evidence.private.json --format json --output report.private.json --strict
```

`--strict` exits nonzero on a blocked checklist. Even full evidence returns **EVIDENCE_COMPLETE_UNVERIFIED_EXTERNALLY**: administrators supplied the evidence; OpenShoot has not independently connected to NetSuite. Store private reports securely, never commit them.

## 8. Production change gate

Before any write operations, confirm business approvals, non-privileged role, sandbox test, transaction side effects, integration dependencies, rollback/compensation and post-change review. Any live production claim requires separately verified tenant evidence and a security review.

## Troubleshooting matrix

| Symptom | Verify |
|---|---|
| Client shows disconnected | Correct `/all` or suiteapp namespace, client protocol support, OAuth grant, integration record |
| Connected but no tools | Standard Tools SuiteApp installed, correct role, tool permissions, SuiteApp File Cabinet folder access |
| OAuth fails | Non-Administrator role, OAuth 2.0 Access Tokens rather than legacy permission, redirect and client settings |
| Record access denied | Subsidiary or record permissions, restricted fields, intended role |
| Unexpected record validation | Required fields, custom forms, SuiteScripts, workflows, approval state |
| Results differ from reports | Saved-search context, subsidiary, currency, accounting period and user permissions |

## Official documentation

- [AI Connector FAQ](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/article_4160616848.html)
- [Required features and permissions](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_0714080625.html)
- [Standard Tools installation](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/article_0902023450.html)
- [Available Standard Tools](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/article_0902023508.html)
- [Connecting Claude](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_0714082142.html)
