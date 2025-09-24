import jwt from "jsonwebtoken";

export function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const token = header.replace("Bearer ", "");
    const payload = jwt.verify(token, process.env.SESSION_SECRET);
    req.user = payload; // { uid, email? }
    next();
  } catch {
    res.status(401).json({ ok: false, error: "unauthorized" });
  }
}

export function getSessionMoodleToken(req, uid) {
  const map = req.session?.moodleTokenByUser || {};
  return map[uid];
}

export function setSessionMoodleToken(req, uid, moodleToken) {
  req.session.moodleTokenByUser ||= {};
  req.session.moodleTokenByUser[uid] = moodleToken;
}
