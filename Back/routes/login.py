from fastapi import APIRouter, HTTPException, status
from models.login_model import userLogin
from utils.security import verify_password
from utils.jwt_utils import create_access_token
from core.firebase_utils import get_db

router = APIRouter()

@router.post("/login")
def login(user: userLogin):
    db = get_db()
    identifier = user.identifier.strip()

    #Diferencia email de username
    if "@" in identifier: #Procura user por email
        user_query = db.collection("users").where("email", "==", identifier).limit(1).get()
    else: #Procura user pelo username
        user_query = db.collection("users").where("username", "==", identifier).get()
    if not user_query:
        raise HTTPException(status_code=401, detail="Credenciais inválidas")

    user_in_db = user_query[0].to_dict()
    if not verify_password(user.password, user_in_db["password_hash"]):
        raise HTTPException(status_code=401, detail="Credenciais inválidas")
    
    token = create_access_token({"sub": user_in_db["username"]})

    return {"access_token": token, "token_type": "bearer", "user": {
        "username": user_in_db["username"],
        "email": user_in_db["email"],
        "profile_image_url": user_in_db.get("profile_image_url")
    }}
