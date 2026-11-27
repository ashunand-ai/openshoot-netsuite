import {db} from "hatchable";
export const access = "user";
export const methods = ["GET"];
export default async function(req,res){
const email=String(req.user.email||"").trim().toLowerCase(); const owner=email==="ashwinand@gmail.com";
if(owner){await db.query("INSERT INTO profiles(user_id,display_name,role,approved) VALUES($1,$2,'admin',true) ON CONFLICT (user_id) DO UPDATE SET role='admin',approved=true",[req.user.id,req.user.name||'Administrator'])}
const {rows}=await db.query("SELECT role,display_name,approved FROM profiles WHERE user_id=$1",[req.user.id]);
res.json({role:owner?'admin':rows[0]?.role||'student',approved:owner||!!rows[0]?.approved,name:rows[0]?.display_name||req.user.name||email,email});}