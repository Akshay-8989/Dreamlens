from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import traceback

from app import models, schemas, database

router = APIRouter()

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/dreams", response_model=schemas.DreamOut)
def create_dream(dream: schemas.DreamCreate, db: Session = Depends(get_db)):
    try:
        db_dream = models.Dream(
            excerpt=dream.excerpt,
            symbols=",".join(dream.symbols),
            emotions=",".join(dream.emotions),
        )
        db.add(db_dream)
        db.commit()
        db.refresh(db_dream)

        # Convert back to lists for response
        db_dream.symbols = db_dream.symbols.split(",") if db_dream.symbols else []
        db_dream.emotions = db_dream.emotions.split(",") if db_dream.emotions else []

        return db_dream
    except Exception:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail="Internal Server Error")

@router.get("/dreams", response_model=List[schemas.DreamOut])
def read_dreams(db: Session = Depends(get_db)):
    dreams = db.query(models.Dream).all()
    for dream in dreams:
        dream.symbols = dream.symbols.split(",") if dream.symbols else []
        dream.emotions = dream.emotions.split(",") if dream.emotions else []
    return dreams

@router.get("/dreams/{dream_id}", response_model=schemas.DreamOut)
def read_dream(dream_id: int, db: Session = Depends(get_db)):
    dream = db.query(models.Dream).filter(models.Dream.id == dream_id).first()
    if not dream:
        raise HTTPException(status_code=404, detail="Dream not found")
    dream.symbols = dream.symbols.split(",") if dream.symbols else []
    dream.emotions = dream.emotions.split(",") if dream.emotions else []
    return dream
