import csv
import io
from typing import Any, Dict, List
from fastapi import Depends, HTTPException, UploadFile, status
import logging
from database.db import get_prisma
from schema.httpLogsModels import AllHttpLogs, AnalysisSchema, AnalyzeRequest, HttpLogSchema, LogEntry
from repositories.httpLog import HttpLogRepository, get_http_log_repository
from schema.response import BaseResponse
from utils.detector import check_attack

logger = logging.getLogger(__name__)

class HttpLogService:
    def __init__(self, http_log_repository: HttpLogRepository):
        self.http_log_repository = http_log_repository
        
        
    async def analyze(self, data: AnalyzeRequest):
        logs = await self.http_log_repository.get_many_by_id(data.logIds)
        if not data:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Failed to load the data.")
        
        analysis_data: List[Dict[str, Any]] = []
        
        for log in logs:    
            attack_type, confidence = check_attack(log.uri, log.userAgent)
            if attack_type is None:
                attack_type = "Miscellaneous"
            analysis_data.append({
                "logId": log.id,
                "attackType": attack_type,
                "confidenceScore": confidence
            })

        await self.http_log_repository.create_multiple_analyses(analysis_data)
        
        return BaseResponse(message=f"Completed analysis of {len(analysis_data)} given data.", success=True)
        
    async def upload_and_parse(self, file: UploadFile) -> AllHttpLogs:
        if not file.filename.endswith('.csv'):
            raise HTTPException(status_code=400, detail="Only CSV files allowed")
    
        try:
            content = await file.read()
            csv_text = content.decode('utf-8')
            reader = csv.DictReader(io.StringIO(csv_text))
            
            required = {'timestamp', 'srcIp', 'host', 'uri', 'method', 'status', 'userAgent'}
            if not required.issubset(reader.fieldnames):
                raise HTTPException(status_code=400, detail=f"Missing columns. Required: {required}")
            logs = []
            for row in reader:
                # Convert status to int
                try:
                    row['status'] = int(row['status'])
                except (ValueError, TypeError):
                    row['status'] = 0
                logs.append(LogEntry(**row))
                
            created_data = await self.http_log_repository.create_many(logs)
            logger.info(created_data)
            # if created_data != len(row):
            #     raise HTTPException(
            #         status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            #         detail="Failed to add http logs."
            #     )
                
            all_data = await self.http_log_repository.get_all()
            
            return AllHttpLogs(
                success=True,
                message="Successfully uploaded all data and fetched all the data",
                data=[HttpLogSchema.model_validate(log) for log in all_data]
            )
        except Exception as e:
            logger.error(f"Failed to upload and parse CSV: {e}")
            raise HTTPException(status_code=400, detail=f"Failed to process CSV: {str(e)}")
    
    async def get_all_logs(self) -> AllHttpLogs:
        data = await self.http_log_repository.get_all()
        if data != [] and not data:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to retrive the data"
            )
            
        return AllHttpLogs(
            success=True,
            message="Successfully fetched all the data.",
            data=[HttpLogSchema.model_validate(log) for log in data]
        )
        
    
        
    async def create_single_log(self, http_log: LogEntry):
        created_data = await self.http_log_repository.create(http_log)
        return BaseResponse(success=True, message="Successfully created new http log.")
    
        
def get_http_log_service(http_log_repository: HttpLogRepository = Depends(get_http_log_repository)):
    return HttpLogService(http_log_repository)