import { BACKEND_URL } from "./config";

export async function exerciseResponse(response) {
  let data = null;

  try {
    data = await response.json();
  } catch {
    if (!response.ok) {
      throw { detail: "Erro no servido. " };
    }
    return [];
  }

  if (!response.ok) {
    throw data || { detail: "Erro no servidor." };
  }

  return data;
}

export async function listExercises({search = "", limit=30, offset=0,} = {}) {
    const params = new URLSearchParams()
    const trimmedSearch = search.trim()

    if(trimmedSearch){
        params.append("search", trimmedSearch)
    }

    params.append("limit", String(limit))
    params.append("offset", String(offset))

    const response = await fetch(`${BACKEND_URL}/exercises/?${params.toString()}`,{method: "GET",})

    return await exerciseResponse(response)
}

export async function getExercise(fetchWithAuth, exerciseId) {
  const response = await fetchWithAuth(`${BACKEND_URL}/exercises/${exerciseId}`, {method: "GET",})
  return await exerciseResponse(response)
}