from fastapi import APIRouter
from app.services.stadium_data import get_live_data

router = APIRouter()


@router.get("/dashboard", response_model=None)
def dashboard():
    try:
        return get_live_data()
    except Exception:
        return {"health": 0, "crowd": 0, "weather": "Unavailable", "transport": "Unavailable", "zones": {}, "recommendation": "Live data is temporarily unavailable."}
