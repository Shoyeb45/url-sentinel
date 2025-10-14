from fastapi import APIRouter, Depends
from controllers.auth import AuthController, get_auth_controller

router = APIRouter(prefix="/auth", tags=["Auth Routes"])

@router.get("/", description="Auth to register user.")
async def register(auth_controller: AuthController = Depends(get_auth_controller)):
    return await auth_controller.register()