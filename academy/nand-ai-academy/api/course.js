import {db} from "hatchable";
export const access = "user";
export const methods=["GET"];
export default async function(req,res){const id=req.query.id,uid=req.user.id;if(!/^[0-9a-f-]{36}$/i.test(String(id||"")))return res.status(400).json({error:"Invalid course"});
const c=await db.query("SELECT id,title,subject,level,description FROM courses WHERE id=$1 AND published=TRUE",[id]);if(!c.rows.length)return res.status(404).json({error:"Course not found"});
const enrolled=await db.query("SELECT 1 FROM enrollments WHERE user_id=$1 AND course_id=$2",[uid,id]);
const lessons=await db.query("SELECT l.id,l.title,l.content,l.duration_minutes,l.order_index, EXISTS(SELECT 1 FROM lesson_progress p WHERE p.lesson_id=l.id AND p.user_id=$1) AS completed FROM lessons l WHERE course_id=$2 ORDER BY order_index",[uid,id]);
const assignments=await db.query("SELECT a.id,a.title,a.instructions,a.due_at,s.answer,s.score,s.feedback FROM assignments a LEFT JOIN submissions s ON s.assignment_id=a.id AND s.user_id=$1 WHERE a.course_id=$2 ORDER BY a.due_at NULLS LAST",[uid,id]);
res.json({course:c.rows[0],enrolled:!!enrolled.rows.length,lessons:enrolled.rows.length?lessons.rows:lessons.rows.map(({id,title,duration_minutes,order_index})=>({id,title,duration_minutes,order_index,locked:true})),assignments:enrolled.rows.length?assignments.rows:[]});}