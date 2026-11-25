# Connect Claude to NetSuite without custom middleware

**Audience:** NetSuite administrators  
**Oracle release:** 2026.2  
**Status:** Scripted tutorial; not verified in a live NetSuite tenant  
**Risk classification:** configuration

## Why this matters

You may not need a custom integration to connect Claude to NetSuite. This walkthrough uses Oracle's published capability and focuses on reducing repetitive professional-services setup or training work. It does not replace complex design, security or audit assurance.

## Before you begin

Check installed Standard Tools SuiteApp, OAuth, account release, user role, and approved AI client. Access and UI vary by account and role. Use a sandbox or authorised non-sensitive training data; do not share credentials or customer data.

## Step-by-step administrator/user workflow

1. Confirm the intended NetSuite account, sandbox and release on the NetSuite home screen.
2. Have an administrator verify Server SuiteScript, REST Web Services, OAuth 2.0, and the Standard Tools SuiteApp.
3. Use a non-Administrator role with the precise required permissions; review external AI data handling.
4. In the supported Claude connector interface, enter the correct account-specific MCP endpoint and authorise using OAuth 2.0 and PKCE.
5. List available tools and verify the runtime role; test only an approved, non-sensitive read operation.
6. Record evidence and blockers; do not call an offline generated endpoint a live test.

## What good looks like

Documented native MCP connection plan and read-only verification evidence. Ask the user to save an evidence reference, timestamp, applicable role and unresolved blocker in a private location.

## Troubleshooting

If menus or tools are unavailable, first check account release, feature entitlement, role access and the latest Oracle instructions. Do not escalate privileges without administrator approval. If the outcome differs from NetSuite, treat NetSuite source records as authoritative and stop before further actions.

## Official Oracle source

https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_0714082142.html

## Video companion

[Production script](../videos/netsuite-mcp-claude.md). Scripts are not rendered videos and do not imply live tenant validation.
