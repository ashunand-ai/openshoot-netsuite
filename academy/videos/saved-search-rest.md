# Video production script: Run NetSuite saved searches with the new REST Web Services support

**Format:** 75–90 second narrated screen recording; 16:9 master and 9:16 cutdown.  
**State:** Script ready; footage/rendering not produced.  
**Audience:** NetSuite analysts and developers  
**Source:** https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/article_0804090827.html

## Editorial guardrails

Endpoint methods are read-only; results remain role-scoped and must not be treated as financial reconciliation. No copyrighted Oracle logo/footage without appropriate permission. Use authorised UI capture or clearly labelled illustrations; never invent transaction balances or depict synthetic data as real.

## Storyboard and voiceover

| Approx. time | Narration | Visual direction |
|---|---|---|
| 0–10s | “NetSuite now lets you retrieve and execute saved searches through REST Web Services.” | Title card: Oracle NetSuite 2026.2 September; include ‘features vary by account’. |
| 10–25s | “First check your account version, permissions and prerequisites. Do not assume the feature is enabled for every customer.” | On-screen prerequisite checklist; synthetic demo identifiers only. |
| 25–65s | “Use the NetSuite UI to create or identify an existing saved search accessible to the intended role. Verify role permissions and a supported OAuth 2.0 integration; never paste credentials into public tools. Retrieve the permitted list using GET /services/rest/query/v1/savedsearch.” | Sequential overview cards or authorised screen captures; pause briefly at each action. |
| 65–80s | “Execute an accessible saved search using GET /services/rest/query/v1/savedsearch/{savedSearchId}/result. Check result count, columns, filters, role restrictions and pagination before integrating with dashboards. Save a redacted test transcript without financial data or OAuth tokens.” | Verification card with a sample evidence register and a clear ‘stop if blocked’ marker. |
| 80–90s | “Get the free step-by-step guide and validation checklist on GitHub. Complex cases still need expert review.” | GitHub project URL; tag ‘OpenShoot tutorial, independent, not Oracle-endorsed’. |

## Recording checklist

- Confirm current Oracle docs and account release immediately before recording.
- Record exact menu labels from an authorised demo instance; do not improvise unverified UI.
- Replace all account IDs, balances, customers and credentials with synthetic examples.
- Verify captions and spoken instructions match the linked lesson.
- Get a NetSuite functional reviewer to sign off any financial, security or production-impact guidance.
- Publish only after source review and footage QA; then change catalog status from `scripted` to `published`.
