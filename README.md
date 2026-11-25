# OpenShoot NetSuite

**Free, open-source, administrator-guided NetSuite AI Connector readiness toolkit (v0.2).**

> **Release scope:** offline preparation, administrator setup walkthrough and evidence-based readiness auditing. This is **not** a live MCP connector, OAuth integration, or automatic NetSuite deployment. Not affiliated with Oracle, NetSuite or Anthropic.

## What problem does this solve?

Oracle already provides the native **NetSuite AI Connector Service** and MCP Standard Tools SuiteApp. Oracle's 2026.2 documentation also describes a SuiteSkills plug-in with **48 business skills**. OpenShoot does **not** replicate Oracle's tools: it makes the *customer-specific preparation and evidence-gathering process* easier to repeat.

Use OpenShoot to validate an account ID's format, construct a candidate account-specific MCP endpoint (including NetSuite sandbox underscore-to-hyphen conversion), generate a checklist of prerequisites, and document outstanding verification work. This helps administrators avoid paying for reusable boilerplate while recognising that complex implementations still require professional expertise.

## Quick start (Python 3.10+, standard library only)

```bash
git clone https://github.com/ashunand-ai/openshoot-netsuite.git
cd openshoot-netsuite
python scripts/openshoot.py --account-id 1234567_SB1 --environment sandbox --output readiness.json
python -m unittest discover -s tests -v
```

Replace the example account ID with the intended NetSuite account ID. Never publish customer-specific reports, secrets or data. The report's URL is a **template**, not a verified connection. NetSuite account IDs such as `1234567_SB1` map to domain IDs `1234567-sb1`; this is validated in our unit tests.

## Actual functional scope

| Capability | v0.1 |
| --- | --- |
| Validate basic account ID syntax | Implemented offline |
| Generate Standard Tools MCP endpoint template | Implemented offline |
| Produce JSON preparation report and administrator checklist | Implemented offline |
| Run local unit tests | Implemented (and GitHub Actions CI) |
| Reusable AI operating Skill | Included as SKILL.md |
| Authenticate with NetSuite/Claude | **Not implemented** |
| Discover live role permissions or metadata | **Not implemented** |
| Create or alter NetSuite records | **Not implemented** |
| Install SuiteApps or deploy custom tools | **Not implemented** |

## Verification and reproducibility

The GitHub Actions workflow runs the Python unit tests on every push and pull request. A passing offline test is **not** proof of NetSuite connectivity. See [release acceptance](references/release-acceptance.md) for release claims and evidence boundaries.

## Step-by-step administrator workflow and evidence gate

Follow [the detailed system-administrator onboarding guide](references/sysadmin-onboarding.md). It covers features, SuiteApp installation, OAuth/PKCE, role and File Cabinet access, both supported endpoint choices, runtime verification, customisations and troubleshooting. Generate an evidence report from the example fixture:

```bash
python scripts/admin_readiness.py --account-id 1234567_SB1 --environment sandbox --format markdown --output readiness.md
python scripts/admin_readiness.py --account-id 1234567_SB1 --environment sandbox --evidence examples/evidence.example.json --format json --strict
```

The second command intentionally exits **2** while the checklist is incomplete. User-supplied PASS evidence with references yields `EVIDENCE_COMPLETE_UNVERIFIED_EXTERNALLY`, **never** independent certification. No credentials are read or network requests made.

## Guided real-world integration

Follow [the deployment guide](references/deployment.md). Administrators must use Oracle-supported authentication and inspect role-level access in their own environments. Connection, permissions, and any 2026.2 feature availability must be checked against the actual tenant.

## Commercial gap and positioning

Integrators can charge for connection assessments, role reviews and onboarding. OpenShoot targets only the **repeatable preparation** portion with free source, reproducible checks and explicit implementation caveats. No guaranteed savings or claim of production certification.

## Oracle references

- [NetSuite AI Connector Service FAQ](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/article_4160616848.html)
- [NetSuite AI Connector Claude setup](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_0714082142.html)
- [NetSuite AI Agent plug-in documentation](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/article_4123813814.html)
- [Oracle SuiteCloud SDK on GitHub](https://github.com/oracle/netsuite-suitecloud-sdk)

Refer to current Oracle documentation, not assumptions. Client compatibility, tool permissions and availability may change.

## Free NetSuite Academy — feature how-to lessons

The new [OpenShoot NetSuite Academy](academy/README.md) converts verified NetSuite 2026.2 announcements into **six guided lessons**, **six recording-ready short-video scripts** and a separate [teaching Skill](academy/SKILL.md). The curriculum covers native MCP setup, Oracle SuiteSkills, REST saved searches, Ask Oracle, pricing analytics and XLSX exports. Every tutorial has an Oracle source, role and readiness checks, steps, verification and a video storyboard.

**Current status:** Written tutorials and production scripts are committed. No rendered instructional videos or live tenant demonstrations are claimed. The repository's CI now checks academy catalog integrity and unit tests.

## Roadmap

- v0.3: optional authorised read-only MCP capability probe
- v0.4: live permission and metadata evidence report
- v0.5: implementation drift comparison

Contributions: [CONTRIBUTING.md](CONTRIBUTING.md). Security: [SECURITY.md](SECURITY.md). Public announcement: [community/LINKEDIN_POST.md](community/LINKEDIN_POST.md).

**Licence:** [MIT](LICENSE). Oracle and NetSuite are trademarks of their respective owners.
