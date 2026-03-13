import { BACKEND_URL } from "./config";

async function workoutsResponse(response) {
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

// Lê uma lista de treinos
export async function listWorkouts(fetchWithAuth, limit = 50) {
  const response = await fetchWithAuth(
    `${BACKEND_URL}/workouts/?limit=${limit}`,
    {
      method: "GET",
    },
  );

  return await workoutsResponse(response);
}

export async function createWorkout(fetchWithAuth, payload) {
  const response = await fetchWithAuth(`${BACKEND_URL}/workouts/`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return await workoutsResponse(response);
}

export async function updateWorkout(fetchWithAuth, workoutId, payload) {
  const response = await fetchWithAuth(`${BACKEND_URL}/workouts/${workoutId}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
  return await workoutsResponse(response);
}

export async function deleteWorkout(fetchWithAuth, workoutId) {
  const response = await fetchWithAuth(`${BACKEND_URL}/workouts/${workoutId}`, {
    method: "DELETE",
  });

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
