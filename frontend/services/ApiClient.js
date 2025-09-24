import { CONFIG } from "../utils/config.js";
import { getJWT } from "../utils/storage.js";

async function request(path, opts = {}) {
  const headers = { "Content-Type": "application/json", ...(opts.headers || {}) };
  const jwt = getJWT();
  if (jwt) headers.Authorization = `Bearer ${jwt}`;

  const res = await fetch(CONFIG.API_BASE + path, { ...opts, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data?.ok === false) throw new Error(data.error || res.statusText);
  return data;
}

export const api = {
  get: (p) => request(p),
  post: (p, body) => request(p, { method: "POST", body: JSON.stringify(body) }),
};
