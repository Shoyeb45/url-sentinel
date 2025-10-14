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
                "logAnalysis": None   # No related logAnalysis records
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
    
    async def create_multiple_analyses(self, analyses_data: List[dict]):
        return await self.prisma.loganalysis.create_many(
            data=[
                {
                    "logId": analysis["logId"],
                    "attackType": analysis["attackType"],
                    "confidenceScore": analysis["confidenceScore"]
                }
                for analysis in analyses_data
            ]
        )


def get_http_log_repository(prisma: Prisma = Depends(get_prisma)):
    return HttpLogRepository(prisma)