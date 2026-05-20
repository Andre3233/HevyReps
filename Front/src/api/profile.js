import { BACKEND_URL } from "./config";

async function profileResponse(response) {
  let data = null;

  try {
    data = await response.json();
  } catch {
    if (!response.ok) throw { detail: "Erro no servidor" };
    return null;
  }

  if (!response.ok) throw data;
  return data;
}

export async function getUserStats(fetchWithAuth) {
  const response = await fetchWithAuth(`${BACKEND_URL}/user/stats`, {
    method: "GET",
  });
  return await profileResponse(response);
}

export async function listWorkoutHistory(
  fetchWithAuth,
  limit = 30,
  cursor = null,
) {
  let url = `${BACKEND_URL}/workout-history/?limit=${limit}`;
  if (cursor) {
    url += `&cursor=${cursor}`;
  }

  const response = await fetchWithAuth(url, {
    method: "GET",
  });
  return await profileResponse(response);
}
