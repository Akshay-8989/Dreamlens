# app/main.py

from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai
import os
from typing import Optional, List # Import Optional and List

# --- Database Setup Placeholder ---
# You need to replace this with your actual database setup (e.g., SQLAlchemy, Pydantic with database support)
# This is a MINIMAL example of how a Dream model might look.
# If you're using SQLAlchemy, you'd have a database session dependency injected here.

# Mock Dream model for demonstration (replace with your actual ORM model)
class Dream(BaseModel):
    id: Optional[int] = None
    title: Optional[str] = None
    content: str
    excerpt: Optional[str] = None
    symbols: Optional[List[str]] = []
    emotions: Optional[List[str]] = []
    themes: Optional[List[str]] = []
    created_at: Optional[str] = None # Or datetime object
    enhanced_content: Optional[str] = None # <<< NEW FIELD FOR AI ENHANCEMENT

# In-memory mock database (replace with your actual database operations)
mock_db = {
    11: Dream(id=11, title="Flying dream", content="I was flying over mountains, feeling free.", created_at="2023-01-15T10:00:00Z"),
    12: Dream(id=12, title="Lost in a maze", content="I was lost in a dark maze, feeling anxious.", created_at="2023-01-16T11:00:00Z"),
    # Add more mock dreams or connect to your actual DB
}
next_dream_id = 13 # For mock DB


# --- FastAPI App Setup ---
app = FastAPI()

# CORS middleware to allow requests from your frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Allow your Vite development server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Gemini API Configuration ---
# Ensure your GOOGLE_API_KEY environment variable is set before running uvicorn
# Example: $env:GOOGLE_API_KEY="YOUR_API_KEY" (PowerShell) or export GOOGLE_API_KEY="YOUR_API_KEY" (Bash)
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# Initialize the Gemini model with the correct name
# This is the corrected line:
gemini_model = genai.GenerativeModel('gemini-1.5-flash')

# --- Routes ---

# Example endpoint for fetching dreams (similar to what you already have)
@app.get("/dreams", response_model=List[Dream])
async def read_dreams():
    return list(mock_db.values())

# Example endpoint for creating dreams (similar to what you already have)
@app.post("/dreams", response_model=Dream)
async def create_dream(dream: Dream):
    global next_dream_id
    dream.id = next_dream_id
    dream.created_at = dream.created_at or "2024-01-01T00:00:00Z" # Default if not provided
    dream.excerpt = dream.content[:100] + "..." if len(dream.content) > 100 else dream.content
    mock_db[dream.id] = dream
    next_dream_id += 1
    return dream

# --- NEW: AI Dream Enhancement Endpoint ---
@app.post("/dreams/{dream_id}/enhance", response_model=dict) # Response model can be more specific
async def enhance_dream(dream_id: int):
    # 1. Fetch the dream from your database
    # This is placeholder logic. Replace with your actual DB query.
    dream_entry = mock_db.get(dream_id) # Using mock_db for example
    if not dream_entry:
        raise HTTPException(status_code=404, detail="Dream not found")

    if dream_entry.enhanced_content:
        # Optional: Return existing enhanced content if already present
        return {"message": "Dream already enhanced", "enhanced_content": dream_entry.enhanced_content}


    # 2. Prepare the prompt for the Gemini API
    # Tailor this prompt to get the kind of analysis you want
    prompt_text = f"""Re-imagine and beautifully enhance the following dream into a simple, positive, and magical story.
    **Strictly build upon the core elements already present in the dream content.** Do not introduce entirely new, unrelated fantastical creatures or scenarios.
    Expand upon the dream's events, suggesting wonderful things that could have happened or continued, making it feel joyful and memorable.
    Use clear, understandable language, like telling a captivating dream story. Avoid overly complex or "buzz" words.
    Describe the enhanced dream experience in a flowing, imaginative paragraph, ensuring the overall tone is uplifting and happy.
    Keep the enhanced description concise but vivid, around 150-200 words.

    Dream Title: {dream_entry.title or 'N/A'}
    Dream Content: {dream_entry.content}
    """

    try:
        # 3. Call the Gemini API
        response = gemini_model.generate_content(prompt_text)
        enhanced_content = response.text

        # 4. Save the enhanced content back to your database
        # This is placeholder logic. Replace with your actual DB update.
        dream_entry.enhanced_content = enhanced_content
        mock_db[dream_id] = dream_entry # Update in mock_db

        return {"message": "Dream enhanced successfully", "enhanced_content": enhanced_content}

    except Exception as e:
        print(f"Error calling Gemini API for dream {dream_id}: {e}")
        # Log the full traceback if needed for debugging
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Failed to enhance dream with AI: {e}")

# If you have other endpoints, keep them below