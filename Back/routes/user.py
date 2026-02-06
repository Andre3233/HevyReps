from fastapi import APIRouter, HTTPException, status
from models.user_model import UserCreate 
from utils.security import hash_password # Função do hasher da pass
from core.firebase_utils import create_user_safe

router = APIRouter() #Server modular

@router.post("/register", status_code=status.HTTP_201_CREATED)
def register(user: UserCreate): # Enspoint para criar um novo utilizador
    hashed_password = hash_password(user.password) #Criar hash

    try:
        #Criar user para o Firebase
        new_user = create_user_safe(
            username=user.username,
            email=user.email,
            password_hash=hashed_password,
            profile_image_url=user.profile_image_url
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


    #Manta a resposta para o front
    return{
        "success": True,
        "message": "Conta criada com sucesso",
        "data":{
            "username": new_user["username"],
            "email": new_user["email"],
            "profile_image_url": new_user["profile_image_url"]
        }
    }