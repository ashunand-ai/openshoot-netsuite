# Run NetSuite saved searches with the new REST Web Services support

**Audience:** NetSuite analysts and developers  
**Oracle release:** 2026.2 September  
**Status:** Scripted tutorial; not verified in a live NetSuite tenant  
**Risk classification:** read-only

## Why this matters

NetSuite now lets you retrieve and execute saved searches through REST Web Services. This walkthrough uses Oracle's published capability and focuses on reducing repetitive professional-services setup or training work. It does not replace complex design, security or audit assurance.

## Before you begin

Confirm REST Web Services permission, approved OAuth client, a permitted saved search and correct account-specific REST URL. Access and UI vary by account and role. Use a sandbox or authorised non-sensitive training data; do not share credentials or customer data.

## Step-by-step administrator/user workflow

1. Use the NetSuite UI to create or identify an existing saved search accessible to the intended role.
2. Verify role permissions and a supported OAuth 2.0 integration; never paste credentials into public tools.
3. Retrieve the permitted list using GET /services/rest/query/v1/savedsearch.
4. Execute an accessible saved search using GET /services/rest/query/v1/savedsearch/{savedSearchId}/result.
5. Check result count, columns, filters, role restrictions and pagination before integrating with dashboards.
6. Save a redacted test transcript without financial data or OAuth tokens.

## What good looks like

Validated REST saved-search list and result retrieval plan. Ask the user to save an evidence reference, timestamp, applicable role and unresolved blocker in a private location.

## Troubleshooting

If menus or tools are unavailable, first check account release, feature entitlement, role access and the latest Oracle instructions. Do not escalate privileges without administrator approval. If the outcome differs from NetSuite, treat NetSuite source records as authoritative and stop before further actions.

## Official Oracle source

https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/article_0804090827.html

## Video companion

[Production script](../videos/saved-search-rest.md). Scripts are not rendered videos and do not imply live tenant validation.
