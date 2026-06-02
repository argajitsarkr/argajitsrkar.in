"""Lightweight /auth endpoints. Most auth happens in NextAuth on the frontend;
this just lets the frontend sync a user row and reports admin status.
"""
from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth import get_current_user
from app.config import get_settings
from app.database import get_db
from app.models.user import User

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/sync")
async def sync_user(user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    """Called after NextAuth sign-in to ensure the user row reflects current admin status."""
    settings = get_settings()
    if user.email.lower() in settings.admin_emails_list and not user.is_admin:
        user.is_admin = True
        await db.commit()
        await db.refresh(user)
    return {"id": user.id, "email": user.email, "is_admin": user.is_admin}


@router.get("/me")
async def me(user: User = Depends(get_current_user)):
    return {"id": user.id, "email": user.email, "name": user.name, "is_admin": user.is_admin}
