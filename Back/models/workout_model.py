from pydantic import BaseModel, Field
from typing import List, Optional

class ExerciseSet(BaseModel): #Recebe os dados de um exercicio
    repetitions: Optional[int] = None
    weight: Optional[float] = None

class WorkoutExercises(BaseModel):
    id: str
    name: str
    exercise_sets: list[ExerciseSet]

class WorkoutCreate(BaseModel):
    name: str = Field(min_length=1, max_length=40)
    exercises: list[WorkoutExercises]
    
class WorkoutUpdate(BaseModel):  # usado para atualizar nome e/ou lista de exercícios
    name: Optional[str] = Field(default=None, min_length=1, max_length=40)
    exercises: Optional[list[WorkoutExercises]] = None
    
class WorkoutDetail(BaseModel): # usado para devolver treinos ao Front já com informação suficiente
    id: str
    name: str
    exercises: list[WorkoutExercises]
    exercise_count: int = 0
    created_at: Optional[str] = None
    updated_at: Optional[str] = None
    