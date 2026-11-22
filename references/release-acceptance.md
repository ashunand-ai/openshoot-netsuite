# Release acceptance and evidence

## What v0.1 can demonstrably do

- Validate account-ID syntax before constructing a URL.
- Convert a NetSuite account ID such as `1234567_SB1` into its account-specific domain label `1234567-sb1`.
- Produce a structured, explicitly **unverified** offline readiness JSON with administrator steps.
- Run self-contained Python unit tests, without NetSuite access or credentials.
- Provide a reusable Agent Skill and manual setup guidance.

## What it cannot do

- Confirm an account exists, authenticate OAuth, or query an MCP endpoint.
- Check whether the customer installed the Standard Tools SuiteApp.
- Verify role permissions, subsidiary restrictions, business records or custom scripts.
- Execute NetSuite writes, integrations or deployments.
- Guarantee cost savings or replace implementation assurance.

## Release gates

1. Verify README and links are present in the public repository.
2. Run `python -m unittest discover -s tests -v` locally and in CI.
3. Run `python scripts/openshoot.py --account-id 1234567_SB1 --environment sandbox` and inspect the result.
4. Confirm `account_domain_id` is `1234567-sb1`, status is `OFFLINE_PREPARATION_ONLY`, and `endpoint_verified` is `false`.
5. Check there are no credentials, customer exports or claim of live integration.
6. Mark live-sandbox end-to-end validation **BLOCKED** until an authorised real tenant is provided.

## Key official sources

- [Oracle account IDs / sandbox domain conversion](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_1498754928.html)
- [Oracle remote MCP endpoint and client setup](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_0714082142.html)
- [Oracle integration prerequisites and permissions](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/article_4160616848.html)

The scripts are deliberately offline. Real NetSuite connectivity requires a supported external AI client, approved OAuth and configured account permissions.
