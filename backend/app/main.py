import os

from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

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

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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
