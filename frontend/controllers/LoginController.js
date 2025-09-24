import { AuthService } from "../services/AuthService.js";
import { setJWT } from "../utils/storage.js";
import { go } from "../routes/router.js";

export function mountLogin() {
  const form = document.getElementById("loginForm");
  const error = document.getElementById("loginError");

  form?.addEventListener("submit", async (e) => {
    e.preventDefault();
    error?.classList.add("hidden");
    const fd = new FormData(form);
    const username = fd.get("username");
    const password = fd.get("password");

    try {
      const res = await AuthService.login(username, password);
      setJWT(res.jwt);
      go("/home");
    } catch (err) {
      error.textContent = err.message || "Falha no login";
      error.classList.remove("hidden");
    }
  });
}
