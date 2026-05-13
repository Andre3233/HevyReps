import { BACKEND_URL } from "./config";

async function workoutHistoryResponse(response) {
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

export async function createWorkoutHistory(fetchWithAuth, payload) {
  const response = await fetchWithAuth(`${BACKEND_URL}/workout-history/`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return await workoutHistoryResponse(response);
}

export async function listWorkoutHistory(fetchWithAuth, limit = 50) {
  const response = await fetchWithAuth(
    `${BACKEND_URL}/workout-history/?limit=${limit}`,
    {
      method: "GET",
    },
  );
  return await workoutHistoryResponse(response);
}

export async function deleteWorkoutHistory(fetchWithAuth, workoutId) {
  const response = await fetchWithAuth(
    `${BACKEND_URL}/workout-history/${workoutId}`,
    {
      method: "DELETE",
    },
  );

  if (!response.ok) {
    let data;
    try {
      data = await response.json();
    } catch {
      throw { detail: "Erro no servidor" };
    }
    throw data;
  }

  return true;
}