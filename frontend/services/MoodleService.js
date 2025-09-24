import { api } from "./ApiClient.js";
export const MoodleService = {
  myCourses: () => api.get("/moodle/me/courses"),
  // depois: calendar, grades etc.
};
