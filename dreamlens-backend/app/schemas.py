from pydantic import BaseModel
from typing import List
from datetime import datetime


class DreamCreate(BaseModel):
    excerpt: str
    symbols: List[str]
    emotions: List[str]


class DreamOut(DreamCreate):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True  # replaces orm_mode in Pydantic v2
