from pydantic_settings import BaseSettings
from pydantic import Field
from functools import lru_cache

class AppSettings(BaseSettings):
    """Application configuration settings."""

    app_name: str = Field(default="URL sentinel backend", env="APP_NAME")
    debug: bool = Field(default=True, env="DEBUG")
    version: str = Field(default="1.0.0", env="APP_VERSION")
    api_v1_prefix: str = Field(default="/api/v1", env="API_V1_PREFIX")
    frontend_url: str = Field(default="/api/v1", env="FRONTEND_URL")
    env: str = Field(default="development", env="ENV")
    # model_config = {
    #     "extra": "allow"
    # }
    class Config:
        """Pydantic configuration for AppSettings."""

        env_file = "../../.env"
        case_sensitive = False
        
@lru_cache()
def get_app_settings() -> AppSettings:
    """Get cached application settings instance.

    Returns:
        AppSettings: Cached instance of application configuration settings
    """
    return AppSettings()