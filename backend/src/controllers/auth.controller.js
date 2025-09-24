import jwt from "jsonwebtoken";
import { getMoodleToken } from "../services/moodle.service.js";
import { setSessionMoodleToken } from "../middleware/auth.middleware.js";

export async function login(req, res) {
  try {
    const { username, password } = req.body; // email institucional + senha Moodle
    if (!username || !password) throw new Error("Credenciais obrigatórias");

    const moodleToken = await getMoodleToken(
      username, password, process.env.MOODLE_SERVICE_NAME
    );

    // guarda token do Moodle na sessão do servidor
    setSessionMoodleToken(req, username, moodleToken);

    // emite um JWT da sua aplicação (não contém o token do Moodle!)
    const appJwt = jwt.sign({ uid: username }, process.env.SESSION_SECRET, { expiresIn: "2h" });

    res.json({ ok: true, jwt: appJwt, user: { username } });
  } catch (e) {
    res.status(401).json({ ok: false, error: e.message });
  }
}

export async function logout(req, res) {
  req.session?.destroy?.(() => {});
  res.json({ ok: true });
}
