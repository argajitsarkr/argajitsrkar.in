"""Cloudflare R2 upload (S3-compatible). Falls back to local /app/uploads if R2 not configured."""
import os
import uuid
from pathlib import Path
from typing import Tuple

import boto3
from botocore.config import Config

from app.config import get_settings

settings = get_settings()

LOCAL_UPLOADS = Path("/app/uploads")


def _r2_client():
    if not (settings.r2_account_id and settings.r2_access_key_id and settings.r2_secret_access_key):
        return None
    return boto3.client(
        "s3",
        endpoint_url=f"https://{settings.r2_account_id}.r2.cloudflarestorage.com",
        aws_access_key_id=settings.r2_access_key_id,
        aws_secret_access_key=settings.r2_secret_access_key,
        config=Config(signature_version="s3v4"),
        region_name="auto",
    )


async def upload_to_r2(filename: str, contents: bytes, content_type: str = "application/octet-stream") -> Tuple[str, int]:
    """Returns (public_url, size_bytes)."""
    safe = filename.replace(" ", "-")
    key = f"{uuid.uuid4().hex[:8]}-{safe}"
    size = len(contents)

    client = _r2_client()
    if client is None:
        # Dev fallback: write to local volume, served by the api container itself
        LOCAL_UPLOADS.mkdir(parents=True, exist_ok=True)
        (LOCAL_UPLOADS / key).write_bytes(contents)
        return (f"/uploads/{key}", size)

    client.put_object(Bucket=settings.r2_bucket, Key=key, Body=contents, ContentType=content_type)
    base = settings.r2_public_base.rstrip("/") or f"https://{settings.r2_bucket}.{settings.r2_account_id}.r2.cloudflarestorage.com"
    return (f"{base}/{key}", size)
