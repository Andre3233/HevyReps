import { BACKEND_URL } from "./config";

export async function deleteAccount(fetchWithAuth) {
  const response = await fetchWithAuth(`${BACKEND_URL}/user/delete`, {
    method: "DELETE",
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.detail || "Erro ao apagar conta");
  }

  return data;
}

export async function updateUsername(fetchWithAuth, username) {
  const response = await fetchWithAuth(`${BACKEND_URL}/user/username`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Erro ao atualizar username");
  }

  return data;
}

export async function updatePassword(fetchWithAuth, password) {
  const response = await fetchWithAuth(`${BACKEND_URL}/user/password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Erro ao atualizar password");
  }

  return data;
}
