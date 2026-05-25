import os
import json
import urllib.request
from typing import Any, Dict, List,Optional
from services.translation_service import translate_to_english, translate_to_portuguese, translate_list_to_portuguese

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
            # Traduzir pesquisa de PT→EN antes de procurar
            s_translated = translate_to_english(s)
            results = [e for e in results if s_translated in str(e.get("name","")).lower()]
        
    total_count = len(results)
        
    paginated_results = results[offset: offset + limit]
    
    items = []
    for e in paginated_results:
        primary = (e.get("primaryMuscles") or [""])[0]
        
        # Traduzir nome e músculos para PT
        name_en = str(e.get("name", ""))
        name_pt = translate_to_portuguese(name_en)
        
        primary_pt = translate_to_portuguese(str(primary))
        
        items.append({
            "id": str(e.get("id")),
            "name": name_pt,
            "primary_muscle": primary_pt,
            "frames": build_frames(e),
        })
    
    return {
        "items": items,
        "total": total_count,
    }
    
def get_exercise(exercise_id: str) -> Optional[Dict[str, Any]]:
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
    
    # Traduzir todos os campos para português
    name_en = str(raw.get("name", ""))
    name_pt = translate_to_portuguese(name_en)
    
    primary_pt = translate_to_portuguese(str(primary))
    secondary_pt = [translate_to_portuguese(str(x)) for x in secondary]
    
    instructions_en = [str(x) for x in instructions]
    instructions_pt = translate_list_to_portuguese(instructions_en)

    
    equipment_pt = translate_to_portuguese(str(equipment)) if equipment else None
    body_part_pt = translate_to_portuguese(str(body_part)) if body_part else None
    
    return {
        "id": str(raw.get("id")),
        "name": name_pt,
        "primary_muscle": primary_pt,
        "secondary_muscles": secondary_pt,
        "frames": build_frames(raw),
        "instructions": instructions_pt,
        "equipment": equipment_pt,
        "body_part": body_part_pt,
    }
