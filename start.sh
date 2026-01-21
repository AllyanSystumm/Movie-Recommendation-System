#!/bin/bash

# Define colors for output
GREEN='\033[0;32m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting manual Docker build and run sequence...${NC}"

# Create network if it doesn't exist
docker network create movie-net 2>/dev/null || true

# Build Backend
echo -e "${GREEN}Building Backend Image...${NC}"
docker build -t movie-backend -f backend/Dockerfile .

# Build Frontend
echo -e "${GREEN}Building Frontend Image...${NC}"
docker build -t movie-frontend -f frontend/Dockerfile frontend

# Remove existing containers if they exist
echo -e "${GREEN}Cleaning up old containers...${NC}"
docker rm -f movie-backend movie-frontend 2>/dev/null || true

# Run Backend
echo -e "${GREEN}Starting Backend Container...${NC}"
docker run -d \
  --name movie-backend \
  --network movie-net \
  -p 8000:8000 \
  -v "$(pwd)/backend:/app/backend" \
  movie-backend

# Run Frontend
echo -e "${GREEN}Starting Frontend Container...${NC}"
docker run -d \
  --name movie-frontend \
  --network movie-net \
  -p 3000:80 \
  movie-frontend

echo -e "${GREEN}Deployment Complete!${NC}"
echo "Frontend: http://localhost:3000"
echo "Backend: http://localhost:8000"
