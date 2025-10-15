from typing import List
from uuid import UUID
from fastapi import Depends
from prisma import Prisma
from prisma.models import HttpLog
from database.db import get_prisma
from schema.httpLogsModels import AnalysisStats, LogEntry

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
    
    async def get_analysis_counts(self):
        results = await self.prisma.loganalysis.group_by(
            by=['attackType'],
            count={
                '_all': True
            }
        )
        
        # Transform the results into a more usable format
        counts = {result['attackType']: result['_count']['_all'] for result in results}
        
        # Ensure all attack types are present with 0 if no records exist
        attack_types = ['SQLi', 'XSS', 'Directory Traversal', 'Web-shell Upload', 'Miscellaneous']
        for attack_type in attack_types:
            if attack_type not in counts:
                counts[attack_type] = 0
        
        return AnalysisStats(
            sqli=counts["SQLi"],
            xss=counts["XSS"],
            directoryTraversal=counts["Directory Traversal"],
            webShellUpload=counts["Web-shell Upload"],
            miscellaneous=counts["Miscellaneous"]
        )

def get_http_log_repository(prisma: Prisma = Depends(get_prisma)):
    return HttpLogRepository(prisma)