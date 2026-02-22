from fastapi import APIRouter, HTTPException
from jose import jwt, JWTError              
from datetime import timedelta, datetime 
from utils.jwt_utils import SECRET_KEY, ALGORITHM, create_access_token

router = APIRouter()

@router.post("/refresh-token")
def refresh_token_endpoint(refresh_token: str):
    try:
        payload = jwt.decode(refresh_token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if not username:
            raise HTTPException(status_code=401, detail="Token inválido")
    except JWTError: 
        raise HTTPException(status_code=401, detail="Token invalido")
    
    new_access_token = create_access_token({"sub": username}, expires_delta=timedelta(hours=1))
    return {"access_token": new_access_token, "token_type": "bearer"}