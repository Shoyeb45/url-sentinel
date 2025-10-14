import logging
import os

from fastapi import HTTPException, Request, responses
import uvicorn
from utils.logging import setup_logging
from dotenv import load_dotenv

setup_logging(
    log_level="INFO",
    log_file="logs/app.log",
    max_file_size=8 * 1024 * 1024,  
    backup_count=3,
)
load_dotenv()

from app import create_server
from routes.auth import router as auth_routes

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
app = create_server()

app.include_router(auth_routes, prefix="/api/v1")

@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    return responses.JSONResponse(
        status_code=exc.status_code,
        content={"success": False, "message": exc.detail, "code": exc.status_code},
    )
    
@app.get("/")
async def root():
    return {"message": "URL Sentinel app is running!"}


@app.get("/health")
async def health_check():
    return {"status": "URL Sentinel app is healthy."}


def main():
    """Main Function"""
    logger.info(
        f"Environment variables loaded successfully, test env: {os.getenv('TEST')}"
    )
    uvicorn.run("main:app", host="0.0.0.0")


if __name__ == "__main__":
    main()
