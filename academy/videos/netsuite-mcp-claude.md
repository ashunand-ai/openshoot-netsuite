# Video production script: Connect Claude to NetSuite without custom middleware

**Format:** 75–90 second narrated screen recording; 16:9 master and 9:16 cutdown.  
**State:** Script ready; footage/rendering not produced.  
**Audience:** NetSuite administrators  
**Source:** https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_0714082142.html

## Editorial guardrails

The exact client UI and endpoint depend on current Oracle documentation and availability; never show tokens. No copyrighted Oracle logo/footage without appropriate permission. Use authorised UI capture or clearly labelled illustrations; never invent transaction balances or depict synthetic data as real.

## Storyboard and voiceover

| Approx. time | Narration | Visual direction |
|---|---|---|
| 0–10s | “You may not need a custom integration to connect Claude to NetSuite.” | Title card: Oracle NetSuite 2026.2; include ‘features vary by account’. |
| 10–25s | “First check your account version, permissions and prerequisites. Do not assume the feature is enabled for every customer.” | On-screen prerequisite checklist; synthetic demo identifiers only. |
| 25–65s | “Confirm the intended NetSuite account, sandbox and release on the NetSuite home screen. Have an administrator verify Server SuiteScript, REST Web Services, OAuth 2.0, and the Standard Tools SuiteApp. Use a non-Administrator role with the precise required permissions; review external AI data handling.” | Sequential overview cards or authorised screen captures; pause briefly at each action. |
| 65–80s | “In the supported Claude connector interface, enter the correct account-specific MCP endpoint and authorise using OAuth 2.0 and PKCE. List available tools and verify the runtime role; test only an approved, non-sensitive read operation. Record evidence and blockers; do not call an offline generated endpoint a live test.” | Verification card with a sample evidence register and a clear ‘stop if blocked’ marker. |
| 80–90s | “Get the free step-by-step guide and validation checklist on GitHub. Complex cases still need expert review.” | GitHub project URL; tag ‘OpenShoot tutorial, independent, not Oracle-endorsed’. |

## Recording checklist

- Confirm current Oracle docs and account release immediately before recording.
- Record exact menu labels from an authorised demo instance; do not improvise unverified UI.
- Replace all account IDs, balances, customers and credentials with synthetic examples.
- Verify captions and spoken instructions match the linked lesson.
- Get a NetSuite functional reviewer to sign off any financial, security or production-impact guidance.
- Publish only after source review and footage QA; then change catalog status from `scripted` to `published`.
