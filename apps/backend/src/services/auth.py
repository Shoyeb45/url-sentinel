from fastapi import Depends
from repositories.auth import UserRepository, get_user_repository


class AuthService:
    def __init__(self, user_repo):
        self.user_repository = user_repo
        pass
    
    async def register(self):
        return {"msg":" register"}
    

def get_auth_service(user_repository: UserRepository = Depends(get_user_repository)):
    return AuthService(user_repository)