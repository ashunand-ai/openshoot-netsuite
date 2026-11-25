# OpenShoot NetSuite Academy

**Independent, free NetSuite feature education powered by verified Oracle documentation.**

The academy translates updates into role-aware step-by-step lessons and short-video production scripts. This is **not** a verified live NetSuite tutorial video library yet: the first six lessons and video storyboards are scripted, but screen recordings and rendered videos are not published.

## Start here

- [Connect Claude using Oracle's native MCP](lessons/netsuite-mcp-claude.md)
- [Use Oracle's 48 SuiteSkills](lessons/netsuite-suiteskills.md)
- [Use saved searches through REST Web Services](lessons/saved-search-rest.md)
- [Ask Oracle about a saved search](lessons/ask-oracle-saved-search.md)
- [Analyse item margin with Item Pricing Performance Workbook](lessons/pricing-performance.md)
- [Export a report as XLSX](lessons/xlsx-export.md)

Every lesson has a companion [short video production script](videos/), a source from official NetSuite documentation and an explicit account-availability qualifier.

## For learners

1. Confirm your NetSuite release at the bottom of your Home page.
2. Open a lesson for your role and business goal.
3. Complete the prerequisites and check role-based permissions.
4. Follow the steps using an authorised account or sandbox.
5. Record evidence and stop if any permission or business-data result is inconsistent.

## For content authors

1. Start from a dated, authoritative Oracle release note.
2. Check the announcement is actually applicable to the target account/version.
3. Write a lesson and 75–90 second video script using the same content claims.
4. Set `status: scripted` until rendered footage and QA are complete.
5. Run `python academy/scripts/validate_catalog.py academy/catalog.json --root .` and `python -m unittest discover -s academy/tests -v`.
6. Get a functional reviewer to inspect financial, security or account-specific claims.
7. Publish the video separately, add its real URL and update catalog status to `published` only then.

## Market strategy and editorial pipeline

- [Open-source SI substitution strategy](STRATEGY.md)
- [Ten next release-driven tutorial ideas](BACKLOG.md)

## What we don't promise

- That NetSuite's newest features are available in all customer accounts
- That Oracle's built-in SuiteSkills are developed by OpenShoot
- That written instructions alone certify a production deployment
- That every consultancy or systems integrator can be replaced

## Market gap

SI partners add important value in complex ERP design, integrations, audits and implementations. This project makes **repeatable release-change interpretation, basic training, common configuration checks and process documentation** free and reproducible.

## Source currency

Oracle 2026.2 release notes revision: **November 16, 2026**. Review [Oracle's primary release notes](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/article_72152418635.html) before publishing new content.
