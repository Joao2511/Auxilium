// usando Navigo em modo hash para facilitar ambiente estático
export function initRouter(table) {
  const router = new window.Navigo("/", { hash: true });
  Object.entries(table).forEach(([path, handler]) => {
    router.on(path, async () => { await handler(); });
  });
  router.on(() => router.navigate("/")); // fallback
  router.notFound(() => router.navigate("/"));
  router.resolve();

  window.addEventListener("hashchange", () => router.resolve());
}

export function go(path) {
  location.hash = "#" + path;
}
