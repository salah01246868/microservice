#!/bin/bash
# Script to launch microservices locally after Maven build

JAVA_BIN="java"
if command -v /usr/lib/jvm/java-17-openjdk-amd64/bin/java &> /dev/null; then
  JAVA_BIN="/usr/lib/jvm/java-17-openjdk-amd64/bin/java"
fi

echo "=== Starting Irrigation Microservices Locally ==="

# 1. Start Infrastructure
echo "Starting Discovery Service..."
$JAVA_BIN -jar discovery-service/target/discovery-service-1.0.0.jar > discovery.log 2>&1 &
sleep 5

echo "Starting Config Service..."
$JAVA_BIN -jar config-service/target/config-service-1.0.0.jar > config.log 2>&1 &
sleep 10

# 2. Start Services
echo "Starting Gateway Service..."
$JAVA_BIN -jar gateway-service/target/gateway-service-1.0.0.jar > gateway.log 2>&1 &

echo "Starting Collecte Service..."
$JAVA_BIN -jar collecte-service/target/collecte-service-1.0.0.jar > collecte.log 2>&1 &

echo "Starting Analyse Service..."
$JAVA_BIN -jar analyse-service/target/analyse-service-1.0.0.jar > analyse.log 2>&1 &

echo "Starting Frontend (Angular)..."
cd angular-frontend && npm start > ../frontend.log 2>&1 &
cd ..

echo "=== Services are starting in the background. Check *.log files for details. ==="
echo "Port mapping: Eureka:8761, Config:8888, Gateway:8887, Collecte:8081, Analyse:8082, Frontend:4200"

