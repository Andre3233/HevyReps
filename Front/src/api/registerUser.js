const Backend_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

export async function registerUser(payload) {
  const response = await fetch(`${Backend_URL}/user/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
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
