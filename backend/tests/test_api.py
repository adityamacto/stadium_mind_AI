from fastapi.testclient import TestClient

from app.main import _ai_requests, app
import app.api.assistant as assistant_api
import app.api.announcements as announcement_api
import app.api.fan_assistant as fan_api
import app.api.incidents as incident_api


client = TestClient(app)


def test_health_and_dashboard_contracts():
    health = client.get("/health")
    assert health.json() == {"status": "healthy"}
    assert health.headers["x-content-type-options"] == "nosniff"
    assert health.headers["x-frame-options"] == "DENY"
    dashboard = client.get("/dashboard")
    assert dashboard.status_code == 200
    payload = dashboard.json()
    assert {"health", "crowd", "weather", "transport", "zones", "recommendation"} <= payload.keys()


def test_analytics_contract():
    response = client.get("/analytics")
    assert response.status_code == 200
    payload = response.json()
    assert len(payload["trend"]) == 10
    assert all(40 <= value <= 95 for value in payload["trend"])
    assert isinstance(payload["prediction"], str)


def test_ai_routes_return_expected_json(monkeypatch):
    monkeypatch.setattr(assistant_api, "generate_response", lambda _: "status response")
    monkeypatch.setattr(announcement_api, "generate_response", lambda _: "announcement response")
    monkeypatch.setattr(fan_api, "generate_response", lambda _: "fan response")
    monkeypatch.setattr(incident_api, "generate_response", lambda _: "incident response")

    assert client.post("/assistant", json={"question": "status"}).json() == {"response": "status response"}
    assert client.post("/announcement", json={"event": "gate delay"}).json() == {"announcement": "announcement response"}
    assert client.post("/fan", json={"question": "Where is accessible entry?"}).json() == {"response": "fan response"}
    assert client.post("/incident", json={"incident": "crowd at gate"}).json() == {"analysis": "incident response"}


def test_request_validation_is_json():
    response = client.post("/incident", json={"incident": ""})
    assert response.status_code == 422
    assert response.json()["detail"] == "Invalid request data."


def test_ai_rate_limit_returns_json(monkeypatch):
    monkeypatch.setattr(assistant_api, "generate_response", lambda _: "ok")
    _ai_requests.clear()
    for _ in range(30):
        assert client.post("/assistant", json={"question": "status"}).status_code == 200
    response = client.post("/assistant", json={"question": "status"})
    assert response.status_code == 429
    assert response.json()["detail"] == "Too many AI requests. Please try again shortly."
