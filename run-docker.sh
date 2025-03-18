#!/bin/bash

# Exit on error
set -e

# Function to cleanup containers and exit
cleanup() {
    echo "Cleaning up containers..."
    docker-compose down
    exit 0
}

# Trap SIGINT and SIGTERM signals
trap cleanup SIGINT SIGTERM

echo "Stopping any running containers..."
docker-compose down

echo "Removing old images..."
docker rmi restipsum-1_frontend restipsum-1_api 2>/dev/null || true

echo "Building and starting new containers..."
docker-compose up --build

# Cleanup on script end
cleanup 