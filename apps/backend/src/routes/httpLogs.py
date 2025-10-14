from fastapi import APIRouter, Depends, File, UploadFile

from controllers.httpLog import HttpLogController, get_http_log_controller
from schema.httpLogsModels import AllHttpLogs, AnalyzeRequest, LogEntry
from schema.response import BaseResponse

router = APIRouter(prefix="/http-log", tags=["HTTP Log related API"])

@router.post("/", description="Use this api to upload the logs, accepts csv file and parses it for better use.", response_model=AllHttpLogs)
async def upload_http_log(file: UploadFile = File(...), http_log_controller: HttpLogController = Depends(get_http_log_controller)):
    return await http_log_controller.upload(file)

@router.post("/single", description="Add single http log", response_model=BaseResponse)
async def create_single_http_log(http_log: LogEntry, http_log_controller: HttpLogController = Depends(get_http_log_controller)):
    return await http_log_controller.create_single_http_log(http_log)

@router.get("/", description="Get all the logs", response_model=AllHttpLogs)
async def get_logs(http_log_controller: HttpLogController = Depends(get_http_log_controller)):
    return await http_log_controller.get_all_logs()

@router.post("/analyse")
async def analyse_http_logs(request: AnalyzeRequest, http_log_controller: HttpLogController = Depends(get_http_log_controller)):
    return await http_log_controller.analyze(request)