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
    doc_ref.set(user_data) #Adiciona a DB Firebase
    
    return user_data