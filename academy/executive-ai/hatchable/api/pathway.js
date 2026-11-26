import {db} from "hatchable";
export const access="user";
export const methods=["GET","POST"];
const roles={
  "ceo": {
    "name": "CEO / Managing Director",
    "cases": [
      {
        "title": "Prioritise AI growth bets",
        "action": "Compare three markets and estimate demand, feasibility and strategic fit",
        "deliverable": "Opportunity scorecard",
        "metric": "quality-adjusted pipeline value"
      },
      {
        "title": "Build a board briefing",
        "action": "Explain risks, investment choices and expected outcomes from source-backed evidence",
        "deliverable": "Board-ready decision memo",
        "metric": "decision cycle time"
      },
      {
        "title": "Map competitor moves",
        "action": "Track public competitor offers and differentiate with citations",
        "deliverable": "Competitive response brief",
        "metric": "time to insight"
      },
      {
        "title": "Draft a 90-day AI strategy",
        "action": "Sequence low-risk pilots with owners, baselines and exit gates",
        "deliverable": "AI initiative roadmap",
        "metric": "validated pilot ROI"
      },
      {
        "title": "Prepare investor Q&A",
        "action": "Draft evidence-linked answers to difficult performance questions",
        "deliverable": "Investor response pack",
        "metric": "response preparation time"
      },
      {
        "title": "Surface strategic customer signals",
        "action": "Review consented customer themes and churn drivers",
        "deliverable": "Strategic customer insight map",
        "metric": "retention improvement"
      },
      {
        "title": "Prioritise capital allocation",
        "action": "Compare business cases under downside scenarios",
        "deliverable": "Capital allocation matrix",
        "metric": "risk-adjusted return"
      },
      {
        "title": "Create an executive weekly brief",
        "action": "Summarise approved KPIs, exceptions and decisions",
        "deliverable": "Weekly executive digest",
        "metric": "brief preparation hours"
      },
      {
        "title": "Review partnership opportunities",
        "action": "Score potential partners using verifiable criteria",
        "deliverable": "Partnership shortlist",
        "metric": "qualification cycle time"
      },
      {
        "title": "Build AI governance agenda",
        "action": "Define human approvals, ownership and incident reporting",
        "deliverable": "Executive oversight charter",
        "metric": "governance exceptions"
      }
    ]
  },
  "coo": {
    "name": "COO / Operations Executive",
    "cases": [
      {
        "title": "Triage operating exceptions",
        "action": "Classify recurring incidents and recommend human-owned next actions",
        "deliverable": "Exception queue",
        "metric": "resolution cycle time"
      },
      {
        "title": "Find process bottlenecks",
        "action": "Map handoffs, waits and rework in a recurring process",
        "deliverable": "Process map",
        "metric": "lead time"
      },
      {
        "title": "Automate SOP drafting",
        "action": "Convert approved procedures into controlled step-by-step instructions",
        "deliverable": "Versioned SOP draft",
        "metric": "rework rate"
      },
      {
        "title": "Improve capacity planning",
        "action": "Compare staffing and demand by period",
        "deliverable": "Capacity plan",
        "metric": "utilisation"
      },
      {
        "title": "Review service-level breaches",
        "action": "Summarise causes and remediation options",
        "deliverable": "SLA action log",
        "metric": "SLA attainment"
      },
      {
        "title": "Spot quality defects",
        "action": "Cluster approved quality incidents into recurring patterns",
        "deliverable": "Quality Pareto",
        "metric": "defect rate"
      },
      {
        "title": "Prepare shift handovers",
        "action": "Summarise open items and owners from approved logs",
        "deliverable": "Handover brief",
        "metric": "handover errors"
      },
      {
        "title": "Improve scheduling",
        "action": "Forecast task volume and surface schedule conflicts",
        "deliverable": "Scheduling recommendation",
        "metric": "on-time delivery"
      },
      {
        "title": "Build operational risk register",
        "action": "Extract control failures from incident logs",
        "deliverable": "Operations risk register",
        "metric": "high-severity incidents"
      },
      {
        "title": "Draft operational business reviews",
        "action": "Explain verified KPIs and corrective actions",
        "deliverable": "Monthly ops review",
        "metric": "review preparation time"
      }
    ]
  },
  "cfo": {
    "name": "CFO / Finance Director",
    "cases": [
      {
        "title": "Forecast weekly cash flow",
        "action": "Summarise collections, payables and cash assumptions",
        "deliverable": "13-week cash forecast draft",
        "metric": "forecast variance"
      },
      {
        "title": "Investigate budget variances",
        "action": "Rank cost-centre movements and request explanations",
        "deliverable": "Variance analysis pack",
        "metric": "close-to-explain time"
      },
      {
        "title": "Accelerate invoice coding review",
        "action": "Categorise invoices for human approval with exceptions",
        "deliverable": "Coding recommendation queue",
        "metric": "manual coding time"
      },
      {
        "title": "Identify working capital levers",
        "action": "Compare receivables ageing and inventory exposure",
        "deliverable": "Working capital heatmap",
        "metric": "days sales outstanding"
      },
      {
        "title": "Prepare board financial commentary",
        "action": "Convert reviewed figures to narrative with source links",
        "deliverable": "CFO commentary draft",
        "metric": "hours per board pack"
      },
      {
        "title": "Flag unusual journal patterns",
        "action": "Find outliers for accountant review without auto-posting",
        "deliverable": "Journal exception report",
        "metric": "false-positive rate"
      },
      {
        "title": "Model pricing sensitivity",
        "action": "Compare margin effects of scenario assumptions",
        "deliverable": "Pricing sensitivity table",
        "metric": "contribution margin"
      },
      {
        "title": "Review supplier spend",
        "action": "Normalise vendor categories and identify duplication",
        "deliverable": "Spend opportunity register",
        "metric": "addressable spend"
      },
      {
        "title": "Prepare audit evidence requests",
        "action": "Organise control documents and status for the audit owner",
        "deliverable": "Audit request tracker",
        "metric": "audit retrieval time"
      },
      {
        "title": "Quantify AI business cases",
        "action": "Calculate conservative benefits, costs and guardrails",
        "deliverable": "Benefit realisation model",
        "metric": "net benefit after review"
      }
    ]
  },
  "cio": {
    "name": "CIO / IT Director",
    "cases": [
      {
        "title": "Map applications and data flows",
        "action": "Summarise approved system inventory and dependencies",
        "deliverable": "Architecture context map",
        "metric": "inventory coverage"
      },
      {
        "title": "Review AI vendor security posture",
        "action": "Compare vendor documentation against internal requirements",
        "deliverable": "Vendor risk assessment",
        "metric": "security review cycle time"
      },
      {
        "title": "Prioritise integration opportunities",
        "action": "Rank API-ready workflows by effort and permissions",
        "deliverable": "Integration backlog",
        "metric": "time to integrate"
      },
      {
        "title": "Build access-review evidence",
        "action": "Identify stale roles from authorised exports",
        "deliverable": "Access attestation register",
        "metric": "excess privileged access"
      },
      {
        "title": "Plan data quality remediation",
        "action": "Profile approved data-quality metrics and ownership",
        "deliverable": "Data-quality backlog",
        "metric": "critical data defect rate"
      },
      {
        "title": "Prepare incident response summaries",
        "action": "Summarise incident timelines and learnings",
        "deliverable": "Post-incident report",
        "metric": "mean time to resolve"
      },
      {
        "title": "Evaluate cloud cost optimisation",
        "action": "Segment cloud usage and anomaly drivers",
        "deliverable": "Cloud spend action list",
        "metric": "unit infrastructure cost"
      },
      {
        "title": "Review AI architecture patterns",
        "action": "Compare retrieval, workflow and agent options",
        "deliverable": "Reference architecture memo",
        "metric": "design lead time"
      },
      {
        "title": "Create technology roadmap",
        "action": "Connect business objectives to system capabilities",
        "deliverable": "Capability roadmap",
        "metric": "dependency burn-down"
      },
      {
        "title": "Assess data retention controls",
        "action": "Compare policy with approved system configuration",
        "deliverable": "Retention exception register",
        "metric": "control exceptions"
      }
    ]
  },
  "cto": {
    "name": "CTO / Engineering",
    "cases": [
      {
        "title": "Review engineering backlog",
        "action": "Cluster product engineering issues by root cause",
        "deliverable": "Engineering triage brief",
        "metric": "lead time to resolution"
      },
      {
        "title": "Draft technical specifications",
        "action": "Convert reviewed requirements into acceptance criteria",
        "deliverable": "Technical design draft",
        "metric": "specification cycle time"
      },
      {
        "title": "Analyse build failures",
        "action": "Summarise approved CI logs for debugging",
        "deliverable": "Build issue diagnostic",
        "metric": "mean time to repair"
      },
      {
        "title": "Identify test gaps",
        "action": "Compare feature requirements with test coverage",
        "deliverable": "Testing gap report",
        "metric": "escaped defect rate"
      },
      {
        "title": "Generate API examples",
        "action": "Produce synthetic request-response samples from documentation",
        "deliverable": "API usage examples",
        "metric": "developer onboarding time"
      },
      {
        "title": "Review security vulnerabilities",
        "action": "Prioritise scanner findings for engineers",
        "deliverable": "Remediation backlog",
        "metric": "vulnerability age"
      },
      {
        "title": "Build release notes",
        "action": "Translate merged changes into clear release summaries",
        "deliverable": "Release note draft",
        "metric": "release preparation time"
      },
      {
        "title": "Improve developer onboarding",
        "action": "Build a source-linked engineering knowledge guide",
        "deliverable": "Developer quickstart",
        "metric": "time to first contribution"
      },
      {
        "title": "Compare architecture options",
        "action": "Evaluate cost, maintainability and failure modes",
        "deliverable": "Architecture decision record",
        "metric": "cost per transaction"
      },
      {
        "title": "Prepare production rollback runbook",
        "action": "Draft rollback and verification steps from approved deployment plan",
        "deliverable": "Rollback checklist",
        "metric": "recovery time"
      }
    ]
  },
  "chro": {
    "name": "CHRO / HR Director",
    "cases": [
      {
        "title": "Draft job descriptions",
        "action": "Convert verified role requirements into inclusive hiring drafts",
        "deliverable": "Job description pack",
        "metric": "drafting hours"
      },
      {
        "title": "Summarise employee feedback",
        "action": "Aggregate consented themes without exposing identities",
        "deliverable": "Engagement trend report",
        "metric": "participation quality"
      },
      {
        "title": "Prepare learning-needs analysis",
        "action": "Map skills to role-specific learning gaps",
        "deliverable": "Skills gap matrix",
        "metric": "training completion"
      },
      {
        "title": "Create onboarding pathways",
        "action": "Personalise non-sensitive first-month induction tasks",
        "deliverable": "Onboarding checklist",
        "metric": "time to productivity"
      },
      {
        "title": "Draft policy FAQs",
        "action": "Answer from approved policies with citations",
        "deliverable": "Policy FAQ library",
        "metric": "HR response time"
      },
      {
        "title": "Identify attrition risk factors",
        "action": "Analyse aggregate trends without individual automated decisions",
        "deliverable": "Retention initiative brief",
        "metric": "retention rate"
      },
      {
        "title": "Create performance conversation guides",
        "action": "Draft coaching questions for manager review",
        "deliverable": "Coaching conversation guide",
        "metric": "manager preparation time"
      },
      {
        "title": "Review workforce planning assumptions",
        "action": "Model capacity and skill requirements",
        "deliverable": "Workforce plan",
        "metric": "vacancy duration"
      },
      {
        "title": "Audit training compliance",
        "action": "Summarise mandatory learning gaps by department",
        "deliverable": "Compliance learning dashboard",
        "metric": "completion percentage"
      },
      {
        "title": "Build change-management plan",
        "action": "Create communication and training rollout steps",
        "deliverable": "Change adoption plan",
        "metric": "employee adoption"
      }
    ]
  },
  "cmo": {
    "name": "CMO / Marketing Director",
    "cases": [
      {
        "title": "Build campaign briefs",
        "action": "Turn verified market insights into creative directions",
        "deliverable": "Campaign concept brief",
        "metric": "creative cycle time"
      },
      {
        "title": "Segment customer needs",
        "action": "Cluster anonymised customer pain points by audience",
        "deliverable": "Audience hypothesis map",
        "metric": "segment engagement"
      },
      {
        "title": "Draft content calendars",
        "action": "Create channel-specific themes with approvals",
        "deliverable": "Content calendar",
        "metric": "content throughput"
      },
      {
        "title": "Review campaign attribution",
        "action": "Compare reporting assumptions across channels",
        "deliverable": "Attribution reconciliation",
        "metric": "qualified leads"
      },
      {
        "title": "Produce product messaging variants",
        "action": "Draft evidence-backed value propositions",
        "deliverable": "Messaging matrix",
        "metric": "conversion rate"
      },
      {
        "title": "Analyse feedback themes",
        "action": "Extract recurring customer objections",
        "deliverable": "Voice-of-customer insight pack",
        "metric": "message relevance"
      },
      {
        "title": "Prepare competitive positioning",
        "action": "Compare factual claims from public sources",
        "deliverable": "Competitive positioning memo",
        "metric": "share of voice"
      },
      {
        "title": "Create SEO topic clusters",
        "action": "Connect user intent with educational content",
        "deliverable": "SEO roadmap",
        "metric": "non-branded search traffic"
      },
      {
        "title": "Plan experimentation",
        "action": "Prioritise A/B tests with success and guardrail metrics",
        "deliverable": "Experiment backlog",
        "metric": "incremental lift"
      },
      {
        "title": "Repurpose approved webinars",
        "action": "Turn authorised recordings into channel snippets",
        "deliverable": "Approved distribution pack",
        "metric": "time per asset"
      }
    ]
  },
  "cro": {
    "name": "CRO / Sales Director",
    "cases": [
      {
        "title": "Qualify inbound opportunities",
        "action": "Extract requirements from consented lead enquiries",
        "deliverable": "Lead discovery summary",
        "metric": "qualified opportunity rate"
      },
      {
        "title": "Draft account plans",
        "action": "Summarise approved CRM history and growth whitespace",
        "deliverable": "Account plan",
        "metric": "pipeline coverage"
      },
      {
        "title": "Prepare meeting research",
        "action": "Compile source-linked account briefs",
        "deliverable": "Pre-call briefing",
        "metric": "research time"
      },
      {
        "title": "Create proposal first drafts",
        "action": "Map requirements to reviewed service catalogues",
        "deliverable": "Proposal draft",
        "metric": "proposal turnaround"
      },
      {
        "title": "Improve forecast hygiene",
        "action": "Identify missing CRM fields and inconsistent dates",
        "deliverable": "Pipeline hygiene register",
        "metric": "forecast accuracy"
      },
      {
        "title": "Analyse deal objections",
        "action": "Cluster sales-loss reasons from CRM notes",
        "deliverable": "Objection handling brief",
        "metric": "win rate"
      },
      {
        "title": "Prioritise expansion accounts",
        "action": "Identify adoption and renewal signals",
        "deliverable": "Expansion opportunity queue",
        "metric": "net revenue retention"
      },
      {
        "title": "Build playbook FAQs",
        "action": "Convert approved winning cases into sales coaching",
        "deliverable": "Sales enablement module",
        "metric": "ramp time"
      },
      {
        "title": "Review pricing exceptions",
        "action": "Flag discount outliers for authorised review",
        "deliverable": "Discount exception register",
        "metric": "discount leakage"
      },
      {
        "title": "Prepare renewal outreach",
        "action": "Draft account-specific value review from verified results",
        "deliverable": "Renewal talking points",
        "metric": "renewal rate"
      }
    ]
  },
  "cco": {
    "name": "Customer Success / Service Leader",
    "cases": [
      {
        "title": "Triage support tickets",
        "action": "Classify incoming cases and suggest reviewed next actions",
        "deliverable": "Case triage queue",
        "metric": "first response time"
      },
      {
        "title": "Summarise customer health",
        "action": "Aggregate adoption and service trends by account",
        "deliverable": "Account health summary",
        "metric": "retention rate"
      },
      {
        "title": "Draft knowledge articles",
        "action": "Convert resolved cases into verified self-help instructions",
        "deliverable": "Knowledge article draft",
        "metric": "self-service resolution"
      },
      {
        "title": "Improve onboarding messages",
        "action": "Tailor approved milestone communications",
        "deliverable": "Onboarding sequence",
        "metric": "time to value"
      },
      {
        "title": "Identify churn themes",
        "action": "Cluster consented complaint and cancellation themes",
        "deliverable": "Churn drivers report",
        "metric": "avoidable churn"
      },
      {
        "title": "Prepare service recovery briefs",
        "action": "Summarise incidents and suitable remedy options",
        "deliverable": "Recovery action brief",
        "metric": "resolution time"
      },
      {
        "title": "Detect recurring product friction",
        "action": "Connect ticket themes to product feedback",
        "deliverable": "Product friction backlog",
        "metric": "repeat tickets"
      },
      {
        "title": "Create customer QBRs",
        "action": "Summarise approved outcomes and open commitments",
        "deliverable": "Quarterly business review",
        "metric": "QBR preparation time"
      },
      {
        "title": "Compare SLA performance",
        "action": "Produce service-level exception dashboard",
        "deliverable": "SLA review",
        "metric": "SLA adherence"
      },
      {
        "title": "Recommend help-centre improvements",
        "action": "Analyse unsuccessful searches and content gaps",
        "deliverable": "Help content backlog",
        "metric": "deflection rate"
      }
    ]
  },
  "gm": {
    "name": "General Manager / Business Unit",
    "cases": [
      {
        "title": "Prepare business-unit scorecards",
        "action": "Summarise operational and commercial metrics",
        "deliverable": "Business unit scorecard",
        "metric": "KPI reporting effort"
      },
      {
        "title": "Reduce administrative workload",
        "action": "Map recurring team requests and standardise drafts",
        "deliverable": "Admin improvement backlog",
        "metric": "admin hours"
      },
      {
        "title": "Prioritise customer issues",
        "action": "Rank service escalations by impact",
        "deliverable": "Escalation action plan",
        "metric": "time to closure"
      },
      {
        "title": "Review local performance",
        "action": "Compare regional operational outcomes",
        "deliverable": "Regional improvement brief",
        "metric": "variance to target"
      },
      {
        "title": "Draft weekly team briefings",
        "action": "Translate approved results into team actions",
        "deliverable": "Team meeting pack",
        "metric": "meeting preparation time"
      },
      {
        "title": "Improve workforce allocation",
        "action": "Match demand patterns to capability pools",
        "deliverable": "Staffing recommendation",
        "metric": "overtime spend"
      },
      {
        "title": "Find service quality themes",
        "action": "Cluster repeat incidents and potential root causes",
        "deliverable": "Quality action register",
        "metric": "complaint rate"
      },
      {
        "title": "Build local market plan",
        "action": "Combine verified demand and competitor observations",
        "deliverable": "Local market action plan",
        "metric": "new customer conversion"
      },
      {
        "title": "Track business initiatives",
        "action": "Summarise milestones, blockers and owners",
        "deliverable": "Initiative delivery dashboard",
        "metric": "milestone hit rate"
      },
      {
        "title": "Create improvement experiment",
        "action": "Define baseline and a short controlled test",
        "deliverable": "Process improvement experiment",
        "metric": "verified hours saved"
      }
    ]
  },
  "procurement": {
    "name": "Supply Chain / Procurement Leader",
    "cases": [
      {
        "title": "Normalise supplier catalogues",
        "action": "Compare approved supplier item descriptions",
        "deliverable": "Supplier item crosswalk",
        "metric": "catalogue accuracy"
      },
      {
        "title": "Detect duplicate spend",
        "action": "Find vendor consolidation candidates for review",
        "deliverable": "Spend consolidation list",
        "metric": "addressable savings"
      },
      {
        "title": "Review contract renewals",
        "action": "Extract dates and obligations for legal review",
        "deliverable": "Renewal calendar",
        "metric": "missed renewals"
      },
      {
        "title": "Assess supplier risk",
        "action": "Summarise approved supplier risk documents",
        "deliverable": "Supplier risk brief",
        "metric": "high-risk suppliers"
      },
      {
        "title": "Draft purchase specifications",
        "action": "Turn requirements into clear non-biased specs",
        "deliverable": "Procurement specification",
        "metric": "request rework"
      },
      {
        "title": "Analyse demand variability",
        "action": "Identify seasonal signals by product group",
        "deliverable": "Demand planning review",
        "metric": "forecast error"
      },
      {
        "title": "Review inventory excess",
        "action": "Flag slow-moving items for planners",
        "deliverable": "Stock exposure report",
        "metric": "working capital tied up"
      },
      {
        "title": "Prepare RFQ comparisons",
        "action": "Compare submitted offers against explicit criteria",
        "deliverable": "Bid comparison matrix",
        "metric": "evaluation hours"
      },
      {
        "title": "Identify delivery exceptions",
        "action": "Cluster supplier delays and causes",
        "deliverable": "Vendor performance review",
        "metric": "on-time supply"
      },
      {
        "title": "Draft supplier meeting agenda",
        "action": "Summarise scorecard trends and corrective actions",
        "deliverable": "Supplier QBR agenda",
        "metric": "supplier defects"
      }
    ]
  },
  "legal": {
    "name": "Legal / Risk / Compliance",
    "cases": [
      {
        "title": "Summarise contract obligations",
        "action": "Extract obligations for qualified legal review",
        "deliverable": "Obligations tracker",
        "metric": "review hours"
      },
      {
        "title": "Identify policy inconsistencies",
        "action": "Compare internal policies against approved standards",
        "deliverable": "Policy exception list",
        "metric": "policy variance"
      },
      {
        "title": "Draft NDA intake checklists",
        "action": "Classify non-sensitive deal requirements",
        "deliverable": "NDA intake notes",
        "metric": "triage time"
      },
      {
        "title": "Review regulatory change summaries",
        "action": "Compile official updates with citations",
        "deliverable": "Regulatory watch briefing",
        "metric": "time to assess changes"
      },
      {
        "title": "Prepare audit document indexes",
        "action": "Organise approved controls evidence",
        "deliverable": "Audit document index",
        "metric": "retrieval effort"
      },
      {
        "title": "Triage legal requests",
        "action": "Classify incoming legal queue by issue type",
        "deliverable": "Legal intake queue",
        "metric": "time to assignment"
      },
      {
        "title": "Prepare litigation holds checklist",
        "action": "Draft preservation steps for counsel review",
        "deliverable": "Hold checklist",
        "metric": "preservation exceptions"
      },
      {
        "title": "Summarise board resolutions",
        "action": "Turn approved minutes into action tracker",
        "deliverable": "Board obligations list",
        "metric": "action closure rate"
      },
      {
        "title": "Review third-party AI contract clauses",
        "action": "Compare security and data clauses with approved standards",
        "deliverable": "Clause comparison report",
        "metric": "review backlog"
      },
      {
        "title": "Prepare incident escalation plan",
        "action": "Draft who-to-notify decision tree for counsel",
        "deliverable": "Incident playbook",
        "metric": "escalation timeliness"
      }
    ]
  },
  "product": {
    "name": "Product / Innovation Leader",
    "cases": [
      {
        "title": "Analyse feature feedback",
        "action": "Cluster consented feedback into product themes",
        "deliverable": "Opportunity insight map",
        "metric": "feedback coverage"
      },
      {
        "title": "Draft discovery interview plans",
        "action": "Create unbiased questions tied to hypotheses",
        "deliverable": "Interview guide",
        "metric": "insights per interview"
      },
      {
        "title": "Prioritise roadmap items",
        "action": "Compare effort, value and risk evidence",
        "deliverable": "Prioritisation matrix",
        "metric": "outcome per sprint"
      },
      {
        "title": "Prepare user stories",
        "action": "Convert requirements to testable acceptance criteria",
        "deliverable": "User story pack",
        "metric": "clarification cycles"
      },
      {
        "title": "Draft product release notes",
        "action": "Explain approved feature changes by audience",
        "deliverable": "Product update",
        "metric": "release communication time"
      },
      {
        "title": "Assess product-market fit signals",
        "action": "Summarise retention and activation cohorts",
        "deliverable": "PMF evidence brief",
        "metric": "activation rate"
      },
      {
        "title": "Build experiment specs",
        "action": "Define control, target and metrics for a new feature",
        "deliverable": "Experiment plan",
        "metric": "validated lift"
      },
      {
        "title": "Map customer journeys",
        "action": "Identify repeated friction points from approved observations",
        "deliverable": "Journey map",
        "metric": "task completion rate"
      },
      {
        "title": "Compare competitor capabilities",
        "action": "Compile public evidence and roadmap implications",
        "deliverable": "Competitor feature review",
        "metric": "research time"
      },
      {
        "title": "Draft feature adoption playbook",
        "action": "Connect release education to guided actions",
        "deliverable": "Adoption plan",
        "metric": "feature adoption rate"
      }
    ]
  }
};
const sectors={
  "financial": {
    "name": "Financial Services",
    "focus": [
      "claims intake",
      "KYC document checks",
      "customer onboarding",
      "loan service requests",
      "portfolio reporting",
      "transaction disputes",
      "risk control attestations",
      "customer complaints",
      "regulatory reporting",
      "fraud alerts"
    ],
    "data": "consented customer cases, reviewed risk policies and anonymised transaction summaries",
    "risk": "regulated decisions, privacy and model explainability"
  },
  "health": {
    "name": "Healthcare & Aged Care",
    "focus": [
      "patient referral coordination",
      "appointment scheduling",
      "care-plan administration",
      "billing exceptions",
      "service demand",
      "clinical documentation workflow",
      "provider credential checks",
      "patient communications",
      "stock replenishment",
      "safety incident reporting"
    ],
    "data": "de-identified service requests, operational rosters and approved care administration policies",
    "risk": "patient safety, confidentiality and clinical oversight"
  },
  "retail": {
    "name": "Retail & eCommerce",
    "focus": [
      "returns processing",
      "product catalogue accuracy",
      "promotion planning",
      "omnichannel enquiries",
      "inventory forecasting",
      "supplier fulfilment",
      "cart abandonment",
      "store staffing",
      "loyalty programme analysis",
      "pricing discrepancies"
    ],
    "data": "approved SKU catalogues, anonymised basket trends and returns metadata",
    "risk": "consumer rights, pricing integrity and customer privacy"
  },
  "manufacturing": {
    "name": "Manufacturing",
    "focus": [
      "production scheduling",
      "quality inspection",
      "maintenance tickets",
      "material shortages",
      "supplier nonconformance",
      "shift handover",
      "factory energy spend",
      "delivery defects",
      "production cost variance",
      "work order backlog"
    ],
    "data": "sample work orders, de-identified inspection logs and maintenance manuals",
    "risk": "physical safety, quality control and operational downtime"
  },
  "professional": {
    "name": "Professional Services",
    "focus": [
      "client proposal development",
      "project staffing",
      "timesheet accuracy",
      "scope creep",
      "knowledge management",
      "client handovers",
      "billing disputes",
      "practice utilisation",
      "client research",
      "contract renewals"
    ],
    "data": "sanitised client briefs, reviewed knowledge articles and engagement budgets",
    "risk": "client confidentiality, professional duties and misleading conclusions"
  },
  "education": {
    "name": "Education & Training",
    "focus": [
      "learner enrolment",
      "course completion",
      "lesson preparation",
      "student support requests",
      "assessment feedback",
      "tutor scheduling",
      "learning accessibility",
      "safeguarding escalations",
      "parent communications",
      "curriculum changes"
    ],
    "data": "synthetic enrolment records, curriculum objectives and approved accessibility policies",
    "risk": "child safeguarding, learner privacy and educational fairness"
  },
  "government": {
    "name": "Government & Public Sector",
    "focus": [
      "citizen service requests",
      "grant applications",
      "procurement transparency",
      "public records search",
      "service eligibility queries",
      "policy consultations",
      "project reporting",
      "FOI triage",
      "regulatory compliance",
      "public communication"
    ],
    "data": "public policy sources, anonymised service logs and approved records standards",
    "risk": "public accountability, accessibility and statutory obligations"
  },
  "logistics": {
    "name": "Logistics & Transport",
    "focus": [
      "shipment exceptions",
      "delivery route planning",
      "carrier performance",
      "warehouse slotting",
      "freight billing disputes",
      "driver scheduling",
      "customs documentation",
      "inventory movement",
      "transport safety",
      "customer ETA updates"
    ],
    "data": "sample shipment events, route schedules and permitted carrier scorecards",
    "risk": "transport safety and commercial confidentiality"
  },
  "construction": {
    "name": "Construction & Property",
    "focus": [
      "site safety reports",
      "project variation requests",
      "subcontractor coordination",
      "procurement shortages",
      "defect inspections",
      "workforce rostering",
      "project cost-to-complete",
      "contractor qualification",
      "handover packs",
      "property service enquiries"
    ],
    "data": "synthetic site logs, approved plans and anonymised contractor performance",
    "risk": "workplace safety and contractual approvals"
  },
  "hospitality": {
    "name": "Hospitality & Tourism",
    "focus": [
      "guest reservations",
      "venue staffing",
      "booking changes",
      "guest feedback",
      "supplier deliveries",
      "menu demand",
      "service recovery",
      "housekeeping quality",
      "event planning",
      "food safety reports"
    ],
    "data": "anonymised reservation demand, approved guest-service guidance and rostering",
    "risk": "guest privacy, workforce safety and food regulations"
  },
  "nonprofit": {
    "name": "Nonprofit & Community Services",
    "focus": [
      "donor communications",
      "volunteer onboarding",
      "programme impact",
      "grant reporting",
      "case referrals",
      "service scheduling",
      "fundraising outreach",
      "stakeholder surveys",
      "privacy incident response",
      "resource allocation"
    ],
    "data": "de-identified programme outcomes, grant conditions and consented outreach records",
    "risk": "beneficiary privacy, safeguarding and donor transparency"
  },
  "technology": {
    "name": "Technology & SaaS",
    "focus": [
      "customer onboarding",
      "product telemetry",
      "support escalations",
      "release planning",
      "developer knowledge search",
      "cloud billing anomalies",
      "contract renewals",
      "customer feature requests",
      "security alerts",
      "usage-based revenue"
    ],
    "data": "sanitised telemetry, approved tickets and product documentation",
    "risk": "customer confidentiality, security and false technical findings"
  }
};
const questions=[
  {
    "id": "literacy",
    "label": "AI fundamentals",
    "prompt": "Can you explain what generative AI can and cannot reliably do?"
  },
  {
    "id": "prompting",
    "label": "Task design",
    "prompt": "Can you give an AI system clear instructions, constraints and output criteria?"
  },
  {
    "id": "verification",
    "label": "Evidence checking",
    "prompt": "Can you verify AI outputs against trusted sources and recognise hallucinations?"
  },
  {
    "id": "data",
    "label": "Data readiness",
    "prompt": "Can you identify which company information is approved for AI processing?"
  },
  {
    "id": "workflow",
    "label": "Workflow improvement",
    "prompt": "Can you break a repetitive business process into testable steps?"
  },
  {
    "id": "metrics",
    "label": "Value measurement",
    "prompt": "Can you quantify effort saved, quality and adoption against a baseline?"
  },
  {
    "id": "governance",
    "label": "Risk and approvals",
    "prompt": "Can you define human reviews, access rules and escalation points?"
  },
  {
    "id": "delivery",
    "label": "Pilot execution",
    "prompt": "Have you tested a small AI use case and assessed its business outcome?"
  }
];
const levels=["Basic","Beginner","Intermediate","Advanced"];
const resources=[
  {
    "name": "MIT OpenCourseWare — AI and Management",
    "url": "https://ocw.mit.edu/",
    "type": "free access; some reuse CC BY-NC-SA subject to individual licence"
  },
  {
    "name": "MIT Hands-On Deep Learning",
    "url": "https://ocw.mit.edu/courses/15-773-hands-on-deep-learning-spring-2024/",
    "type": "free learning access; check prerequisites and licence"
  },
  {
    "name": "Stanford CS229 Machine Learning",
    "url": "https://cs229.stanford.edu/",
    "type": "public course materials; linking only, not open-licence claim"
  },
  {
    "name": "University of Helsinki — Elements of AI",
    "url": "https://www.elementsofai.com/",
    "type": "free participation, external platform"
  },
  {
    "name": "Google Machine Learning Crash Course",
    "url": "https://developers.google.com/machine-learning/crash-course",
    "type": "free learning access; provider owns content"
  }
];
function safeKey(v,obj){return typeof v==="string"&&Object.hasOwn(obj,v)}
function caseList(industry,role,complete){
 const a=sectors[industry],r=roles[role];return r.cases.map((c,i)=>{
  const stage=i<2?"Basic":i<5?"Beginner":i<8?"Intermediate":"Advanced";
  const ctx=a.focus[i];
  return {id:industry+":"+role+":"+i,number:i+1,stage,title:c.title,scenario:"In "+a.name+", consider the recurring workflow: "+ctx+". As "+r.name+", use AI to "+c.action.charAt(0).toLowerCase()+c.action.slice(1)+".",
   input_data:a.data,steps:[
   "Define a real decision owner, current baseline and the permitted scope for "+ctx+".",
   "Using only synthetic or explicitly approved "+a.data+", "+c.action+". Ask AI to show sources, assumptions, missing data and uncertainties.",
   "Review the proposed result with the accountable "+r.name+" and compare it against current standard practice.",
   "Deliver "+c.deliverable.toLowerCase()+" with a documented review and a clear next action."
   ],deliverable:c.deliverable,kpi:c.metric,risk:a.risk+"; keep a human approval step before consequential changes.",estimated_minutes:stage==="Basic"?15:stage==="Beginner"?25:stage==="Intermediate"?40:60,completed:complete.includes(industry+":"+role+":"+i)};
 });
}
async function state(uid){
 const {rows}=await db.query("SELECT industry_key,role_key,self_level,assessed_level,starting_level,objective,experience_hours,answers,score,assessed_at FROM executive_learning_profiles WHERE user_id=$1",[uid]);
 const p=rows[0]||null;
 const completed=p?(await db.query("SELECT usecase_key FROM executive_usecase_progress WHERE user_id=$1 AND usecase_key LIKE $2",[uid,p.industry_key+":"+p.role_key+":%"])).rows.map(x=>x.usecase_key):[];
 const items=p?caseList(p.industry_key,p.role_key,completed):[];
 if(p){const from=[0,2,5,8][levels.indexOf(p.starting_level)]??0;
  items.forEach((item,i)=>{const start=i<from?0:from;item.unlocked=completed.includes(item.id)||Array.from({length:i-start},(_,j)=>p.industry_key+":"+p.role_key+":"+(start+j)).every(key=>completed.includes(key));});
 }
 return {profile:p,pathway:items,completed:completed.length};
}
export default async function(req,res){
 const uid=req.user.id;
 if(req.method==="GET"){
  const st=await state(uid);
  return res.json({industries:Object.entries(sectors).map(([id,x])=>({id,name:x.name})),roles:Object.entries(roles).map(([id,x])=>({id,name:x.name})),questions,levels,resources,catalogue_combinations:Object.keys(sectors).length*Object.keys(roles).length,catalogue_usecases:Object.keys(sectors).length*Object.keys(roles).length*10,...st});
 }
 const b=req.body||{};
 if(b.type==="assess"){
  if(!safeKey(b.industry,sectors)||!safeKey(b.role,roles))return res.status(400).json({error:"Select a valid industry and role."});
  if(!levels.includes(b.self_level)||!levels.includes(b.start_level||b.self_level))return res.status(400).json({error:"Choose your starting level."});
  const objective=String(b.objective||"").trim();
  if(objective.length<15||objective.length>1000)return res.status(400).json({error:"Describe an objective in 15–1000 characters."});
  if(!b.answers||typeof b.answers!=="object")return res.status(400).json({error:"Complete eight assessment questions."});
  const vals=questions.map(q=>b.answers[q.id]);
  if(vals.some(v=>!Number.isInteger(v)||v<0||v>3))return res.status(400).json({error:"Each assessment answer must be from 0 to 3."});
  const hours=Number(b.experience_hours);
  if(!Number.isInteger(hours)||hours<0||hours>80)return res.status(400).json({error:"Enter weekly learning hours from 0 to 80."});
  const score=Math.round(vals.reduce((a,x)=>a+x,0)/24*100);
  const assessed=levels[score<25?0:score<50?1:score<75?2:3];
  await db.query("INSERT INTO executive_learning_profiles(user_id,industry_key,role_key,self_level,assessed_level,starting_level,objective,experience_hours,answers,score) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9::jsonb,$10) ON CONFLICT(user_id) DO UPDATE SET industry_key=EXCLUDED.industry_key,role_key=EXCLUDED.role_key,self_level=EXCLUDED.self_level,assessed_level=EXCLUDED.assessed_level,starting_level=EXCLUDED.starting_level,objective=EXCLUDED.objective,experience_hours=EXCLUDED.experience_hours,answers=EXCLUDED.answers,score=EXCLUDED.score,assessed_at=now(),updated_at=now()",[uid,b.industry,b.role,b.self_level,assessed,b.start_level||b.self_level,objective,hours,JSON.stringify(b.answers),score]);
  return res.json({ok:true,assessed_level:assessed,starting_level:b.start_level||b.self_level,score});
 }
 if(b.type==="complete"){
  const p=(await db.query("SELECT industry_key,role_key,starting_level FROM executive_learning_profiles WHERE user_id=$1",[uid])).rows[0];
  if(!p)return res.status(409).json({error:"Complete your learning assessment first."});
  const match=/^([a-z]+):([a-z]+):([0-9])$/.exec(String(b.id||""));
  if(!match||match[1]!==p.industry_key||match[2]!==p.role_key||Number(match[3])>9)return res.status(400).json({error:"Invalid use case for your current pathway."});
  const evidence=String(b.evidence_note||"").trim(),metric=String(b.metric_note||"").trim();
  if(evidence.length<30||evidence.length>1800)return res.status(400).json({error:"Describe what you produced and verified (30–1800 characters)."});
  if(metric.length<10||metric.length>350)return res.status(400).json({error:"Record a realistic success measure or baseline (10–350 characters)."});
  if(b.reviewed!==true)return res.status(400).json({error:"Confirm that you reviewed your exercise for accuracy and privacy."});
  const idx=Number(match[3]),from=[0,2,5,8][levels.indexOf(p.starting_level)]??0,start=idx<from?0:from;
  const completed=(await db.query("SELECT usecase_key FROM executive_usecase_progress WHERE user_id=$1 AND usecase_key LIKE $2",[uid,p.industry_key+":"+p.role_key+":%"])).rows.map(x=>x.usecase_key);
  for(let n=start;n<idx;n++){if(!completed.includes(p.industry_key+":"+p.role_key+":"+n))return res.status(409).json({error:"Finish the preceding learning exercise before advancing."});}
  await db.query("INSERT INTO executive_usecase_progress(user_id,usecase_key,evidence_note,metric_note,reviewed_by_student) VALUES($1,$2,$3,$4,true) ON CONFLICT(user_id,usecase_key) DO UPDATE SET evidence_note=EXCLUDED.evidence_note,metric_note=EXCLUDED.metric_note,reviewed_by_student=true,completed_at=now()",[uid,b.id,evidence,metric]);
  return res.json({ok:true});
 }
 return res.status(400).json({error:"Unsupported action"});
}