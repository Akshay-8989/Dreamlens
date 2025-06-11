from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from app.database import Base

class Dream(Base):
    __tablename__ = "dreams"

    id = Column(Integer, primary_key=True, index=True)
    excerpt = Column(String)
    symbols = Column(String)  # comma-separated
    emotions = Column(String)  # comma-separated
    created_at = Column(DateTime, default=datetime.utcnow)
