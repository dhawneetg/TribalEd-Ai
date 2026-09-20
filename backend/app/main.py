from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.v1.auth import router as auth_router
from app.api.v1.schemes import router as schemes_router
from app.api.v1.applications import router as applications_router

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="MoTA SIH 2026 Problem Statement ID 26239 - AI-Enabled Scholarship Management Platform",
)

# Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount API Routers
app.include_router(auth_router, prefix=settings.API_V1_STR)
app.include_router(schemes_router, prefix=settings.API_V1_STR)
app.include_router(applications_router, prefix=settings.API_V1_STR)


@app.get("/")
def root():
    return {
        "status": "healthy",
        "service": "TribalEd AI Backend API",
        "version": settings.VERSION,
        "docs_url": "/docs",
    }


@app.get("/health")
def health_check():
    return {"status": "ok"}
