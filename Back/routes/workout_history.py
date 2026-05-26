from fastapi import APIRouter, Depends, HTTPException, Query, status
from core.firebase_utils import get_db
from utils.jwt_utils import oauth2_scheme, verify_access_token
from models.workout_history_model import WorkoutHistoryCreate, WorkoutHistoryDetail
from services.workout_history import (create_workout_history, list_workout_history, delete_workout_history)

router = APIRouter()

@router.post("/", response_model=WorkoutHistoryDetail, status_code=status.HTTP_201_CREATED)
def create_workout_history_route(
    payload: WorkoutHistoryCreate, 
    token: str = Depends(oauth2_scheme)
): 
    owner_id = verify_access_token(token)
    db = get_db()
    
    try:
        created = create_workout_history(db, owner_id, payload.model_dump())
        return created
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception:
        raise HTTPException(status_code=500, detail="Erro interno ao guardar histórico")
    
@router.get("/", response_model=list[WorkoutHistoryDetail])
def list_workout_history_route(
    limit: int = Query(default=50, ge=1, le=100), 
    token: str = Depends(oauth2_scheme)
):
    owner_id = verify_access_token(token)
    db = get_db()
    
    try:
        history = list_workout_history(db, owner_id, limit=limit)
        return history
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception: 
        raise HTTPException(status_code=500, detail="Erro interno ao listar histórico")
    
@router.delete("/{workout_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_workout_history_route(
    workout_id: str, 
    token: str = Depends(oauth2_scheme)
):
    owner_id = verify_access_token(token)
    db = get_db()
    
    try:
        deleted = delete_workout_history(db, owner_id, workout_id)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception:
        raise HTTPException(status_code=500, detail="Erro interno ao apagar histórico")
    
    if not deleted:
        raise HTTPException(status_code=404, detail="Histórico não encontrado")
    
    return None
