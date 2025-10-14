from fastapi import Request
from prisma import Prisma


def get_prisma(request: Request) -> Prisma:
    return request.app.state.prisma
