import { db } from "hatchable";
export const access="user"; export const methods=["GET"];
export default async function(req,res){const uid=req.user.id;
const profile=await db.query("SELECT display_name,role FROM profiles WHERE user_id=$1",[uid]);
const courses=await db.query("SELECT c.id,c.title,c.subject,c.level,c.description,c.accent, EXISTS(SELECT 1 FROM enrollments e WHERE e.course_id=c.id AND e.user_id=$1) AS enrolled, (SELECT count(*)::int FROM lessons l WHERE l.course_id=c.id) AS lessons, (SELECT count(*)::int FROM lessons l JOIN lesson_progress p ON p.lesson_id=l.id WHERE l.course_id=c.id AND p.user_id=$1) AS done FROM courses c WHERE c.published=TRUE ORDER BY c.subject,c.title",[uid]);
const sessions=await db.query("SELECT s.id,c.title AS course,s.start_at,s.end_at,s.status,s.meeting_url FROM tutoring_sessions s LEFT JOIN courses c ON c.id=s.course_id WHERE s.student_id=$1 ORDER BY s.start_at LIMIT 10",[uid]);
res.json({user:{name:profile.rows[0]?.display_name||req.user.name||req.user.email||"Student",role:profile.rows[0]?.role||"student"},courses:courses.rows,sessions:sessions.rows});}