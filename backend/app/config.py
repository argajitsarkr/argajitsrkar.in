from functools import lru_cache
from typing import List

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", case_sensitive=False, extra="ignore")

    # Database
    database_url: str = "postgresql+asyncpg://argajit:changeme@db:5432/argajit"
    db_password: str = "changeme"

    # Redis
    redis_url: str = "redis://redis:6379/0"

    # Frontend / CORS
    frontend_url: str = "https://argajitsrkar.in"
    cors_origins: str = "https://argajitsrkar.in,http://localhost:3001"

    # Admin allowlist
    admin_emails: str = ""

    # NextAuth shared secret
    nextauth_secret: str = "dev-secret-change-me"

    # Google OAuth
    google_client_id: str = ""
    google_client_secret: str = ""

    # Cloudflare R2
    r2_account_id: str = ""
    r2_access_key_id: str = ""
    r2_secret_access_key: str = ""
    r2_bucket: str = "argajit-resources"
    r2_public_base: str = ""

    # Buttondown
    buttondown_api_key: str = ""

    @property
    def cors_origins_list(self) -> List[str]:
        return [o.strip() for o in self.cors_origins.split(",") if o.strip()]

    @property
    def admin_emails_list(self) -> List[str]:
        return [e.strip().lower() for e in self.admin_emails.split(",") if e.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()
