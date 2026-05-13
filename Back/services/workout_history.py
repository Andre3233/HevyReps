from datetime import datetime, timezone, timedelta
from typing import Any, Dict, List, Optional
from google.cloud.firestore_v1.base_query import FieldFilter

def now_iso():
    return datetime.now(timezone.utc).isoformat()

def _workouts_history_collection(db): #Atalho para a coleção treinos
    return db.collection("workout_history")

def _doc_to_workout(doc) -> Dict[str, Any]:
    #Converte um DocumentSnapshot do Firestore num dict com id incluído.
    data = doc.to_dict() or {}
    data["id"] = doc.id
    return data

def create_workout_history(db, owner_username: str, data: Dict[str, Any]) -> Dict[str, Any]:
    if not owner_username.strip():
        raise ValueError("owner_username inválido")
    
    session_id = data.get("sessionId")
    if not session_id.strip():
        raise ValueError("sessionId é obrigatorio")
    
    # Prevenir duplicados
    existing_query = (
        _workouts_history_collection(db)
        .where(filter=FieldFilter("owner_username", "==", owner_username))
        .where(filter=FieldFilter("sessionId", "==", session_id))
        .limit(1)
    )
    existing = list(existing_query.stream())

    if len(existing) > 0:
        raise ValueError(f"Sessão {session_id} já existe")
    
    exercises = data.get("exercises") or []
    if len(exercises) == 0:
        raise ValueError("Deve ter pelo menos 1 exercício")
    
    total_sets = 0
    for exercise in data["exercises"]:
        total_sets += len(exercise["exercise_sets"])
        
    total_volume = 0.0
    for exercise in data["exercises"]:
        for set_data in exercise["exercise_sets"]:
            reps = set_data["repetitions"]
            weight = set_data["weight"]
            total_volume += reps * weight
            
    start_time = data["startTime"]  
    end_time = data["endTime"]
    if not start_time or not end_time:
        raise ValueError("startTime e endTime são obrigatorios")
    if end_time <= start_time:
        raise ValueError("endTime deve ser posterior a startTime")  
    duration = int((end_time - start_time).total_seconds())
    
    payload = {
        "owner_username": owner_username,
        "sessionId": data.get("sessionId"),
        "workoutId": data.get("workoutId"),
        "name": data.get("name"),
        "startTime": start_time,
        "endTime": end_time,
        "exercises": exercises,
        "totalVolume": total_volume,  
        "totalSets": total_sets,      
        "duration": duration,
        "created_at": now_iso(),      
    }
    
    #cria um doc com id auto
    ref = _workouts_history_collection(db).document()
    ref.set(payload)
    
    created = payload.copy()
    created["id"] = ref.id 
    return created

def _get_workout_history(db, owner_username: str, workout_id: str) -> Optional[Dict[str, Any]]:
    #Helper interno para ir buscar e validar se pertence ao user
    if not workout_id.strip():
        raise ValueError("Id inválido")
    
    ref = _workouts_history_collection(db).document(str(workout_id))
    snap = ref.get()
    
    if not snap.exists:
        return None
    
    data = _doc_to_workout(snap)
    
     # por segurança não deixas ir buscar treinos de outra pessoa
    if data.get("owner_username") != owner_username:
        return None
    
    return data

def list_workout_history(db, owner_username: str, limit: int = 50) -> List[Dict[str, Any]]:
        #Lista os treinos do utilizador pelo mais recente
    if not owner_username.strip():
        raise ValueError("owner_username inválido")
    
    #Limita o número de treinos retornados para evitar sobrecarregar o cliente e o servidor
    if limit < 1:
        limit = 1
    if limit > 100:
        limit = 100
        
    query = (
        _workouts_history_collection(db)
        .where("owner_username","==", owner_username)
        .order_by("created_at", direction="DESCENDING")
        .limit(limit)
    )
    
    docs = query.stream()
    return[_doc_to_workout(d) for d in docs]

def delete_workout_history(db, owner_username: str, workout_id: str) -> bool:
    current = _get_workout_history(db, owner_username, workout_id)
    if current is None:
        return False
    
    ref = _workouts_history_collection(db).document(str(workout_id))
    ref.delete()
    return True