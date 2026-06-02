from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile, status
from sqlalchemy import desc, select, update
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth import require_admin
from app.database import get_db
from app.models.resource import Resource
from app.schemas.resource import ResourceOut, ResourceUpdate
from app.services.r2_service import upload_to_r2
from app.utils.slug import unique_slug

router = APIRouter(prefix="/resources", tags=["resources"])


# ── Public ──────────────────────────────────────────────────────────────────

@router.get("", response_model=list[ResourceOut])
async def list_resources(db: AsyncSession = Depends(get_db), category: str | None = None):
    q = select(Resource).where(Resource.status == "published")
    if category:
        q = q.where(Resource.category == category)
    q = q.order_by(desc(Resource.created_at))
    result = await db.execute(q)
    return result.scalars().all()


@router.get("/{slug}", response_model=ResourceOut)
async def get_resource(slug: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Resource).where(Resource.slug == slug, Resource.status == "published"))
    r = result.scalar_one_or_none()
    if not r:
        raise HTTPException(404, "Resource not found")
    return r


@router.post("/{slug}/track", status_code=204)
async def track_download(slug: str, db: AsyncSession = Depends(get_db)):
    """Lightweight increment endpoint. Frontend calls this on download click."""
    await db.execute(update(Resource).where(Resource.slug == slug).values(downloads=Resource.downloads + 1))
    await db.commit()


# ── Admin ───────────────────────────────────────────────────────────────────

@router.post("/admin/upload", response_model=ResourceOut, status_code=201)
async def admin_upload(
    title: str = Form(...),
    description: str | None = Form(None),
    category: str | None = Form(None),
    file: UploadFile = File(...),
    _=Depends(require_admin),
    db: AsyncSession = Depends(get_db),
):
    contents = await file.read()
    file_url, size = await upload_to_r2(file.filename or "file.pdf", contents, content_type=file.content_type or "application/pdf")
    slug = await unique_slug(db, Resource, title)
    kind = (file.filename or "").rsplit(".", 1)[-1].lower() if "." in (file.filename or "") else "pdf"
    r = Resource(
        slug=slug, title=title, description=description, category=category,
        file_url=file_url, file_size_bytes=size, file_kind=kind,
    )
    db.add(r)
    await db.commit()
    await db.refresh(r)
    return r


@router.put("/admin/{rid}", response_model=ResourceOut)
async def admin_update(rid: int, payload: ResourceUpdate, _=Depends(require_admin), db: AsyncSession = Depends(get_db)):
    r = await db.get(Resource, rid)
    if not r:
        raise HTTPException(404, "Resource not found")
    for k, v in payload.model_dump(exclude_unset=True).items():
        setattr(r, k, v)
    await db.commit()
    await db.refresh(r)
    return r


@router.delete("/admin/{rid}", status_code=204)
async def admin_delete(rid: int, _=Depends(require_admin), db: AsyncSession = Depends(get_db)):
    r = await db.get(Resource, rid)
    if not r:
        raise HTTPException(404, "Resource not found")
    await db.delete(r)
    await db.commit()
