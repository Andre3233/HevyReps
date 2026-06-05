from fastapi import APIRouter, HTTPException, status, Depends
from models.user_model import UserCreate, UpdatePasswordRequest
from utils.security import hash_password # Função do hasher da pass
from services.user_service import create_user, get_user_stats, delete_user, update_username, update_password, update_profile_image
from utils.jwt_utils import oauth2_scheme, verify_access_token
from core.firebase_utils import get_db

router = APIRouter() #Server modular

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
    owner_id = verify_access_token(token)
    db = get_db()
    
    try:
        stats = get_user_stats(db, owner_id)
        return stats
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao obter estatísticas: {str(e)}")

@router.delete("/delete")
def delete_user_route(token: str = Depends(oauth2_scheme)):
    user_id = verify_access_token(token)
    db = get_db()

    try:
        delete_user(db, user_id)
        return {
            "success": True,
            "message": "Conta apagada com sucesso"
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

@router.put("/username")
def update_username_route(
    body: dict,
    token: str = Depends(oauth2_scheme)
):
    user_id = verify_access_token(token)
    db = get_db()

    username = body.get("username")

    if not username:
        raise HTTPException(status_code=400, detail="Username inválido")

    try:
        updated = update_username(db, user_id, username)

        return {
            "success": True,
            "data": {
                "username": updated
            }
        }

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@router.put("/password")
def update_password_route(
    body: UpdatePasswordRequest,
    token: str = Depends(oauth2_scheme)
):
    user_id = verify_access_token(token)
    db = get_db()

    try:
        hashed = hash_password(body.password)
        update_password(db, user_id, hashed)
        return {"success": True, "message": "Password atualizada"}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/ImgProfile")
def update_profile_image_route(body: dict, token: str = Depends(oauth2_scheme)):
    user_id = verify_access_token(token)
    db = get_db()
    profile_image_url = body.get("profile_image_url")
    
    if not profile_image_url:
        raise HTTPException(status_code=400, detail="profile_image_url inválida")
    
    try:
        update_profile_image(db, user_id, profile_image_url)
        return {"success": True, "message": "updated"}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    