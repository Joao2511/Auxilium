import { MoodleService } from "../services/MoodleService.js";
import { clearAuth } from "../utils/storage.js";
import { go } from "../routes/router.js";

export async function mountHome() {
  document.getElementById("logoutBtn")?.addEventListener("click", () => {
    clearAuth(); go("/");
  });

  const host = document.getElementById("courses");
  host.innerHTML = `<div class="opacity-70">Carregando...</div>`;
  try {
    const { courses = [] } = await MoodleService.myCourses();
    host.innerHTML = courses.map(c => `
      <article class="p-4 rounded-lg border border-slate-800 bg-slate-900/60">
        <h3 class="font-medium">${c.fullname || c.shortname || "Curso"}</h3>
        <p class="text-sm opacity-70">${c.id ? "ID: " + c.id : ""}</p>
      </article>
    `).join("") || `<p class="opacity-70">Nenhum curso.</p>`;
  } catch (e) {
    host.innerHTML = `<p class="text-rose-400">Erro: ${e.message}</p>`;
  }
}
