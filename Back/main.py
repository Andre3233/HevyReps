# cd Back
# C:/Users/André/Desktop/PAP/HevyReps/Back/venv/Scripts/Activate.ps1
# uvicorn main:app --reload --host 0.0.0.0 --port 8000
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.user import router as user_router 
from core.firebase import initialize_firebase
from routes.login import router as login_router
from routes.auth import router as auth_router
from routes.protected import router as protected_router

app = FastAPI()

origins = [
    "http://localhost:19006",
    "http://192.168.1.70:19006",
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
app.include_router(auth_router, prefix="/auth", tags=["Auth"])
app.include_router(protected_router, prefix="/protected", tags=["Protected"])

@app.get("/")
def root():
    return {"status": "ok"}

