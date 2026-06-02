from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict


class ResourceBase(BaseModel):
    title: str
    description: Optional[str] = None
    category: Optional[str] = None
    file_kind: str = "pdf"
    status: str = "published"


class ResourceCreate(ResourceBase):
    file_url: str
    file_size_bytes: Optional[int] = None


class ResourceUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    status: Optional[str] = None


class ResourceOut(ResourceBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
    slug: str
    file_url: str
    file_size_bytes: Optional[int] = None
    downloads: int
    created_at: datetime
    updated_at: datetime
