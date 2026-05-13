from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime, UTC

class CompletedExerciseSet(BaseModel):
    repetitions: int
    weight: float
    
class WorkoutHistoryExercise(BaseModel):
    id: str
    name: str
    exercise_sets: list[CompletedExerciseSet]

class WorkoutHistoryCreate(BaseModel): #Recebe os dados do Frontend
    sessionId: str #ID da sessão do treino 
    workoutId: str #Id do treino em sí
    name: str
    startTime: datetime
    endTime: datetime
    exercises: list[WorkoutHistoryExercise]
    
class WorkoutHistoryDetail(BaseModel): #Molde final dos dados para guardar
    id: str
    sessionId: str #ID da sessão do treino 
    workoutId: str #Id do treino em sí
    owner_username: str
    name: str
    startTime: datetime
    endTime: datetime
    exercises: list[WorkoutHistoryExercise]
    totalVolume: float
    totalSets: int
    duration: int  # segundos
    created_at: str 
    