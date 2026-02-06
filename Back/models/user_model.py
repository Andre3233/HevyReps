from pydantic import BaseModel,  EmailStr, Field
from pydantic.functional_validators import field_validator
from typing import Optional
import re

USERNAME_REGEX = re.compile(r"^[\w.]+$", re.UNICODE) #Regex para validar os caracteres premitidos no nome de utilizador
PASSWORD_REGEX = re.compile(r"^[A-Za-z0-9_!@#$%^&*()|+=.?]+$") #Regex para validar os caracteres premitidos na pass

class UserCreate(BaseModel):
    username: str = Field(min_length=3, max_length=20)
    email: EmailStr
    password: str = Field(min_length = 6)
    profile_image_url: Optional[str] = Field(default=None, description="URL opcional da foto de perfil")

    @field_validator("username")
    @classmethod
    def user_NoEmojis(cls, value: str) -> str:
        if not USERNAME_REGEX.match(value):
            raise ValueError("O username só pode ter letras, números, '_' ou '.'")
        return value
    
    @field_validator("password")
    @classmethod
    def password_NOEmojis(cls, value: str) -> str:
        if not PASSWORD_REGEX.fullmatch(value):
            raise ValueError("A password contém caracteres inválidos. Só são permitidos a-z, A-Z, 0-9, _, ! @ # $ % ^ & * ( ) | + = . ?")
        return value