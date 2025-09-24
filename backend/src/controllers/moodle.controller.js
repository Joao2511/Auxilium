import { callMoodle } from "../services/moodle.service.js";
import { getSessionMoodleToken } from "../middleware/auth.middleware.js";

/** GET /moodle/me/courses */
export async function getMyCourses(req, res) {
  try {
    const uid = req.user?.uid; // usamos o username/email como uid
    const token = getSessionMoodleToken(req, uid);
    if (!token) return res.status(401).json({ ok: false, error: "Sem token Moodle na sessão" });

    // 1) resolver id do usuário no Moodle por email/login
    const users = await callMoodle("core_user_get_users_by_field", token, {
      field: "email",
      "values[0]": uid
    });
    const moodleUserId = users?.[0]?.id;
    if (!moodleUserId) throw new Error("Usuário Moodle não encontrado");

    // 2) cursos do usuário
    const courses = await callMoodle("core_enrol_get_users_courses", token, {
      userid: moodleUserId
    });

    res.json({ ok: true, courses });
  } catch (e) {
    res.status(400).json({ ok: false, error: e.message });
  }
}
