import {db} from "hatchable";
export const access = "user";
export const methods = ["GET","POST"];
const industries={
"Financial services":{workflow:"customer onboarding, document review and compliance triage",metric:"review time per case",risk:"privacy, model explainability and regulated decisions"},
"Healthcare":{workflow:"appointment administration and clinical documentation support",metric:"administrative minutes saved",risk:"patient privacy and clinical oversight"},
"Retail & eCommerce":{workflow:"product catalog enrichment, stock queries and customer support",metric:"resolution time and conversion",risk:"pricing accuracy and customer data"},
"Manufacturing":{workflow:"quality exception analysis and maintenance knowledge search",metric:"unplanned downtime and defect rate",risk:"operational safety and process validation"},
"Professional services":{workflow:"proposal drafting, research retrieval and client knowledge management",metric:"hours per deliverable and rework",risk:"client confidentiality and factual accuracy"},
"Education":{workflow:"lesson planning, learning support and administrative triage",metric:"staff time saved and learner outcomes",risk:"student data and safeguarding"},
"Government & public sector":{workflow:"policy knowledge search and citizen service triage",metric:"case turnaround and accuracy",risk:"public accountability and records retention"},
"Logistics":{workflow:"shipment exception handling and dispatch knowledge retrieval",metric:"on-time delivery and exception handling time",risk:"commercial confidentiality and human control"},
"Other":{workflow:"repeatable knowledge-work tasks and service enquiries",metric:"cycle time and quality",risk:"privacy, accuracy and human oversight"}
};
const roles={
"CEO / Managing Director":"enterprise strategy, competitive advantage and capital allocation",
"COO / Operations":"workflow throughput, reliability and service levels",
"CFO / Finance":"financial control, cost-to-serve and measurable return",
"CTO / CIO / Technology":"systems integration, data architecture and security",
"CMO / Sales / Growth":"customer acquisition, personalization and conversion",
"CHRO / People":"workforce skills, change management and employee experience",
"Director / General Manager":"business-unit outcomes, execution and adoption",
"Other executive":"cross-functional business outcomes and governance"
};
const topics=[
{key:"opportunity",title:"Find your first high-value AI opportunity",mins:9,summary:"Separate impressive demos from economically meaningful problems. Select one repetitive workflow with clear demand, known baseline and a human owner.",task:"List three activities. Rank each by volume, time spent, error cost and data sensitivity. Choose the safest high-return candidate.",metric:"hours per task × monthly volume × realistic improvement"},
{key:"prompting",title:"Turn a workflow into a reliable AI task",mins:8,summary:"A useful prompt defines role, context, source material, constraints, output format and a review gate. Treat AI output as a draft unless validated.",task:"Write an input-output contract for a selected workflow and identify who verifies the result.",metric:"first-pass acceptance rate"},
{key:"data",title:"Assess your data and knowledge readiness",mins:10,summary:"AI quality depends on accessible, current, permissioned business information. Establish sources of truth, ownership and boundaries.",task:"Inventory three information sources and identify one access or data quality gap.",metric:"share of responses grounded in approved sources"},
{key:"risk",title:"Establish responsible AI guardrails",mins:10,summary:"Make data classification, procurement approval, human oversight and incident escalation part of the workflow, not an afterthought.",task:"Write one-page rules for permitted tools, prohibited data, reviewers and escalation.",metric:"policy adherence and exception rate"},
{key:"pilot",title:"Design a controlled 30-day pilot",mins:12,summary:"Test with a narrow use case, a baseline, a control group where feasible, and predefined stop/go criteria before scaling.",task:"Define pilot owner, 20 representative cases, baseline, target, review cadence and exit criteria.",metric:"validated net time saving and quality"},
{key:"adoption",title:"Move from trial to measurable adoption",mins:9,summary:"Deliver training around the real task, gather feedback, track use and revise operating procedures.",task:"Create a 4-week adoption plan with an executive sponsor, frontline champion and weekly outcome review.",metric:"active eligible users and task completion"},
{key:"integration",title:"Connect AI safely to core systems",mins:11,summary:"Prioritise read-only connections, scoped access and auditability before giving an AI system permission to take actions.",task:"Map a system flow: trigger, approved data, model step, reviewer, final action, audit trail.",metric:"end-to-end completion rate and incidents"},
{key:"portfolio",title:"Build an AI investment portfolio",mins:12,summary:"Allocate effort across quick wins, capability building and strategic bets. Compare value, feasibility, exposure and change effort.",task:"Score five candidate projects on value, time-to-value, risk and dependencies; select a sequenced roadmap.",metric:"risk-adjusted benefit per quarter"},
{key:"leadership",title:"Lead AI transformation with evidence",mins:10,summary:"Define operating model, ownership, governance and board reporting. Use business-outcome metrics, not model usage alone.",task:"Create an executive scorecard for value realised, risk events, adoption and capability growth.",metric:"realised ROI and risk-adjusted adoption"}
];
const paths={1:["opportunity","prompting","data","risk","pilot"],2:["opportunity","risk","pilot","adoption","data"],3:["pilot","adoption","integration","portfolio","risk"],4:["integration","portfolio","leadership","adoption","risk"],5:["leadership","portfolio","integration","risk","adoption"]};
const labels=["","Awareness","Exploring","Applying","Scaling","Leading"];
function plan(row,done){
const i=industries[row.industry]||industries.Other,r=roles[row.exec_role]||roles["Other executive"];
const cap=row.capability||{},gap={opportunity:"use_cases",prompting:"literacy",data:"data",risk:"governance",pilot:"delivery",adoption:"delivery",integration:"data",portfolio:"strategy",leadership:"strategy"};
const keys=[...(paths[row.level]||paths[1])].sort((a,b)=>(Number(cap[gap[a]]??2)-Number(cap[gap[b]]??2)));
const contextual={
opportunity:"Map the three most repetitive points in "+i.workflow+" and select the one with the clearest baseline.",
prompting:"Create a source-grounded AI draft for a low-risk step in "+i.workflow+"; have a qualified employee verify every output.",
data:"Identify the systems and permissioned records needed for "+i.workflow+"; document missing or stale information.",
risk:"Write escalation and human-approval rules for "+i.workflow+"; specifically manage "+i.risk+".",
pilot:"Run 20 representative examples from "+i.workflow+" through an approved pilot and compare with today's manual process.",
adoption:"Train the team responsible for "+i.workflow+"; observe how work is actually done before and after the change.",
integration:"Design a read-only integration for the data supporting "+i.workflow+" before proposing automated write actions.",
portfolio:"Compare investments in "+i.workflow+" against two other candidate AI opportunities using value, feasibility and risk.",
leadership:"Develop a board-ready operating scorecard for "+i.workflow+", including benefits, safeguards and ownership."
};
return keys.map((key,n)=>{const m=topics.find(x=>x.key===key);return {...m,key,rank:n+1,completed:done.includes(key),
industry_example:contextual[key],executive_lens:"As "+row.exec_role+", evaluate this through "+r+".",
task:"Your stated priority: "+row.objective+". "+contextual[key]+" Then: "+m.task,
measure:"For "+row.industry+", track "+i.metric+"; also monitor "+m.metric+".",
risk:"Critical control for this use case: "+i.risk+".",
capability_gap:gap[key],gap_score:Number(cap[gap[key]]??0)}})
}
export default async function(req,res){
const uid=req.user.id;
if(req.method==="POST"){
const b=req.body||{};
if(b.type==="complete"){const key=String(b.key||"");if(!topics.some(t=>t.key===key))return res.status(400).json({error:"Invalid module"});const a=await db.query("SELECT industry,exec_role,objective,level FROM ai_assessments WHERE user_id=$1 ORDER BY created_at DESC LIMIT 1",[uid]);if(!a.rows.length||!paths[a.rows[0].level].includes(key))return res.status(403).json({error:"Not in your current pathway"});await db.query("INSERT INTO ai_module_progress(user_id,module_key) VALUES($1,$2) ON CONFLICT DO NOTHING",[uid,key]);return res.json({ok:true})}
if(b.type!=="assess")return res.status(400).json({error:"Invalid action"});
const industry=String(b.industry||""),exec_role=String(b.exec_role||""),objective=String(b.objective||"").trim().slice(0,250);
if(!Object.hasOwn(industries,industry)||!Object.hasOwn(roles,exec_role)||objective.length<5)return res.status(400).json({error:"Complete your executive profile"});
const dimensions=["strategy","literacy","data","use_cases","governance","delivery"];const cap={};for(const k of dimensions){const n=Number(b.capability?.[k]);if(!Number.isInteger(n)||n<0||n>4)return res.status(400).json({error:"Please complete all six capability questions"});cap[k]=n}
const score=Math.round(dimensions.reduce((s,k)=>s+cap[k],0)/24*100);const level=score<20?1:score<40?2:score<60?3:score<80?4:5;
await db.query("INSERT INTO ai_assessments(user_id,industry,exec_role,objective,capability,score,level) VALUES($1,$2,$3,$4,$5::jsonb,$6,$7)",[uid,industry,exec_role,objective,JSON.stringify(cap),score,level]);return res.json({ok:true,score,level,label:labels[level]})
}
const a=await db.query("SELECT id,industry,exec_role,objective,capability,score,level,created_at FROM ai_assessments WHERE user_id=$1 ORDER BY created_at DESC LIMIT 12",[uid]);
const done=await db.query("SELECT module_key FROM ai_module_progress WHERE user_id=$1",[uid]);
const current=a.rows[0]||null;res.json({industries:Object.keys(industries),roles:Object.keys(roles),levels:labels.slice(1),latest:current,history:a.rows.map(x=>({score:x.score,level:x.level,created_at:x.created_at})),modules:current?plan(current,done.rows.map(x=>x.module_key)):[],completed:done.rows.map(x=>x.module_key)});
}