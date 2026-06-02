from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import desc, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth import require_admin
from app.database import get_db
from app.models.blog_post import BlogPost
from app.schemas.blog import BlogPostCreate, BlogPostOut, BlogPostUpdate
from app.utils.slug import unique_slug

router = APIRouter(prefix="/blog", tags=["blog"])


# ── Public ──────────────────────────────────────────────────────────────────

@router.get("", response_model=list[BlogPostOut])
async def list_posts(
    db: AsyncSession = Depends(get_db),
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=100),
    category: str | None = None,
    featured: bool | None = None,
):
    q = select(BlogPost).where(BlogPost.status == "published")
    if category:
        q = q.where(BlogPost.category == category)
    if featured is not None:
        q = q.where(BlogPost.featured == featured)
    q = q.order_by(desc(BlogPost.published_at), desc(BlogPost.created_at))
    q = q.offset((page - 1) * per_page).limit(per_page)
    result = await db.execute(q)
    return result.scalars().all()


@router.get("/{slug}", response_model=BlogPostOut)
async def get_post(slug: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(BlogPost).where(BlogPost.slug == slug, BlogPost.status == "published"))
    post = result.scalar_one_or_none()
    if not post:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Post not found")
    return post


# ── Admin ───────────────────────────────────────────────────────────────────

@router.get("/admin/list", response_model=list[BlogPostOut])
async def admin_list(_=Depends(require_admin), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(BlogPost).order_by(desc(BlogPost.created_at)))
    return result.scalars().all()


@router.post("/admin", response_model=BlogPostOut, status_code=201)
async def admin_create(payload: BlogPostCreate, admin=Depends(require_admin), db: AsyncSession = Depends(get_db)):
    slug = await unique_slug(db, BlogPost, payload.title)
    post = BlogPost(slug=slug, author_id=admin.id, **payload.model_dump())
    db.add(post)
    await db.commit()
    await db.refresh(post)
    return post


@router.put("/admin/{post_id}", response_model=BlogPostOut)
async def admin_update(post_id: int, payload: BlogPostUpdate, _=Depends(require_admin), db: AsyncSession = Depends(get_db)):
    post = await db.get(BlogPost, post_id)
    if not post:
        raise HTTPException(404, "Post not found")
    data = payload.model_dump(exclude_unset=True)
    if "title" in data and data["title"] != post.title:
        post.slug = await unique_slug(db, BlogPost, data["title"], current_id=post.id)
    for k, v in data.items():
        setattr(post, k, v)
    await db.commit()
    await db.refresh(post)
    return post


@router.delete("/admin/{post_id}", status_code=204)
async def admin_delete(post_id: int, _=Depends(require_admin), db: AsyncSession = Depends(get_db)):
    post = await db.get(BlogPost, post_id)
    if not post:
        raise HTTPException(404, "Post not found")
    await db.delete(post)
    await db.commit()
