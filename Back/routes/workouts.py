from fastapi import APIRouter, Depends, HTTPException, Query, status
from core.firebase_utils import get_db
from utils.jwt_utils import oauth2_scheme, verify_access_token
from models.workout_model import WorkoutCreate, WorkoutUpdate, WorkoutDetail
from services.workouts_service import ( create_workout, list_workouts, update_workout, delete_workout)

router = APIRouter()

@router.post("/", response_model=WorkoutDetail, status_code=status.HTTP_201_CREATED)
def create_workout_route( payload: WorkoutCreate, token: str = Depends(oauth2_scheme),): 
    #Cria um treino novo para um user autenticado
    owner_username = verify_access_token(token)
    db = get_db()
    
    try:
        created = create_workout(db, owner_username, payload.model_dump())
        return created
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception:
        raise HTTPException(status_code=500, detail="Erro interno ao criar treino")
    
@router.get("/", response_model=list[WorkoutDetail])
def list_workouts_route(limit: int = Query(default=50, ge=1, le=100), token: str = Depends(oauth2_scheme)):
    owner_username = verify_access_token(token)
    db = get_db()
    
    try:
        workouts = list_workouts(db, owner_username, limit=limit)
        return workouts
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception:
        raise HTTPException(status_code=500, detail="Erro interno ao listar treinos")

@router.put("/{workout_id}", response_model=WorkoutDetail)
def update_workout_route(workout_id: str, payload: WorkoutUpdate, token: str = Depends(oauth2_scheme)):
    #Atualiza o nome e os exercicios de um treino
    
    owner_username = verify_access_token(token)
    db = get_db()
    
    try:
        updated = update_workout(db, owner_username, workout_id, payload.model_dump(exclude_none=True))
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception:
        raise HTTPException(status_code=500, detail="Erro interno ao atualizar treino")
    
    if updated is None:
        raise HTTPException(status_code=404, detail="Treino não encontrado")
    
    return updated

@router.delete("/{workout_id}",status_code=status.HTTP_204_NO_CONTENT)
def delete_workout_route(workout_id: str, token: str = Depends(oauth2_scheme)):
    owner_username = verify_access_token(token)
    db = get_db()
    
    try:
        deleted = delete_workout(db, owner_username, workout_id)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception:
        raise HTTPException(status_code=500, detail="Erro interno ao apagar treino")
    
    if not deleted:
        raise HTTPException(status_code=404, detail="treino não encontrado")
    
    return None