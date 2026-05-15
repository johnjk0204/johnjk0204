from fastapi import FastAPI, Depends, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import Optional, List
from database import engine, get_db
import models
from schemas import FeedbackResponse, StatsResponse
from routers import feedback
import crud

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Feedback Management System", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(feedback.router)


@app.get("/search", response_model=List[FeedbackResponse], tags=["Search"])
def search_feedback(
    keyword: Optional[str] = Query(None, description="Search in name, program, comments"),
    rating: Optional[int] = Query(None, ge=1, le=5, description="Filter by exact rating"),
    program: Optional[str] = Query(None, description="Filter by program name"),
    db: Session = Depends(get_db),
):
    return crud.search_feedback(db, keyword=keyword, rating=rating, program=program)


@app.get("/stats", response_model=StatsResponse, tags=["Dashboard"])
def get_stats(db: Session = Depends(get_db)):
    return crud.get_stats(db)


@app.get("/", tags=["Health"])
def root():
    return {"message": "Feedback Management System API is running"}
