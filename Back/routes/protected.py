from fastapi import APIRouter, Depends
from utils.jwt_utils import oauth2_scheme, verify_access_token

router = APIRouter()

@router.get("/")
def protected_route(token: str = Depends(oauth2_scheme)):
    user_id = verify_access_token(token)
    return {
        "status": "Token válido",
        "user_id": user_id
    }