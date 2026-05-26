from typing import Optional
from datetime import timezone, datetime
from core.firebase_utils import get_db

def create_user(username: str, email: str, password_hash: str, profile_image_url: Optional[str] = None) -> dict:
    db = get_db()
    user_ref = db.collection("users")
    
    #Validações de unicidade de username e email
    existing_user = user_ref.where("username", "==", username).limit(1).get()
    if existing_user:
        raise ValueError("Nome de utilizador já existe")
    
    existing_email = user_ref.where("email", "==", email).limit(1).get()
    if existing_email:
        raise ValueError("Este email já esta a ser usado")
    
    #Criação de documento 
    doc_ref = user_ref.document()
    user_data = {
        "id": doc_ref.id,
        "username": username,
        "email": email,
        "password_hash": password_hash,
        "profile_image_url": profile_image_url,
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    doc_ref.set(user_data)
    
    return user_data

def get_user_stats(db, owner_id: str) -> dict:
    # 1. Busca dados do utilizador na coleção users
    users_ref = db.collection("users")
    user_doc = users_ref.document(owner_id).get()
    
    if not user_doc.exists:
        raise ValueError("Utilizador não encontrado")
    
    user_data = user_doc.to_dict()
    
    # 2. Conta workouts do utilizador
    workout_history_ref = db.collection("workout_history")
    query = workout_history_ref.where("owner_id", "==", owner_id)
    workouts = list(query.stream())
    total_workouts = len(workouts)
    
    # 3. Retorna tudo junto
    return {
        "username": user_data.get("username"),
        "email": user_data.get("email"),
        "profile_image_url": user_data.get("profile_image_url"),
        "total_workouts": total_workouts
    }