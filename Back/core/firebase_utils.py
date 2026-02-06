from firebase_admin import firestore
from typing import Optional

_db = None  # variável privada global para armazenar o cliente Firestore

def get_db():
    global _db
    if _db is None:
        _db = firestore.client()  #  aqui, após inicialização do Firebase
    return _db # Inicializa o firebase

def create_user_safe(username: str, email: str, password_hash: str, profile_image_url: Optional[str] = None) -> dict:
    db = get_db()
    users_ref = db.collection("users")

    #Verificar se user já existe na BD
    existing_user = users_ref.where("username", "==", username).limit(1).get()
    if existing_user:
        raise ValueError("Nome de utilizador já existe")
    
    #Verificar se email já existe na BD
    existing_email = users_ref.where("email", "==", email).limit(1).get()
    if existing_email:
        raise ValueError("Email já esta a ser usado ")
    
    #Criar documento ID automatico
    doc_ref = users_ref.document()
    user_data = {
        "username": username,
        "email": email,
        "password_hash": password_hash,
        "profile_image_url": profile_image_url
    }
    doc_ref.set(user_data) #Adiciona ao Firestore

    return user_data


#{
#    "username": "andre123",
#    "email": "andre@mail.com",
#    "password": "Test123!",
#    "profile_image_url": null
#}