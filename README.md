# StadiumMind AI

AI-powered Stadium Operations and decision intelligence for FIFA World Cup 2026.

Live application: https://stadium-mind-ai-zeta.vercel.app/

## What it solves

Match-day teams need one operational view for crowd safety, transport, accessibility, and fast communication. StadiumMind AI combines live venue signals with Gemini-powered decision support for organizers, volunteers, venue staff, and fans.

## Core capabilities

- Live health, crowd, weather, transport, and zone readings with five-second refresh
- Crowd trend analytics and zone risk visualization
- Incident triage with immediate, medical, security, and public-communication guidance
- Fan guidance for routes, travel, accessibility, facilities, and safety
- Accessible announcement generation for fans, volunteers, staff, and social channels
- AI recommendations for risk, crowd strategy, transport, accessibility, multilingual support, and sustainability

## Architecture

The Vite/React frontend is deployed on Vercel and calls the FastAPI backend deployed on Render. The backend grounds Gemini responses in current stadium data and returns safe fallback guidance when AI credentials are unavailable.

## Local development

```text
cd backend
pip install -r requirements.txt
python -m uvicorn app.main:app --reload --port 8001

cd frontend
npm install
npm run dev
```

Set `VITE_API_URL` in `frontend/.env.local` and `GEMINI_API_KEY` in `backend/.env`. Run backend tests with `python -m pytest -q`.
