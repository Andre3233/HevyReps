import { BACKEND_URL } from "./config";

export async function loginUser(identifier, password) {
  const response = await fetch(`${BACKEND_URL}/login/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      identifier,
      password,
    }),
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
