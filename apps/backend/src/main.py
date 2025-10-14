import logging
import os
from datetime import datetime
from fastapi import HTTPException, Request, Response
from fastapi.responses import JSONResponse
import uvicorn
from utils.logging import setup_logging
from dotenv import load_dotenv
from config.config import get_app_settings

setup_logging(
    log_level="INFO",
    log_file="logs/app.log",
    max_file_size=8 * 1024 * 1024,  
    backup_count=3,
)
load_dotenv()

from app import create_server
from routes.auth import router as auth_routes
from routes.httpLogs import router as http_logs_routes

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
app = create_server()

app.include_router(auth_routes, prefix="/api/v1")
app.include_router(http_logs_routes, prefix="/api/v1")


@app.exception_handler(Exception)
async def http_exception_handler(request: Request, exc: Exception):
    status_code = 500
    message = "Something went wrong"
    is_production = get_app_settings().env.lower() == "production"
    
    if not is_production:
        message = str(exc) or message
        
    return JSONResponse(
        status_code=status_code,
        content={
            "success": False,
            "statusCode": status_code,
            "message": message,
            "timeStamp": datetime.utcnow().isoformat() + "Z",
            "path": str(request.url),
        },
    )
    
@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "success": False,
            "message": exc.detail,
            "statusCode": exc.status_code,
            "timeStamp": datetime.utcnow().isoformat() + "Z",
            "path": str(request.url),
        },
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
