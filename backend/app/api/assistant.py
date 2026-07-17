from fastapi import APIRouter

from app.models.schemas import AssistantRequest
from app.services.gemini_service import generate_response

router = APIRouter()


@router.post("/assistant")
def assistant(request: AssistantRequest):

    answer = generate_response(request.question)

    return {
        "response": answer
    }