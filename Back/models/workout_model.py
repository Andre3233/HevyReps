from pydantic import BaseModel, Field
from typing import List, Optional

class WorkoutCreate(BaseModel):
    name: str = Field(min_length=1, max_length=40)
    exercise_ids: List[str] = Field(default_factory=list)
    
class WorkoutUpdate(BaseModel):  # usado para atualizar nome e/ou lista de exercícios
    name: Optional[str] = Field(default=None, min_length=1, max_length=40)
    exercise_ids: Optional[List[str]] = None
    
class WorkoutDetail(BaseModel): # usado para devolver treinos ao Front já com informação suficiente
    id: str
    name: str
    exercise_ids: List[str] = Field(default_factory=list)
    exercise_count: int = 0
    created_at: Optional[str] = None
    updated_at: Optional[str] = None
    