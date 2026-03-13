from fastapi import APIRouter, HTTPException, Query
from typing import Optional
from models.exercise_model import ExerciseListResponse, ExerciseDetail
from services.exercise_dataset import list_exercises
from services.exercise_dataset import get_exercise

router = APIRouter()

@router.get("/", response_model=ExerciseListResponse)
def List_exercises(
    search: Optional[str] = Query(default=None, min_length=1, max_length=60),
    limit: int = Query(default=30, ge=1, le=60),
    offset: int = Query(default=0, ge=0)
):
    try:
        return list_exercises(search=search, limit=limit, offset=offset)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception:
        raise HTTPException(status_code=500, detail="Erro interno ao listar exercícios")
    
@router.get("/{exercise_id}", response_model=ExerciseDetail)
def Get_exercise(exercise_id: str):
    #Detalhe do exercicio por ID
    try:
        ex = get_exercise(exercise_id)
    except RuntimeError as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    if ex is None:
        raise HTTPException(status_code=404, detail="Exercício não encontrado")
    
    return ex