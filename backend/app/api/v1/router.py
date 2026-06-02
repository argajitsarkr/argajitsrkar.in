from fastapi import APIRouter

from app.api.v1 import auth, blog, health, resources

api_router = APIRouter(prefix="/v1")
api_router.include_router(health.router)
api_router.include_router(auth.router)
api_router.include_router(blog.router)
api_router.include_router(resources.router)
