from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.api.v1.router import api_router
from app.config import get_settings

settings = get_settings()

app = FastAPI(title="argajitsrkar.in API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Local-uploads fallback when R2 isn't configured
import os
if os.path.isdir("/app/uploads"):
    app.mount("/uploads", StaticFiles(directory="/app/uploads"), name="uploads")

app.include_router(api_router, prefix="/api")


@app.get("/")
async def root():
    return {"name": "argajitsrkar.in", "docs": "/docs"}
