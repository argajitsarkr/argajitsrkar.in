from slugify import slugify
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession


async def unique_slug(db: AsyncSession, model, title: str, current_id: int | None = None) -> str:
    """Slugify the title and append -2, -3, ... on collision."""
    base = slugify(title)[:200] or "post"
    candidate = base
    i = 2
    while True:
        q = select(model).where(model.slug == candidate)
        if current_id is not None:
            q = q.where(model.id != current_id)
        existing = (await db.execute(q)).scalar_one_or_none()
        if not existing:
            return candidate
        candidate = f"{base}-{i}"
        i += 1
