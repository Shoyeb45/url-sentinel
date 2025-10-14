from pydantic import BaseModel
from typing import Any, Optional, Generic, TypeVar

class BaseResponse(BaseModel):
    success: bool
    message: str

