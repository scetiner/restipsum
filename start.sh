#!/bin/bash

# Create log directory with proper permissions
mkdir -p /app/backend/log && chmod 777 /app/backend/log

# Start the backend server
cd /app/backend
node app.js &

# Start the frontend server
cd /app/frontend
serve -s . -l 8080 &

# Keep the container running
wait 