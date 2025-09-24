export async function whoAmI(req, res) {
  res.json({ ok: true, me: { uid: req.user?.uid } });
}
