# cd Back
# uvicorn main:app --reload
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.user import router as user_router 
from core.firebase import initialize_firebase
from routes.login import router as login_router

app = FastAPI()

origins = [
    "http://localhost:19006",
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials = True,
    allow_methods=["*"],
    allow_headers=["*"],
)

initialize_firebase()

app.include_router(user_router, prefix="/user", tags=["User"])
app.include_router(login_router, prefix="/login", tags=["Login"])    

@app.get("/")
def root():
    return {"status": "ok"}

