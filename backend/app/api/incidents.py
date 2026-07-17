from fastapi import APIRouter

from app.models.schemas import IncidentRequest
from app.services.gemini_service import generate_response

router = APIRouter()


@router.post("/incident")
def analyze_incident(request: IncidentRequest):

    prompt = f"""
You are an emergency response coordinator.

Analyze this stadium incident.

Incident:

{request.incident}

Return

Severity

Immediate Actions

Medical Response

Security Response

Public Communication
"""

    answer = generate_response(prompt)

    return {
        "analysis": answer
    }