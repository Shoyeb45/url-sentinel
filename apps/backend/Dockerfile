# Use a slim Python base image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install system dependencies (needed for building some Python packages)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy dependency files first (for caching)
COPY requirements.txt .

# Install Python dependencies
RUN pip install --upgrade pip \
    && pip install -r requirements.txt 

# Copy the rest of the app
COPY . .

# Generate Prisma client
RUN prisma generate

# Expose FastAPI default port
EXPOSE 8000

# Command to run the app
CMD ["python", "src/main.py"]
