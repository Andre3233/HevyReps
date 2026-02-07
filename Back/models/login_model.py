from pydantic import BaseModel

class userLogin(BaseModel):
    identifier: str #Pode ser o username ou email
    password: str