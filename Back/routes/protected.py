from fastapi import APIRouter, Depends
from utils.jwt_utils import oauth2_scheme, verify_access_token

router = APIRouter()

@router.get("/protected")
def protected_route(token: str = Depends(oauth2_scheme)):
    username = verify_access_token(token)
    return {
        "status": "Token válido",
        "username": username
    }