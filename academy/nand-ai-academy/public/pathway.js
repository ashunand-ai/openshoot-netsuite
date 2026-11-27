const root=document.getElementById("pathway-app");
let state=null,filter="all";
const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
async function api(method="GET",body){
const r=await fetch("/api/pathway",{method,credentials:"include",headers:{"Content-Type":"application/json"},body:body?JSON.stringify(body):undefined});
if(r.status===401){location.replace("/login?next=/pathway");throw Error("Sign in to continue")}
const json=await r.json().catch(()=>({}));
if(!r.ok)throw Error(json.error||"Request failed");
return json;
}
function selectOptions(arr,chosen){return arr.map(x=>{const id=typeof x==="string"?x:x.id,label=typeof x==="string"?x:x.name;return '<option value="'+esc(id)+'" '+(chosen===id?"selected":"")+'>'+esc(label)+'</option>'}).join("")}
function baseline(){
const p=state.profile||{};
root.innerHTML='<section class="panel"><div class="eyebrow">STEP ONE · KNOW YOUR BASELINE</div><h2>Build your personalised AI learning plan</h2><p class="muted">Your experience matters. This is a self-assessment, not an independent qualification or professional certification. You can choose a different starting level from the recommendation.</p><form id="baseline-form"><div class="pathway-grid">'+
'<label>Industry *<select class="field pathway-select" name="industry" required><option value="">Select your industry</option>'+selectOptions(state.industries,p.industry_key)+'</select></label>'+
'<label>Business role *<select class="field pathway-select" name="role" required><option value="">Select your role</option>'+selectOptions(state.roles,p.role_key)+'</select></label>'+
'<label>Where would you place yourself today? *<select class="field pathway-select" name="self_level" required>'+selectOptions(state.levels,p.self_level||"Basic")+'</select></label>'+
'<label>Which level would you like to start at? *<select class="field pathway-select" name="start_level" required>'+selectOptions(state.levels,p.starting_level||p.self_level||"Basic")+'</select></label>'+
'<label>Learning time available per week (hours) *<input class="field" type="number" name="experience_hours" min="0" max="80" required value="'+esc(p.experience_hours??3)+'"></label></div>'+
'<label style="display:block;margin-top:20px">Your business objective *<textarea class="field" name="objective" rows="4" minlength="15" maxlength="1000" placeholder="Example: reduce weekly finance pack preparation from six hours to two without compromising review controls" required>'+esc(p.objective||"")+'</textarea></label>'+
'<h3 style="margin-top:30px">Eight capability questions</h3><p class="pathway-note">0 = not yet, 1 = learning, 2 = can do with help, 3 = can do independently. Answer based on current evidence rather than aspiration.</p>'+
state.questions.map((q,i)=>'<fieldset class="pathway-question" style="border-left:0;border-right:0;border-bottom:0"><legend><strong>'+String(i+1)+'. '+esc(q.label)+'</strong></legend><p class="muted">'+esc(q.prompt)+'</p><div class="pathway-radios">'+[0,1,2,3].map(n=>'<label><input type="radio" name="q_'+esc(q.id)+'" value="'+n+'" '+(Number(p.answers?.[q.id])===n?"checked":"")+' required> '+n+'</label>').join("")+'</div></fieldset>').join("")+
'<button type="submit" id="assess-btn" class="btn">Generate my AI pathway →</button><p id="assessment-status" class="pathway-note" role="status"></p></form></section>'+
'<section class="panel"><h3>How your pathway is selected</h3><p class="muted">Your answers suggest an assessed level. You remain in control of the starting level. Every industry and role combination has 10 practical AI opportunities, with exercises, deliverables, metrics and safety controls.</p></section>';
}
function progressBar(done,total){return Math.round(100*done/Math.max(1,total))}
function dashboard(){
const p=state.profile,items=state.pathway||[],done=items.filter(x=>x.completed).length;
const role=state.roles.find(x=>x.id===p.role_key)?.name||p.role_key;
const industry=state.industries.find(x=>x.id===p.industry_key)?.name||p.industry_key;
const levels=state.levels;
root.innerHTML='<section class="panel"><div class="line" style="flex-wrap:wrap"><div><div class="eyebrow">YOUR PERSONALISED LEARNING JOURNEY</div><h2>'+esc(role)+'</h2><p class="muted">'+esc(industry)+' · '+esc(p.objective)+'</p></div><button id="reassess" class="btn light">Update assessment ↗</button></div>'+
'<div class="stats"><div class="stat"><span class="micro">Assessed capability</span><strong>'+esc(p.score)+'/100</strong><p>'+esc(p.assessed_level)+'</p></div><div class="stat"><span class="micro">Your chosen start</span><strong style="font-size:22px">'+esc(p.starting_level)+'</strong><p class="micro">You can revisit earlier levels</p></div><div class="stat"><span class="micro">Progress</span><strong>'+done+' / '+items.length+'</strong><div class="progress"><div style="width:'+progressBar(done,items.length)+'%"></div></div></div></div>'+
'<h3 style="margin-top:25px">Four-stage AI capability ladder</h3><div class="pathway-steps">'+levels.map(l=>'<button type="button" class="pathway-step '+(filter===l?"current":"")+'" data-level="'+esc(l)+'">'+esc(l)+'</button>').join("")+'<button type="button" class="pathway-step '+(filter==="all"?"current":"")+'" data-level="all">All 10 cases</button></div>'+
'<p class="pathway-note"><strong>Basic:</strong> literacy and safe everyday work. <strong>Beginner:</strong> reviewed workflows and structured prompting. <strong>Intermediate:</strong> measurement, data and reusable processes. <strong>Advanced:</strong> governed pilots and scaling. The first recommended lesson is in '+esc(p.starting_level)+'.</p></section>'+
'<section class="panel"><div class="eyebrow">PRACTICAL EXECUTIVE AI USE CASES</div><h2>Ten opportunities tailored to your industry and role</h2><p class="muted">These are original, contextualised exercises—not automated business actions. Each teaches you to identify approved inputs, perform a controlled task, verify the result and measure value.</p><div id="cases"></div></section>'+
'<section class="panel"><div class="eyebrow">FREE LEARNING LIBRARY · EXTERNAL RESOURCES</div><h2>Learn from leading institutions</h2><p class="muted">Supplement your pathway with official provider resources. These are outbound links, not copied courses or claims of institutional endorsement. Free access does not always mean an open reuse licence.</p>'+
state.resources.map(r=>'<div class="listrow"><strong>'+esc(r.name)+'</strong><p class="micro">'+esc(r.type)+'</p><a class="btn light" href="'+esc(r.url)+'" target="_blank" rel="noopener noreferrer">Visit official course ↗</a></div>').join("")+'</section>';
drawCases();
document.getElementById("reassess").onclick=()=>{baseline();window.scrollTo({top:0,behavior:"smooth"})};
document.querySelectorAll("[data-level]").forEach(b=>b.onclick=()=>{filter=b.dataset.level;dashboard()});
}
function drawCases(){
const items=state.pathway.filter(x=>filter==="all"||x.stage===filter);
document.getElementById("cases").innerHTML=items.map(c=>
'<article class="pathway-case"><div class="line" style="flex-wrap:wrap"><div><span class="pathway-pill">'+esc(c.stage)+'</span> <span class="micro">EXERCISE '+c.number+' · '+c.estimated_minutes+' MIN</span></div><span class="micro">'+(c.completed?"✓ Completed":"Not yet completed")+'</span></div>'+
'<h3 class="pathway-card-title">'+esc(c.title)+'</h3><p>'+esc(c.scenario)+'</p>'+
'<div class="pathway-meta"><span><strong>Deliverable:</strong> '+esc(c.deliverable)+'</span><span><strong>Success measure:</strong> '+esc(c.kpi)+'</span></div>'+
'<details style="margin-top:15px"><summary>Open step-by-step applied lesson</summary><p class="pathway-note"><strong>Approved example inputs:</strong> '+esc(c.input_data)+'</p><ol>'+c.steps.map(s=>'<li>'+esc(s)+'</li>').join("")+'</ol><p><strong>Check before adoption:</strong> '+esc(c.risk)+'</p><p class="pathway-note">Learning proof: produce the deliverable using synthetic data, compare against an existing baseline, identify at least one failure mode and record who reviews the output. This is practice, not a professional certification.</p></details>'+
(!c.completed?(c.unlocked?
'<div style="margin-top:18px"><label><strong>What did you build and verify?</strong><textarea class="field" data-evidence rows="3" minlength="30" maxlength="1800" placeholder="Describe your exercise, the review performed and one limitation. Do not enter confidential business information."></textarea></label>'+
'<label><strong>Baseline or measurable outcome</strong><input class="field" data-metric maxlength="350" placeholder="Example: Baseline 90 mins; verified sample 55 mins including review"></label>'+
'<label style="display:flex;gap:9px;align-items:flex-start;margin:12px 0"><input type="checkbox" data-reviewed> I checked the result for accuracy, privacy and required approvals.</label>'+
'<button type="button" class="btn light" data-complete="'+esc(c.id)+'">Submit learning evidence & complete ✓</button><p class="pathway-note" data-error role="status"></p></div>'
:'<p class="pathway-note">This exercise unlocks after you complete earlier exercises in your chosen starting pathway. You can revisit previous levels for extra practice.</p>')
:'<p class="pathway-note">Your reviewed learning evidence was saved privately.</p>')+
'</article>').join("")||'<p>No exercises at this stage.</p>';
document.querySelectorAll("[data-complete]").forEach(b=>b.onclick=async()=>{
 const card=b.closest(".pathway-case"),error=card.querySelector("[data-error]");
 const note=card.querySelector("[data-evidence]").value.trim(),metric=card.querySelector("[data-metric]").value.trim();
 const reviewed=card.querySelector("[data-reviewed]").checked;
 if(note.length<30||metric.length<10||!reviewed){error.textContent="Complete the evidence and baseline fields, and confirm your review.";return}
 b.disabled=true;error.textContent="";
 try{await api("POST",{type:"complete",id:b.dataset.complete,evidence_note:note,metric_note:metric,reviewed});await refresh();}
 catch(e){error.textContent=e.message;b.disabled=false;}
});
}
async function refresh(){state=await api();state.profile?dashboard():baseline()}
document.addEventListener("submit",async e=>{
if(e.target.id!=="baseline-form")return;e.preventDefault();
const form=e.target,fd=new FormData(form),answers={};state.questions.forEach(q=>answers[q.id]=Number(fd.get("q_"+q.id)));
const body={type:"assess",industry:fd.get("industry"),role:fd.get("role"),self_level:fd.get("self_level"),start_level:fd.get("start_level"),objective:fd.get("objective"),experience_hours:Number(fd.get("experience_hours")),answers};
const button=document.getElementById("assess-btn"),msg=document.getElementById("assessment-status");button.disabled=true;
try{const result=await api("POST",body);filter=result.starting_level;await refresh();window.scrollTo({top:0,behavior:"smooth"});}
catch(err){msg.textContent=err.message;button.disabled=false;}
});
refresh().catch(err=>{root.innerHTML='<div class="panel"><h2>Sign in to get your personal AI pathway</h2><p class="muted">'+esc(err.message)+'</p><a class="btn" href="/login?next=/pathway">Student sign in →</a></div>'});