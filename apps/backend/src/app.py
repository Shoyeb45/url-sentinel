from contextlib import asynccontextmanager
from fastapi import FastAPI
from prisma import Prisma
import logging
from config.config import get_app_settings
from fastapi.middleware.cors import CORSMiddleware

logger = logging.getLogger(__name__)

def create_server():
    app_settings = get_app_settings()
    prisma = Prisma()
    
    @asynccontextmanager
    async def lifespan(app: FastAPI):
        logger.info("Starting up FastAPI application...")
        await prisma.connect()
        app.state.prisma = prisma
        logger.info("Database connection successful")
        yield
        logger.info("Disconnecting database connection.")
        await prisma.disconnect()
    
    app = FastAPI(
        title=app_settings.app_name,
        description="Backend of the URL Sentinel",
        version=app_settings.version,
        debug=app_settings.debug,
        lifespan=lifespan
    )
    
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[app_settings.frontend_url],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    return app
    
 