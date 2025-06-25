README – Resume Editor
Resume Editor – Fullstack Web App
A fullstack Resume Editor application built using React.js (frontend) and FastAPI (backend).

It allows users to:
- Upload and edit resumes (mocked)
- Enhance individual sections using a mock AI backend
- Save resume data to backend
- Download the final resume as a .json file
Project Structure
resume-editor/
├── frontend/     → React.js frontend
└── backend/      → FastAPI backend
Features
**Frontend (React.js):**
- Upload resume file (.pdf/.docx) → Mock parse
- Edit fields like name, summary, education, experience, skills
- Dynamically add/remove entries
- "Enhance with AI" (calls /ai-enhance backend endpoint)
- Save resume (POST to /save-resume)
- Download final resume as .json

**Backend (FastAPI):**
- POST /ai-enhance: Accepts a section and returns an enhanced mock response
- POST /save-resume: Saves entire resume JSON to saved_resume.json
- GET /get-resume: (Optional) Fetches the saved resume
Setup Instructions
**Backend Setup (FastAPI):**
1. Navigate to backend folder:
   cd backend
2. Install dependencies:
   pip install fastapi uvicorn
3. Run the backend:
   uvicorn main:app --reload
4. Access API docs:
   http://127.0.0.1:8000/docs

**Frontend Setup (React):**
1. Navigate to frontend folder:
   cd frontend
2. Install dependencies:
   npm install
3. Start the React app:
   npm start
4. Open in browser:
   http://localhost:3000
Resume JSON Example
{
  "name": "Priyanshu Kumar",
  "summary": "A passionate BCA student...",
  "skills": ["React", "Python", "FastAPI"],
  "education": [...],
  "experience": [...]
}
Author
Priyanshu Kumar
BCA Student | Fullstack Developer
GitHub: https://github.com/priyanshu044-4
License
This project is for educational & internship assignment purposes.
Feel free to use or extend it with credit.
