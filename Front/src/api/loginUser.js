const Backend_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

export async function loginUser(identifier, password) {
  const response = await fetch(`${Backend_URL}/login/login`, {
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
