from datetime import datetime, timezone
from typing import Any, Dict, List, Optional

def now_iso():
    return datetime.now(timezone.utc).isoformat()


def _workouts_collection(db): #Atalho para a coleção treinos
    return db.collection("workouts")

def _normalize_name(name: str) -> str:
    return " ".join(name.strip().split())

def _normalize_exercise_ids(exercise_ids: Optional[List[Any]]) -> List[str]:
    #Garante que exercise_ids é uma lista de strings e Remove ids vazios e duplicados mantendo a ordem.
    if not exercise_ids:
        return []
    
    cleaned: List[str] = []
    seen = set()
    
    for x in exercise_ids:
        if x is None:
            continue
        s = str(x).strip()
        if not s:
            continue
        if s in seen:
            continue
        seen.add(s)
        cleaned.append(s)
        
    return cleaned

def _doc_to_workout(doc) -> Dict[str, Any]:
    #Converte um DocumentSnapshot do Firestore num dict com id incluído.
    data = doc.to_dict() or {}
    data["id"] = doc.id
    return data

#CRUD
def create_workout(db, owner_username: str, data: Dict[str, Any]) -> Dict[str, Any]:
    if not owner_username or not str(owner_username).strip():
        raise ValueError("owner_username inválido")
    
    name = _normalize_name(str(data.get("name","")))
    if not name:
        raise ValueError("Nome do treino é obrigatorio")
    
    exercise_ids = _normalize_exercise_ids(data.get("exercise_ids"))
    
    now = now_iso()
    
    payload = {
        "owner_username": owner_username,
        "name": name,
        "exercise_ids": exercise_ids, #lista de ids do dataset
        "exercise_count": len(exercise_ids),
        "created_at": now,
        "updated_at": now,
    }
    
    #cria um doc com id auto
    ref = _workouts_collection(db).document()
    ref.set(payload)
    
    created = payload.copy()
    created["id"] = ref.id 
    return created

def list_workouts(db, owner_username: str, limit: int = 50) -> List[Dict[str, Any]]: 
    #Lista os treinos do utilizador por ordem do updated_at (mais recentes)
    if not owner_username or not str(owner_username).strip():
        raise ValueError("owner_username inválido")
    
    if limit < 1:
        limit = 1
    if limit > 100:
        limit = 100
        
    query = (
        _workouts_collection(db)
        .where("owner_username","==", owner_username)
        .order_by("updated_at", direction="DESCENDING")
        .limit(limit)
    )
    
    docs = query.stream()
    return[_doc_to_workout(d) for d in docs]

def _get_workout(db, owner_username: str, workout_id: str) -> Optional[Dict[str, Any]]: 
    #Helper interno: vai buscar 1 treino especifico e verifica se pertence ao user
    if not workout_id or not str(workout_id).strip():
        raise ValueError("workout_id inválido")
    
    ref = _workouts_collection(db).document(str(workout_id))
    snap = ref.get()
    
    if not snap.exists:
        return None
    
    data = _doc_to_workout(snap)
    
     # por segurança não deixas ir buscar treinos de outra pessoa
    if data.get("owner_username") != owner_username:
        return None
    
    return data

def update_workout(db, owner_username: str, workout_id: str, data: Dict[str,Any]) -> Optional[Dict[str, Any]]:
    #Atualiza nome e exercise_ids
    
    current = _get_workout(db, owner_username, workout_id)
    if current is None:
        return None
    
    updates: Dict[str, Any] = {}
    
    
    if "name" in data:
        new_name = _normalize_name(str(data.get("name", "")))
        if not new_name:
            raise ValueError("Nome do treino não pode ficar vazio")
        updates["name"] = new_name

    if "exercise_ids" in data:
        normalized_ids = _normalize_exercise_ids(data.get("exercise_ids"))
        updates["exercise_ids"] = normalized_ids
        updates["exercise_count"] = len(normalized_ids)

    if not updates:
        return current

    updates["updated_at"] = now_iso()

    ref = _workouts_collection(db).document(str(workout_id))
    ref.update(updates)

    # devolve treino já atualizado
    merged = current.copy()
    merged.update(updates)
    merged["id"] = workout_id
    return merged

def delete_workout(db, owner_username: str, workout_id: str) -> bool:
    current = _get_workout(db, owner_username, workout_id)
    if current is None:
        return False
    
    ref = _workouts_collection(db).document(str(workout_id))
    ref.delete()
    return True