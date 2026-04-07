from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.user import router as user_router
from routes.login import router as login_router
from routes.auth import router as auth_router
from routes.protected import router as protected_router
from routes.exercises import router as exercises_router
from core.firebase import initialize_firebase
from services.exercise_dataset import ensure_dataset
from routes.workouts import router as workouts
from contextlib import asynccontextmanager
 
@asynccontextmanager
async def lifespan(app: FastAPI):
    initialize_firebase()
    ensure_dataset()
    yield
    
app = FastAPI(lifespan=lifespan)

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

app.include_router(user_router, prefix="/user", tags=["User"])
app.include_router(login_router, prefix="/login", tags=["Login"])
app.include_router(auth_router, prefix="/auth", tags=["Auth"])
app.include_router(protected_router, prefix="/protected", tags=["Protected"])
app.include_router(exercises_router, prefix="/exercises", tags=["Exercises"])
app.include_router(workouts, prefix="/workouts", tags=["Workouts"])
@app.get("/")
def root():
    return {"status": "ok"}

