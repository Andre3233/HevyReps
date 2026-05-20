from fastapi import APIRouter, HTTPException, status, Depends
from models.user_model import UserCreate 
from utils.security import hash_password # Função do hasher da pass
from services.user_service import create_user, get_user_stats
from utils.jwt_utils import oauth2_scheme, verify_access_token
from core.firebase_utils import get_db
from core.firebase_utils import get_db
router = APIRouter() #Server modular
from services.user_service import create_user, get_user_stats

@router.post("/register", status_code=status.HTTP_201_CREATED)
def register(user: UserCreate): # Enspoint para criar um novo utilizador
    hashed_password = hash_password(user.password) #Criar hash

    try:
        #Criar user para o Firebase
        new_user = create_user(
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
    
@router.get("/stats")
def get_user_stats_route(token: str = Depends(oauth2_scheme)):
    owner_username = verify_access_token(token)
    db = get_db()
    
    try:
        stats = get_user_stats(db, owner_username)
        return stats
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao obter estatísticas: {str(e)}")