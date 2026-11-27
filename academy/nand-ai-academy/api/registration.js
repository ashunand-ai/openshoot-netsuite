import { db, email } from 'hatchable';

export const access = 'public';
export const methods = ['POST'];
const notifyTo = 'OWNER_EMAIL@example.com'; // Replace before enabling email sends in your own deployment.
const levels = new Set(['Beginner','Learner','Advanced']);
const industries = new Set(['Technology & Software','Finance & Accounting','Professional Services','Manufacturing & Distribution','Retail & Ecommerce','Healthcare & NDIS','Education','Government & Nonprofit','Other']);
const roles = new Set(['Student / Learner','NetSuite Administrator','Finance / CFO','Accountant / Controller','Developer / IT','Operations Manager','Business Owner / Executive','Consultant / SI','Other']);
const clean = (x,n) => typeof x === 'string' ? x.trim().slice(0,n+1) : '';
const escape = x => String(x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export default async function(req,res){
 try {
  const b=req.body||{};
  // Honeypot: pretend success without creating a record or sending email.
  if (b.website) return res.json({ok:true,message:'Your request has been received for review.'});
  const first=clean(b.first_name,70),last=clean(b.last_name,70),mobile=clean(b.mobile,30),address=clean(b.email,254).toLowerCase(),objective=clean(b.objective,1200);
  const level=clean(b.level,30),industry=clean(b.industry,80),role=clean(b.learner_role,80);
  if(!/^[\p{L}][\p{L} .'-]{0,69}$/u.test(first)||!/^[\p{L}][\p{L} .'-]{0,69}$/u.test(last)) return res.status(400).json({error:'Enter your first and last name.'});
  if(!/^\+?[0-9 ()-]{7,25}$/.test(mobile)) return res.status(400).json({error:'Enter a valid mobile number.'});
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address)||address.length>254) return res.status(400).json({error:'Enter a valid email address.'});
  if(objective.length<15||objective.length>1200) return res.status(400).json({error:'Please describe your learning objective (15–1200 characters).'});
  if(!levels.has(level)||!industries.has(industry)||!roles.has(role)) return res.status(400).json({error:'Choose a valid level, industry and role.'});
  if(b.consent !== true) return res.status(400).json({error:'Please agree to the registration privacy notice.'});
  const recent=await db.query("SELECT id FROM academy_registration_requests WHERE lower(email)=$1 AND created_at>now()-interval '24 hours' ORDER BY created_at DESC LIMIT 1",[address]);
  if(recent.rows.length) return res.json({ok:true,message:'If you have recently applied, your request is already awaiting review.'});
  const inserted=await db.query("INSERT INTO academy_registration_requests(first_name,last_name,mobile,email,objective,level,industry,learner_role) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id",[first,last,mobile,address,objective,level,industry,role]);
  const id=inserted.rows[0].id;
  const fields=[['Name',first+' '+last],['Email',address],['Mobile',mobile],['Level',level],['Industry',industry],['Role',role],['Learning objective',objective],['Request ID',id]];
  const text='New Nand AI Academy registration request\n\n'+fields.map(([k,v])=>k+': '+v).join('\n')+'\n\nAction: review the application and, if approved, invite the learner using the existing Hatchable student login system. Submission does NOT grant access.';
  const html='<h2>New Nand AI Academy registration request</h2><dl>'+fields.map(([k,v])=>'<dt><b>'+escape(k)+'</b></dt><dd style="margin:0 0 12px">'+escape(v)+'</dd>').join('')+'</dl><p>Review this request, then manually invite the learner in Hatchable. No account has been created.</p>';
  try {
    const sent=await email.send({to:notifyTo,subject:'Nand AI Academy — registration request',text,html});
    if(sent?.success===false) throw Error('Email provider did not accept message');
    await db.query("UPDATE academy_registration_requests SET notification_status='sent',updated_at=now() WHERE id=$1",[id]);
    return res.json({ok:true,message:'Thanks. Your registration request has been submitted for review. You will receive access details if approved.'});
  }catch(err){
    console.error('Registration email failed',id,String(err?.message||err));
    await db.query("UPDATE academy_registration_requests SET notification_status='failed',updated_at=now() WHERE id=$1",[id]);
    return res.json({ok:true,message:'Your request was saved for review. Access details are sent manually after approval.'});
  }
 }catch(err){console.error('Registration request failed',String(err?.message||err));return res.status(500).json({error:'We could not save your request. Please try again.'});}
}