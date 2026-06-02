from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, ConfigDict


class BlogPostBase(BaseModel):
    title: str
    excerpt: Optional[str] = None
    body_md: str
    cover_image: Optional[str] = None
    category: Optional[str] = None
    tags: List[str] = []
    read_time_min: Optional[int] = None
    status: str = "draft"
    featured: bool = False


class BlogPostCreate(BlogPostBase):
    pass


class BlogPostUpdate(BaseModel):
    title: Optional[str] = None
    excerpt: Optional[str] = None
    body_md: Optional[str] = None
    cover_image: Optional[str] = None
    category: Optional[str] = None
    tags: Optional[List[str]] = None
    read_time_min: Optional[int] = None
    status: Optional[str] = None
    featured: Optional[bool] = None


class BlogPostOut(BlogPostBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
    slug: str
    published_at: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime
