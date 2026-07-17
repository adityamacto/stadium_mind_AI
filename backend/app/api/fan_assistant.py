from fastapi import APIRouter

from app.models.schemas import FanRequest
from app.services.gemini_service import generate_response

router = APIRouter()


@router.post("/fan")
def fan(request: FanRequest):

    prompt = f"""
You are an AI assistant helping FIFA World Cup fans.

Question

{request.question}

Provide practical, concise guidance for a diverse FIFA World Cup audience.
If relevant, mention step-free access, accessible toilets, quiet areas,
public transport, and how to request human or multilingual assistance.

Provide

Route

Travel Time

Accessibility

Nearby Facilities

Safety Tips
"""

    answer = generate_response(prompt)

    return {
        "response": answer
    }
