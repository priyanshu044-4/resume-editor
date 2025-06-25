from fastapi import FastAPI
from pydantic import BaseModel
import json
import os
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can restrict this later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SAVE_PATH = "saved_resume.json"

class EnhanceRequest(BaseModel):
    section: str
    content: str

@app.post("/ai-enhance")
async def ai_enhance(req: EnhanceRequest):
    enhanced = f"✨ Enhanced Version of: {req.content} ✨"
    return {"enhanced_content": enhanced}

@app.post("/save-resume")
async def save_resume(resume: dict):
    with open(SAVE_PATH, "w") as f:
        json.dump(resume, f)
    return {"message": "Resume saved successfully!"}

@app.get("/get-resume")
async def get_resume():
    if not os.path.exists(SAVE_PATH):
        return {"message": "No resume found"}
    with open(SAVE_PATH, "r") as f:
        data = json.load(f)
    return data
