from pydantic import BaseModel, Field
from typing import List, Optional

class ExerciseListItem(BaseModel):
    id: str
    name: str
    primary_muscle: str
    secondary_muscles: List[str] = Field(default_factory=list)
    # URLs completos para o Front usar diretamente (0.jpg e 1.jpg)
    frames: List[str] = Field(default_factory=list)
    
class ExerciseDetail(ExerciseListItem):
    instructions: List[str] = Field(default_factory=list)
    equipment: Optional[str] = None
    body_part: Optional[str] = None #Parte do corpo trabalhada
    
class ExerciseListResponse(BaseModel):
    items: List[ExerciseListItem]
    total: int = 0