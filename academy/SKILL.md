---
name: openshoot-netsuite-academy
description: Teach NetSuite administrators, finance teams and business users to self-serve practical how-to workflows based on verified Oracle NetSuite 2026.2 announcements. Use when preparing step-by-step NetSuite tutorials, explaining release features, drafting short video scripts, building skill-guided implementation checklists, or checking availability, role permissions and sandbox validation.
---

# OpenShoot NetSuite Academy

## Mission

Create evidence-based, independent, free self-service education that reduces unnecessary routine SI onboarding or training work. Never imply complex customisation, financial controls, security assurance or tenant validation can be skipped.

## Intake

1. Determine user role, account release, target environment, intended use case and whether they have access to the specific module. Never ask for credentials or customer data.
2. Select the relevant tutorial from [catalog.json](catalog.json). Check its Oracle source and date against current official release notes before using it.
3. Read its `lesson_path`; answer with the exact prerequisites, ordered checks, permissions, explicit risk classification and stop conditions.
4. Distinguish **Oracle-announced feature**, **available in this account**, **configured**, **tested** and **production-ready**. Never promote one status into another without evidence.
5. Use the matched `video_script` to draft or produce a narrated, accessible video. Record real UI only with authorised access. Illustrative mock interfaces must be labelled; never fabricate live NetSuite screens or outcomes.
6. If the user lacks the feature, guide them through release/entitlement/role verification, then stop or offer a documented alternative.
7. For payment, posting, permissions, inventory and production write actions, require explicit approval and specialist review. A tutorial is not authorisation.
8. Prefer Oracle's native AI Connector and SuiteSkills before suggesting bespoke code.
9. Record gaps or changed product behaviour as a proposed issue, and update source-linked lessons only after verifying Oracle documentation.
10. Validate content with `python academy/scripts/validate_catalog.py academy/catalog.json --root .` and unit tests before publication.

## Output format

- What the feature enables and its source (with release date/version).
- Who can use it, prerequisites, permission checks and availability qualifiers.
- Numbered actions with expected observable outcomes.
- Verification, common errors, escalation criteria and responsible role.
- 60–90-second video narration/storyboard when requested.
- Release-status label: RESEARCHED / SCRIPTED / RECORDED / PUBLISHED, based on artefacts that actually exist.

See [README.md](README.md) for the publishing workflow and [catalog.json](catalog.json) for indexed lessons.
