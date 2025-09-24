import fetch from "node-fetch";

const BASE = process.env.MOODLE_BASE_URL;
const FORMAT = process.env.MOODLE_REST_FORMAT || "json";

export async function getMoodleToken(username, password, serviceName) {
  const res = await fetch(`${BASE}/login/token.php`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ username, password, service: serviceName })
  });
  const data = await res.json();
  if (!data?.token) throw new Error(data?.error || "Falha ao obter token do Moodle");
  return data.token;
}

export async function callMoodle(wsfunction, wstoken, params = {}) {
  const url = new URL(`${BASE}/webservice/rest/server.php`);
  url.searchParams.set("wstoken", wstoken);
  url.searchParams.set("wsfunction", wsfunction);
  url.searchParams.set("moodlewsrestformat", FORMAT);
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, v);
  }
  const res = await fetch(url.toString());
  const data = await res.json();
  if (data?.exception) throw new Error(`${data.errorcode || "moodle_error"}: ${data.message}`);
  return data;
}
