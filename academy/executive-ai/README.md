# Nand AI Academy — Executive AI Learning (open-source implementation)

**Live learning pathway:** https://brightnest-tutoring.hatchable.site/pathway/

This is the original, source-published implementation of Nand AI Academy's industry- and role-adaptive executive AI learning journey, deployed using Hatchable. It is separate from, but complements, the NetSuite-specific OpenShoot Academy.

## Delivered in Hatchable v11

- Eight-question AI capability assessment: literacy, prompting, verification, data handling, workflows, metrics, governance and delivery
- Self-selected and assessed starting points: **Basic, Beginner, Intermediate and Advanced**
- **12 industries × 13 roles × 10 applied exercises = 1,560 context-specific combinations**
- Four open-enrolment free core courses, each with four original lessons (16 lessons total)
- Exercises with business scenario, approved example data, ordered actions, deliverable, measurable KPI and risk-control review
- Sequential unlocking from the learner's chosen starting stage
- Written completion evidence, baseline/metric note and reviewer acknowledgement
- Authenticated learner-owned assessment and progress, reusing the site's existing invitation-based login
- Links to MIT OpenCourseWare, Stanford CS229, University of Helsinki Elements of AI and Google ML learning

## Public source

- [Backend role/industry case engine and assessment](hatchable/api/pathway.js)
- [Learner experience](hatchable/public/pathway.js)
- [Page markup](hatchable/public/pathway/index.html)
- [Assessment and progress storage](hatchable/migrations/016_executive_pathways.sql)
- [Evidence requirements](hatchable/migrations/017_exec_evidence.sql)
- [Nand AI Academy companion Skill](SKILL.md)
- [University resource and licence notes](RESOURCES.md)

The original Hatchable application's existing CSS, registration, authentication, tutoring and NetSuite courses are *not copied here*. This directory is a reusable, MIT-licensed reference implementation, not a complete standalone deployment. To run it you need a compatible Hatchable app with user auth, database schema and a deployed student page.

## Role coverage

CEO, COO, CFO, CIO, CTO, CHRO/HR, CMO/Marketing, CRO/Sales, Customer Success/Service, General Management, Procurement/Supply Chain, Legal/Risk, Product/Innovation.

## Industry coverage

Financial Services, Healthcare & Aged Care, Retail & eCommerce, Manufacturing, Professional Services, Education & Training, Government & Public Sector, Logistics & Transport, Construction & Property, Hospitality & Tourism, Nonprofit & Community Services, Technology & SaaS.

Each combination yields ten original applied cases drawn from a curated role-specific activity library and a matching sector operational context. These cases are **tailored educational exercises**, not 1,560 independently validated production integrations.

## How to learn

1. Request student access at https://brightnest-tutoring.hatchable.site/register/
2. Sign in to the Academy; invitation-based accounts are managed separately.
3. Visit /pathway/ and complete the baseline assessment.
4. Choose the preferred entry level and follow the recommended ten exercises.
5. For each exercise, use synthetic or explicitly approved business data, save a described deliverable and measurable baseline, and acknowledge human review.
6. Continue studying the four foundational courses in the existing student portal.

## Honest release gates

Backend access and assessment tests, sequential progression and test-user completion evidence have been exercised. **Real email-code/passkey browser sign-in, independent student-to-student isolation testing and visual mobile QA remain required before an enterprise rollout.** Existing separate row-access warnings on legacy profile and tutor tables remain open; they are not certification findings.

### Copyright and attribution

University and commercial provider courses are externally linked, never copied into the site. MIT OCW has licence conditions, including non-commercial restrictions for adaptation. Stanford and Google's publicly readable pages should not be assumed to carry open-source licences. See [RESOURCES.md](RESOURCES.md).

Not affiliated with or endorsed by MIT, Stanford, Google, the University of Helsinki, Oracle or NetSuite. Source in this directory is original and covered by the repository's MIT licence.
