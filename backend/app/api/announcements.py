from fastapi import APIRouter

from app.models.schemas import AnnouncementRequest
from app.services.gemini_service import generate_response

router = APIRouter()


@router.post("/announcement")
def announcement(request: AnnouncementRequest):

    prompt = f"""
Generate clear, calm, accessible communications for fans, volunteers, and
venue staff. Avoid unverified details and include an accessibility-friendly
alternative when the situation affects movement or public transport.

Generate

1 Public Announcement

2 Volunteer Instructions

3 Staff Briefing

4 Twitter/X Post

Situation

{request.event}
"""

    answer = generate_response(prompt)

    return {
        "announcement": answer
    }
