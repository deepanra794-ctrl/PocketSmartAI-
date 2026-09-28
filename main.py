from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google import genai
import os

app = FastAPI(title="PocketSmart AI")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class BudgetRequest(BaseModel):
    category: str
    budget: float
    preferences: str = ""

@app.get("/")
def home():
    return {"message": "PocketSmart AI is running"}

@app.post("/recommend")
def recommend(data: BudgetRequest):
    api_key = os.getenv("GEMINI_API_KEY")
    model = os.getenv("GEMINI_MODEL")

    if not api_key or not model:
        return {"error": "API key or model is missing"}

    client = genai.Client(api_key=api_key)

    prompt = f"""
    You are PocketSmart AI, a budget planning assistant.
    Category: {data.category}
    Budget: {data.budget}
    Preferences: {data.preferences}

    Suggest a practical budget plan.
    Include estimated costs and useful recommendations.
    Keep the response simple and clear.
    """

    response = client.models.generate_content(
        model=model,
        contents=prompt
    )

    return {"recommendation": response.text}