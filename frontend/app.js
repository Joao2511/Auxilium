import { initRouter, go } from "./routes/router.js";
import { authGuard } from "./utils/authGuard.js";
import { fetchPage } from "./utils/fetchPage.js";
import { mountLogin } from "./controllers/LoginController.js";
import { mountHome } from "./controllers/HomeController.js";
import { mountDisciplinas } from "./controllers/DisciplinasController.js";
import { mountCalendario } from "./controllers/CalendarioController.js";
import { mountNotas } from "./controllers/NotasController.js";

// Mapeia rota -> função de carregar HTML + montar controller
const routes = {
  "/": async () => {
    const html = await fetchPage("/pages/login/index.html");
    document.getElementById("app").innerHTML = html;
    mountLogin();
  },
  "/home": authGuard(async () => {
    const html = await fetchPage("/pages/home/index.html");
    document.getElementById("app").innerHTML = html;
    mountHome();
  }),
  "/disciplinas": authGuard(async () => {
    const html = await fetchPage("/pages/disciplinas/index.html");
    document.getElementById("app").innerHTML = html;
    mountDisciplinas();
  }),
  "/calendario": authGuard(async () => {
    const html = await fetchPage("/pages/calendario/index.html");
    document.getElementById("app").innerHTML = html;
    mountCalendario();
  }),
  "/notas": authGuard(async () => {
    const html = await fetchPage("/pages/notas/index.html");
    document.getElementById("app").innerHTML = html;
    mountNotas();
  }),
};

initRouter(routes);

// Atalhos globais (se precisar usar em templates)
window.go = go;
