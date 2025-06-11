from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import os # Import os for environment variables

# Import the generative AI library
import google.generativeai as genai

from app import models, database, schemas

app = FastAPI(
    title="DreamLens API",
    description="Backend for capturing and analyzing dreams",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], # Be specific, not "*"
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure Gemini API
# Ensure GOOGLE_API_KEY environment variable is set
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# Choose a model. gemini-pro was used, but it's now deprecated or regionally unavailable for direct use.
# 'gemini-1.5-flash' is a fast and cost-effective option for many text tasks.
# 'gemini-1.0-pro' is another robust option.
# You can check available models via genai.list_models() if needed.
gemini_model = genai.GenerativeModel('gemini-1.5-flash') # <-- CORRECTED MODEL NAME

# Create DB tables
models.Base.metadata.create_all(bind=database.engine)

# Dependency
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/dreams", response_model=schemas.DreamOut)
def create_dream(dream: schemas.DreamCreate, db: Session = Depends(get_db)):
    db_dream = models.Dream(
        excerpt=dream.excerpt,
        symbols=",".join(dream.symbols),
        emotions=",".join(dream.emotions)
    )
    db.add(db_dream)
    db.commit()
    db.refresh(db_dream)
    return {
        "id": db_dream.id,
        "excerpt": db_dream.excerpt,
        "symbols": db_dream.symbols.split(",") if db_dream.symbols else [],
        "emotions": db_dream.emotions.split(",") if db_dream.emotions else [],
        "created_at": db_dream.created_at
    }

@app.get("/dreams", response_model=list[schemas.DreamOut])
def get_dreams(db: Session = Depends(get_db)):
    dreams = db.query(models.Dream).all()
    return [
        {
            "id": d.id,
            "excerpt": d.excerpt,
            "symbols": d.symbols.split(",") if d.symbols else [],
            "emotions": d.emotions.split(",") if d.emotions else [],
            "created_at": d.created_at
        }
        for d in dreams
    ]

# --- NEW ENDPOINT FOR DREAM ENHANCEMENT ---
@app.post("/dreams/{dream_id}/enhance")
async def enhance_dream(dream_id: int, db: Session = Depends(get_db)):
    # 1. Fetch the original dream
    db_dream = db.query(models.Dream).filter(models.Dream.id == dream_id).first()
    if not db_dream:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Dream not found")

    original_dream_text = db_dream.excerpt

    # 2. Craft a prompt for the LLM
    prompt = (
        f"You are a dream enhancement AI. Your goal is to take a user's dream "
        f"excerpt and enhance it to be more vivid, pleasant, slightly magical, "
        f"and rich in sensory details. Focus on positive imagery and gentle expansions. "
        f"Do not drastically change the core events or add new plot points. "
        f"Keep the enhanced version concise, around 100-150 words. "
        f"If the dream is negative, gently steer it towards a more hopeful or serene tone without denying its original content. "
        f"Original dream excerpt: '{original_dream_text}'"
        f"\n\nEnhanced Dream:"
    )

    # 3. Call the LLM (Asynchronous call for better performance)
    try:
        response = await gemini_model.generate_content_async(
            contents=[prompt],
            generation_config=genai.GenerationConfig(
                temperature=0.9, # Higher temperature for more creativity
                max_output_tokens=200 # Roughly 150 words, gives some buffer
            )
        )
        enhanced_text = response.text.strip() # Access the generated text

    except Exception as e:
        print(f"Error calling Gemini API: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"Failed to enhance dream: {str(e)}")

    # 4. Return the enhanced text along with original dream details
    return {
        "id": db_dream.id,
        "excerpt": enhanced_text, # This is the enhanced text
        "symbols": db_dream.symbols.split(",") if db_dream.symbols else [],
        "emotions": db_dream.emotions.split(",") if db_dream.emotions else [],
        "created_at": db_dream.created_at,
    }