const BACKEND_URL = "http://192.168.1.70:8000";

export async function registerUser(payload) {
  const response = await fetch(`${BACKEND_URL}/user/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  if (!response.ok)
    throw data

  return data;
}
