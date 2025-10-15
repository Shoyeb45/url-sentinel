from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel
from uuid import UUID

from schema.response import BaseResponse

class LogEntry(BaseModel):
    timestamp: datetime
    srcIp: str
    host: str
    uri: str
    method: str
    status: int
    userAgent: str
    
class AnalysisSchema(BaseModel):
    id: Optional[str]
    logId: str
    attackType: str
    confidenceScore: float
    
    class Config:
        from_attributes = True
    
class HttpLogSchema(LogEntry):
    id: str
    createdAt: datetime
    updatedAt: datetime
    logAnalysis: Optional[AnalysisSchema]

    class Config:
        from_attributes = True
    
class AllHttpLogs(BaseResponse):
    success: bool
    message: str
    data: List[HttpLogSchema]
    
class AnalyzeRequest(BaseModel):
    logIds: List[str]
    
    
class LogResponse(BaseModel):
    processed: int
    unprocessed: int
    total: int
    
class LogStatsResponse(BaseResponse):
    data: LogResponse
    
class AnalysisData(BaseResponse):
    data: List[AnalysisSchema]
    
class AnalysisStats(BaseModel):
    sqli: int 
    xss: int 
    directoryTraversal: int 
    webShellUpload: int 
    miscellaneous: int
    
class AnalysisStatsResponse(BaseResponse):
    data: AnalysisStats