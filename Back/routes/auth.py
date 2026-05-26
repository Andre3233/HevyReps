from fastapi import APIRouter, HTTPException
from jose import jwt, JWTError
from datetime import timedelta
from utils.jwt_utils import SECRET_KEY, ALGORITHM, create_access_token
from pydantic import BaseModel

router = APIRouter()

class RefreshRequest(BaseModel):
    refresh_token: str

@router.post("/refresh-token")
def refresh_token_endpoint(body: RefreshRequest):
    refresh_token = body.refresh_token

    try:
        payload = jwt.decode(refresh_token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")

        if payload.get("type") != "refresh":
            raise HTTPException(status_code=401, detail="Tipo de token inválido")

        if not user_id:
            raise HTTPException(status_code=401, detail="Token inválido")

    except JWTError:
        raise HTTPException(status_code=401, detail="Token inválido")

    new_access_token = create_access_token(
        {"sub": user_id},
    )
    return {"access_token": new_access_token, "token_type": "bearer"}