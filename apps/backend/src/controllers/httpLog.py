from fastapi import UploadFile, Depends
from schema.httpLogsModels import AnalyzeRequest, LogEntry
from services.httpLog import HttpLogService, get_http_log_service


class HttpLogController:
    def __init__(self, http_log_service: HttpLogService):
        self.http_log_service = http_log_service
        
    async def analyze(self, data: AnalyzeRequest):
        return await self.http_log_service.analyze(data)
    
    async def upload(self, file: UploadFile):
        return await self.http_log_service.upload_and_parse(file)
        
    async def get_all_logs(self):
        return await self.http_log_service.get_all_logs()

    async def create_single_http_log(self, http_log: LogEntry):
        return await self.http_log_service.create_single_log(http_log)
    
    async def get_log_stats(self):
        return await self.http_log_service.get_log_stats()
    
def get_http_log_controller(http_log_service: HttpLogService = Depends(get_http_log_service)):
    return HttpLogController(http_log_service)