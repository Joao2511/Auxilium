import { api } from "./ApiClient.js";
export const UserService = {
  me: () => api.get("/user/me"),
};
