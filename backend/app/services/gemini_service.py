import logging
import os
from pathlib import Path

from dotenv import load_dotenv

from app.services.context_builder import build_context

BACKEND_DIR = Path(__file__).resolve().parents[2]
load_dotenv(BACKEND_DIR / ".env")
logger = logging.getLogger(__name__)


def _fallback_response(user_prompt: str) -> str:
    return (
        "AI service is not configured.\n\n"
        "- Review the live dashboard data and follow the venue's operating procedures.\n"
        "- Escalate urgent safety incidents to on-site emergency teams.\n"
        f"- Request received: {user_prompt.strip()}"
    )


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
