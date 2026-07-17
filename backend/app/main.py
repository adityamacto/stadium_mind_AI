import os
import time
from collections import defaultdict, deque

from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.trustedhost import TrustedHostMiddleware

from app.api.dashboard import router as dashboard_router
from app.api.assistant import router as assistant_router
from app.api.incidents import router as incident_router
from app.api.fan_assistant import router as fan_router
from app.api.announcements import router as announcement_router
from app.api.analytics import router as analytics_router

app = FastAPI(
    title="StadiumMind AI",
    version="1.0.0",
    description="AI-powered Stadium Operations Platform"
)

allowed_origins = [
    origin.strip()
    for origin in os.getenv(
        "CORS_ORIGINS", ""
    ).split(",")
    if origin.strip()
]

if not allowed_origins:
    allowed_origins = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
        "https://stadium-mind-ai-zeta.vercel.app",
    ]

allowed_hosts = [host.strip() for host in os.getenv("ALLOWED_HOSTS", "").split(",") if host.strip()]
if allowed_hosts:
    app.add_middleware(TrustedHostMiddleware, allowed_hosts=allowed_hosts)

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def security_headers(request: Request, call_next):
    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    response.headers["Permissions-Policy"] = "camera=(), microphone=(), geolocation=()"
    if request.url.scheme == "https":
        response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
    return response


_ai_requests = defaultdict(deque)
_AI_ROUTES = {"/assistant", "/incident", "/fan", "/announcement"}
_AI_LIMIT = 30
_AI_WINDOW_SECONDS = 60


@app.middleware("http")
async def ai_rate_limit(request: Request, call_next):
    if request.method == "POST" and request.url.path in _AI_ROUTES:
        now = time.monotonic()
        client_key = request.client.host if request.client else "unknown"
        requests = _ai_requests[client_key]
        while requests and now - requests[0] > _AI_WINDOW_SECONDS:
            requests.popleft()
        if len(requests) >= _AI_LIMIT:
            return JSONResponse(
                status_code=429,
                content={"detail": "Too many AI requests. Please try again shortly."},
                headers={"Retry-After": str(_AI_WINDOW_SECONDS)},
            )
        requests.append(now)
    return await call_next(request)


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(_: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=422,
        content={"detail": "Invalid request data.", "errors": exc.errors()},
    )


@app.exception_handler(Exception)
async def unhandled_exception_handler(_: Request, __: Exception):
    return JSONResponse(
        status_code=500,
        content={"detail": "The server could not complete the request."},
    )

app.include_router(dashboard_router)
app.include_router(assistant_router)
app.include_router(incident_router)
app.include_router(fan_router)
app.include_router(announcement_router)
app.include_router(analytics_router)


@app.get("/")
def root():
    return {
        "message": "Welcome to StadiumMind AI",
        "status": "running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }
