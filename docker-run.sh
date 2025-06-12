#!/bin/bash

# Build the Docker image
docker build -t overseas-edu-app .

# Stop any existing container
docker stop overseas-edu-app || true
docker rm overseas-edu-app || true

# Run the container
docker run -d \
  --name overseas-edu-app \
  -p 3001:3000 \
  --restart unless-stopped \
  overseas-edu-app 