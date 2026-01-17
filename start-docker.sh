#!/bin/bash
# Script to build and launch microservices via Docker Compose

echo "=== Building and Starting Docker Containers ==="

# Rebuild JARs first to ensure latest config
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
export PATH=$JAVA_HOME/bin:$PATH

echo "Step 1: Rebuilding JARs..."
mvn clean install -DskipTests

echo -e "\nStep 2: Building and starting Docker containers..."
sudo docker compose build --no-cache
sudo docker compose down
sudo docker compose up -d

echo -e "\n=== Deployment Complete ==="
echo "Frontend: http://localhost:8083"
echo "Eureka Console: http://localhost:8761"
echo "Gateway: http://localhost:8887"
