import { BACKEND_URL } from "./config";

export async function refreshAccessToken(refreshToken) {
  const response = await fetch(`${BACKEND_URL}/auth/refresh-token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });

  let data;
  try {
    data = await response.json();
  } catch {
    throw { detail: "Erro no servidor" };
  }

  if (!response.ok) throw data;
  return data;
}
