from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    PROJECT_NAME: str = "TribalEd AI API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    # Security
    SECRET_KEY: str = "sih2026_tribaled_super_secret_jwt_key"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24
    
    # Database
    DATABASE_URL: str = "sqlite:///./tribaled.db"
    
    # Redis
    REDIS_URL: str = "redis://localhost:6379/0"
    
    # Mock flags
    DIGILOCKER_MOCK_ENABLED: bool = True
    PFMS_MOCK_ENABLED: bool = True

    class Config:
        case_sensitive = True
        env_file = ".env"
        extra = "allow"


settings = Settings()
