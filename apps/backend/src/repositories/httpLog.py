from typing import List
from uuid import UUID
from fastapi import Depends
from prisma import Prisma
from prisma.models import HttpLog
from database.db import get_prisma
from schema.httpLogsModels import LogEntry

class HttpLogRepository:
    def __init__(self, prisma: Prisma):
        self.prisma = prisma
        
    async def create_many(self, data: List[LogEntry]):
        log_dicts = [log.model_dump() for log in data]
        created_data = await self.prisma.httplog.create_many(
            data=log_dicts  # ← list of dicts
        )
        return created_data
        
    async def get_all(self) -> List[HttpLog]:
        data = await self.prisma.httplog.find_many(where={}, include={
            "logAnalysis": True
        })
        return data
        
    async def get_many_by_id(self, logIds: List[str]):
        return await self.prisma.httplog.find_many(
            where={
                "id": {"in": logIds},
                "logAnalysis": None 
            }
        )
    
    async def get_by_id(self, id: str):
        return await self.prisma.httplog.find_first(where={
            "id": { "equals": id },
        }, include={
            "logAnalysis": True
        })
           
    async def create(self, data: LogEntry):
        return await self.prisma.httplog.create(data=data.model_dump())
    
    async def create_multiple_analyses(self, data: List[dict]):
        return await self.prisma.loganalysis.create_many(
            data=[
                {
                    "logId": analysis["logId"],
                    "attackType": analysis["attackType"],
                    "confidenceScore": analysis["confidenceScore"]
                }
                for analysis in data
            ]
        )
        
    async def get_log_counts(self):
        unprocessed_count = await self.prisma.httplog.count(
            where={"logAnalysis": None}
        )
        processed_count = await self.prisma.httplog.count(
            where={"logAnalysis": {"is_not": None}}
        )
        return {
            "unprocessed": unprocessed_count,
            "processed": processed_count,
            "total": unprocessed_count + processed_count
        }

    async def get_many_analysis_by_logIds(self, logIds: List[str]):
        data = await self.prisma.loganalysis.find_many(where={
            "logId": { "in" : logIds}
        })
        return data

def get_http_log_repository(prisma: Prisma = Depends(get_prisma)):
    return HttpLogRepository(prisma)