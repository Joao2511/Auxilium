import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import { whoAmI } from "../controllers/user.controller.js";

const r = Router();
r.use(requireAuth);
r.get("/me", whoAmI);
export default r;
