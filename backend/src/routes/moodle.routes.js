import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import { getMyCourses } from "../controllers/moodle.controller.js";

const r = Router();
r.use(requireAuth);
r.get("/me/courses", getMyCourses);
export default r;
