# Administrator-assisted deployment checklist

**Not an automated installation or verified live connection.** Consult the latest [Oracle AI Connector FAQ](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/article_4160616848.html) and [Claude connection guide](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_0714082142.html).

1. Identify an authorised account ID, correct environment and account release version. Oracle 2026.2 features might depend on account upgrades.
2. Check Server SuiteScript, REST Web Services and OAuth 2.0 prerequisites, and install/verify the applicable MCP Standard Tools SuiteApp per Oracle instructions.
3. Prepare a least-privilege, non-Administrator role. Review MCP Server Connection, OAuth 2.0 Access Tokens, REST Web Services permissions and required record access as documented by Oracle.
4. Generate an offline preparation JSON with `python scripts/openshoot.py --account-id 1234567_SB1 --environment sandbox --output readiness.json`.
5. Use the official Claude NetSuite AI connector setup; paste the account-specific endpoint and complete OAuth in the approved client. The interface and endpoint structure may change; verify the current Oracle guide.
6. Inspect visible MCP tools and runtime role/account context. Do not infer privileges solely from the generated URL or successful sign-in.
7. Run approved read-only checks (for example non-sensitive test customer lookup), collect evidence and note failures.
8. Check custom records, custom fields, subsidiaries, scripts, workflows, financial periods and business impacts where accessible.
9. Obtain explicit approval for any write test, elevated privilege, custom-tool deployment or production change.

## Native MCP endpoint template

`https://<accountid>.suitetalk.api.netsuite.com/services/mcp/v1/suiteapp/com.netsuite.mcpstandardtools`

## NetSuite 2026.2 differentiation

Oracle's SuiteSkills business skills and native MCP standard tools are Oracle capabilities. OpenShoot focuses on preparation and evidence, not competing tool implementations.

## Verification evidence

Record account/environment, role, observed tools, operation result, time, approval record, errors, and unresolved gaps. Never include access tokens or sensitive customer records in public artefacts.
