#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}==================================${NC}"
echo -e "${GREEN}Visitor Form Application Setup${NC}"
echo -e "${GREEN}==================================${NC}"
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${RED}Docker is not installed. Please install Docker first.${NC}"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}Docker Compose is not installed. Please install Docker Compose first.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Docker is installed${NC}"
echo -e "${GREEN}✓ Docker Compose is installed${NC}"
echo ""

# Check for .env files
echo -e "${YELLOW}Checking environment configuration...${NC}"

if [ ! -f "backend/.env" ]; then
    echo -e "${YELLOW}Backend .env file not found. Creating from example...${NC}"
    if [ -f "backend/.env.example" ]; then
        cp backend/.env.example backend/.env
        echo -e "${GREEN}✓ Created backend/.env from example${NC}"
        echo -e "${RED}⚠ Please edit backend/.env with your database credentials${NC}"
    else
        echo -e "${RED}✗ backend/.env.example not found${NC}"
    fi
else
    echo -e "${GREEN}✓ Backend .env file exists${NC}"
fi

if [ ! -f "frontend/.env" ]; then
    echo -e "${YELLOW}Frontend .env file not found. Creating from example...${NC}"
    if [ -f "frontend/.env.example" ]; then
        cp frontend/.env.example frontend/.env
        echo -e "${GREEN}✓ Created frontend/.env from example${NC}"
    else
        echo -e "${RED}✗ frontend/.env.example not found${NC}"
    fi
else
    echo -e "${GREEN}✓ Frontend .env file exists${NC}"
fi

echo ""
echo -e "${GREEN}Starting application with Docker Compose...${NC}"
echo ""

# Start Docker Compose
docker-compose up -d

echo ""
echo -e "${GREEN}==================================${NC}"
echo -e "${GREEN}Application Started Successfully!${NC}"
echo -e "${GREEN}==================================${NC}"
echo ""
echo -e "Frontend: ${GREEN}http://localhost:3000${NC}"
echo -e "Backend API: ${GREEN}http://localhost:5000${NC}"
echo -e "Health Check: ${GREEN}http://localhost:5000/health${NC}"
echo ""
echo -e "To view logs: ${YELLOW}docker-compose logs -f${NC}"
echo -e "To stop: ${YELLOW}docker-compose down${NC}"
echo -e "To rebuild: ${YELLOW}docker-compose up -d --build${NC}"
echo ""
