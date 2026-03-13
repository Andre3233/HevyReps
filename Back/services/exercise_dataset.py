import os
import json
import urllib.request
from typing import Any, Dict, List,Optional

# URL do dataset
DATASET_URL = "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json"
# Base para imagens via GitHub raw
IMAGE_BASE_RAW = "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/"
# Caminho local onde o dataset vai ficar guardado
DATASET_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "exercises.json")

LOADED = False
DATA: List[Dict[str, Any]] = []
BY_ID: Dict[str, Dict[str, Any]] = {}

def ensure_dataset() -> None: #Garante que os ficheiros estão no disco
    os.makedirs(os.path.dirname(DATASET_PATH), exist_ok=True)
    
    if os.path.exists(DATASET_PATH): #Evita downloads repetidos
        try:
            #Tamanho mínimo (evita ficheiro vazio/incompleto)
            if os.path.getsize(DATASET_PATH) < 1000:
                os.remove(DATASET_PATH)
            else:
                #Tamanho mínimo (evita ficheiro vazio/incompleto)
                with open(DATASET_PATH, "r", encoding="utf-8") as f:
                    first = f.read(1)
                if first in ("[", "{"):
                    return
                else:
                    os.remove(DATASET_PATH)
        except Exception:
            os.remove(DATASET_PATH)
                
    try:
        urllib.request.urlretrieve(DATASET_URL, DATASET_PATH) #Faz o download e guarda
    except Exception as e:
        raise RuntimeError(f"Falha a fazer download do dataset: {e}")
    
def load_dataset() -> None:
    global LOADED, DATA, BY_ID
    
    if LOADED:
        return
    
    ensure_dataset()
    
    with open(DATASET_PATH, "r", encoding="utf-8") as f:
        DATA = json.load(f)
        
    BY_ID = {}
    for item in DATA:
        if "id" in item:
            BY_ID[str(item["id"])] = item
            
    LOADED = True
    
def build_frames(raw_item: Dict[str, Any]) -> List[str]:
    """
    Constrói URLs completos para as imagens (frames) com base no campo 'images'.
    O dataset normalmente traz paths relativos tipo 'Some_Exercise/0.jpg'.
    """
    images = raw_item.get("images") or []
    frames: List[str] = []
    for rel in images:
        rel = str(rel).lstrip("/")
        frames.append(IMAGE_BASE_RAW + rel)
    return frames

def list_exercises(search: Optional[str] = None, limit: int = 30, offset: int = 0) -> Dict[str, Any]:
    load_dataset()
    
    results = DATA
    
    if search:
        s = search.strip().lower()
        if s: 
            results = [e for e in results if s in str(e.get("name","")).lower()]
        
    total_count = len(results) #Guarda o total antes do corte
        
    paginated_results = results[offset: offset + limit] #limita para não devolver milhares de exercicios e ex. repetidos
    
    items = []
    for e in paginated_results:
        primary = (e.get("primaryMuscles") or [""])[0]
        secondary = e.get("secondaryMuscles") or []
        items.append({
            "id": str(e.get("id")),
            "name": str(e.get("name", "")),
            "primary_muscle": str(primary),
            "secondary_muscles": [str(x) for x in secondary],
            "frames": build_frames(e),
        })
    return{
        "items": items,
        "total": total_count,
    }
    
def get_exercise(exercise_id: str) -> Optional[Dict[str, Any]]: #Devolve detalhes de um exercicio po id
    load_dataset()
    
    raw = BY_ID.get(str(exercise_id))
    if not raw:
        return None
    
    primary = (raw.get("primaryMuscles") or [""])[0]
    secondary = raw.get("secondaryMuscles") or []
    instructions = raw.get("instructions") or []
    if isinstance(instructions, str):
        instructions = [instructions]
    elif not isinstance(instructions, list):
        instructions = []
    equipment = raw.get("equipment")
    body_part = raw.get("bodyPart")
    
    return{
        "id": str(raw.get("id")),
        "name": str(raw.get("name", "")),
        "primary_muscle": str(primary),
        "secondary_muscles": [str(x) for x in secondary],
        "frames": build_frames(raw),
        "instructions": [str(x) for x in instructions],
        "equipment": equipment,
        "body_part": body_part,
    }

