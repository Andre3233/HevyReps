# cd Back
# uvicorn main:app --reload
from fastapi import FastAPI
from routes.user import router as user_router 
from core.firebase import initialize_firebase

app = FastAPI()

initialize_firebase()

app.include_router(user_router, prefix="/user", tags=["User"])    

@app.get("/")
def root():
    return {"status": "ok"}

