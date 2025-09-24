export async function fetchPage(path) {
  const res = await fetch(path, { cache: "no-cache" });
  if (!res.ok) throw new Error(`Falha ao carregar ${path}`);
  return res.text();
}
