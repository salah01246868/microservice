#!/bin/bash

# Configuration
GATEWAY_URL="http://localhost:8887"
COLLECTE_API="$GATEWAY_URL/collecte-service/api/collecte"
ANALYSE_API="$GATEWAY_URL/analyse-service/api/analyse"

echo "=== Irrigation Optimization Simulation ==="

# 1. Create a Capteur
echo "Step 1: Creating a sensor..."
CAPTEUR_JSON='{
  "type": "HUMIDITE",
  "parcelleId": 1,
  "localisation": "Parcelle Nord-Est"
}'
CAPTEUR_RESPONSE=$(curl -s -X POST -H "Content-Type: application/json" -d "$CAPTEUR_JSON" "$COLLECTE_API/capteurs")
echo "Response: $CAPTEUR_RESPONSE"
CAPTEUR_ID=$(echo $CAPTEUR_RESPONSE | grep -oP '"id":\s*\K\d+')

if [ -z "$CAPTEUR_ID" ]; then
  echo "Error: Failed to create sensor or extract ID."
  exit 1
fi
echo "Sensor created with ID: $CAPTEUR_ID"

# 2. Add an Observation (should trigger Kafka event)
echo -e "\nStep 2: Adding an observation (triggering analysis)..."
OBSERVATION_JSON="{
  \"capteurId\": $CAPTEUR_ID,
  \"valeur\": 25.5,
  \"unite\": \"%\",
  \"date\": \"$(date -u +%Y-%m-%dT%H:%M:%S)\"
}"
OBSERVATION_RESPONSE=$(curl -s -X POST -H "Content-Type: application/json" -d "$OBSERVATION_JSON" "$COLLECTE_API/observations")
echo "Response: $OBSERVATION_RESPONSE"

# 3. Wait for Async Processing
echo -e "\nStep 3: Waiting for asynchronous analysis (3s)..."
sleep 3

# 4. Check for Recommendations
echo "Step 4: Fetching recommendations for Parcelle 1..."
RECO_RESPONSE=$(curl -s -X GET "$ANALYSE_API/recommandations/1")
echo "Recommendations: $RECO_RESPONSE"

if [[ $RECO_RESPONSE == *"quantiteEau"* ]]; then
  echo -e "\nSUCCESS: Recommendation received!"
else
  echo -e "\nWARNING: No recommendations found yet. Check if Kafka and services are running."
fi

echo -e "\n=== Simulation Finished ==="
