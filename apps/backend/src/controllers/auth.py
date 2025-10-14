from fastapi import Depends, HTTPException
from services.auth import AuthService, get_auth_service


class AuthController:
    def __init__(self, auth_service: AuthService):
        self.auth_service = auth_service
        pass
    
    async def register(self):
        return await self.auth_service.register()
          
def get_auth_controller(auth_service: AuthService = Depends(get_auth_service)):
    return AuthController(auth_service)