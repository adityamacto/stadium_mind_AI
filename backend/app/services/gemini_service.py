import logging
import os
from pathlib import Path

from dotenv import load_dotenv

from app.services.context_builder import build_context
from app.services.stadium_data import get_live_data

BACKEND_DIR = Path(__file__).resolve().parents[2]
load_dotenv(BACKEND_DIR / ".env")
logger = logging.getLogger(__name__)


def _fallback_response(user_prompt: str) -> str:
    """Provide useful local guidance when Gemini is unavailable.

    This keeps every demo action functional without pretending that a model
    generated the response. It is also safe to use as an operational baseline.
    """
    data = get_live_data()
    prompt = user_prompt.lower()
    highest_zone = max(data["zones"], key=data["zones"].get)
    highest_value = data["zones"][highest_zone]

    if "incident" in prompt or "emergency" in prompt:
        guidance = (
            "INCIDENT RESPONSE\n"
            "Severity: Assess immediately and escalate any injury, panic, fire, or crush risk.\n"
            "Immediate actions: Pause movement into the affected zone, send trained staff, and preserve an access route.\n"
            "Medical response: Contact venue medical control and request an accessible route for responders.\n"
            "Security response: Establish a safe perimeter and coordinate with the incident commander.\n"
            "Public communication: Issue a calm, multilingual instruction only after venue staff confirm the safe route."
        )
    elif "announcement" in prompt or "public communication" in prompt:
        guidance = (
            "PUBLIC ANNOUNCEMENT\n"
            "Please remain calm and follow directions from venue staff. Keep walkways and emergency access routes clear.\n\n"
            "VOLUNTEER BRIEFING\n"
            "Guide guests to the nearest safe route, offer step-free assistance, and escalate medical or safety concerns."
        )
    elif "fan" in prompt or "route" in prompt or "accessib" in prompt or "multilingual" in prompt:
        guidance = (
            "FAN SUPPORT\n"
            f"Current transport status: {data['transport']}. Weather: {data['weather']}.\n"
            "Ask a steward for step-free routing, accessible facilities, language support, or quiet assistance. "
            "Follow official signage and allow extra time for security and transfers."
        )
    else:
        guidance = (
            "STADIUM STATUS\n"
            f"Health: {data['health']}%. Crowd: {data['crowd']}%. Weather: {data['weather']}. Transport: {data['transport']}.\n"
            f"Highest monitored zone: {highest_zone} ({highest_value}%).\n"
            "Recommended next step: review the zone trend, keep emergency routes clear, and coordinate changes with venue control."
        )

    return f"Local operations guidance (AI provider unavailable)\n\n{guidance}"


def generate_response(user_prompt: str) -> str:
    """Generate a grounded Gemini response, with a safe local fallback."""
    api_key = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")
    if not api_key:
        return _fallback_response(user_prompt)

    prompt = build_context(user_prompt)
    try:
        from google import genai

        client = genai.Client(api_key=api_key)
        response = client.models.generate_content(
            model=os.getenv("GEMINI_MODEL", "gemini-2.5-flash"), contents=prompt
        )
        return response.text or _fallback_response(user_prompt)
    except Exception as exc:
        logger.warning("Gemini generation failed: %s", exc)
        return _fallback_response(user_prompt)
