import { api } from "./ApiClient.js";
export const AuthService = {
  login: (username, password) => api.post("/auth/login", { username, password }),
};
