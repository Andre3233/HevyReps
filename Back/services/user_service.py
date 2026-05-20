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

def get_user_stats(db, owner_username: str) -> dict:
    # 1. Busca dados do utilizador na coleção users
    users_ref = db.collection("users")
    user_query = users_ref.where("username", "==", owner_username).limit(1)
    user_docs = list(user_query.stream())
    
    if not user_docs:
        raise ValueError("Utilizador não encontrado")
    
    user_data = user_docs[0].to_dict()
    
    # 2. Conta workouts do utilizador
    workout_history_ref = db.collection("workout_history")
    query = workout_history_ref.where("owner_username", "==", owner_username)
    workouts = list(query.stream())
    total_workouts = len(workouts)
    
    # 3. Retorna tudo junto
    return {
        "username": user_data.get("username"),
        "email": user_data.get("email"),
        "profile_image_url": user_data.get("profile_image_url"),
        "total_workouts": total_workouts
    }