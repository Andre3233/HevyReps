const BACKEND_URL = "http://192.168.1.70:8000"; //IP do PC

export async function loginUser(identifier, password) {
  const response = await fetch(`${BACKEND_URL}/login/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      identifier,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) throw data;

  return data;
}
