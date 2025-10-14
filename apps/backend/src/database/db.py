from fastapi import Request
import prisma


def get_prisma(request: Request) -> prisma:
    return request.app.state.prisma
