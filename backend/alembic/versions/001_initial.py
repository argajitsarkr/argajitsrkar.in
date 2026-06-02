"""initial schema: users, blog_posts, resources

Revision ID: 001
Revises:
Create Date: 2026-06-03

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "001"
down_revision: Union[str, None] = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "users",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("email", sa.String(255), unique=True, nullable=False, index=True),
        sa.Column("name", sa.String(255)),
        sa.Column("image", sa.String(500)),
        sa.Column("password_hash", sa.String(255)),
        sa.Column("is_admin", sa.Boolean, server_default=sa.false(), nullable=False),
        sa.Column("email_verified", sa.Boolean, server_default=sa.false(), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
    )

    op.create_table(
        "blog_posts",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("slug", sa.String(255), unique=True, nullable=False, index=True),
        sa.Column("title", sa.String(500), nullable=False),
        sa.Column("excerpt", sa.Text),
        sa.Column("body_md", sa.Text, nullable=False),
        sa.Column("cover_image", sa.String(500)),
        sa.Column("category", sa.String(80), index=True),
        sa.Column("tags", sa.JSON, server_default="[]"),
        sa.Column("read_time_min", sa.Integer),
        sa.Column("status", sa.String(20), server_default="draft", nullable=False, index=True),
        sa.Column("featured", sa.Boolean, server_default=sa.false(), nullable=False),
        sa.Column("author_id", sa.Integer, sa.ForeignKey("users.id", ondelete="SET NULL")),
        sa.Column("published_at", sa.DateTime(timezone=True)),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
    )

    op.create_table(
        "resources",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("slug", sa.String(255), unique=True, nullable=False, index=True),
        sa.Column("title", sa.String(500), nullable=False),
        sa.Column("description", sa.Text),
        sa.Column("category", sa.String(80), index=True),
        sa.Column("file_url", sa.String(1000), nullable=False),  # R2 public URL
        sa.Column("file_size_bytes", sa.BigInteger),
        sa.Column("file_kind", sa.String(20), server_default="pdf", nullable=False),  # pdf, zip, ipynb
        sa.Column("downloads", sa.Integer, server_default="0", nullable=False),
        sa.Column("status", sa.String(20), server_default="published", nullable=False, index=True),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
    )


def downgrade() -> None:
    op.drop_table("resources")
    op.drop_table("blog_posts")
    op.drop_table("users")
