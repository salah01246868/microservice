#!/bin/bash
# Script to deploy microservices to Kubernetes (minikube/k8s)

K8S_DIR="./docker-k8s"

echo "=== Deploying to Kubernetes ==="

# Apply manifests in order
echo "Applying Discovery Service..."
kubectl apply -f $K8S_DIR/discovery-k8s.yaml

echo "Applying Config Service..."
kubectl apply -f $K8S_DIR/config-k8s.yaml

echo "Applying Kafka Infrastructure..."
kubectl apply -f $K8S_DIR/kafka-k8s.yaml

echo "Waiting for infrastructure to be ready (30s)..."
sleep 30

echo "Applying Backend Services..."
kubectl apply -f $K8S_DIR/gateway-k8s.yaml
kubectl apply -f $K8S_DIR/collecte-k8s.yaml
kubectl apply -f $K8S_DIR/analyse-k8s.yaml

echo "Applying Frontend..."
kubectl apply -f $K8S_DIR/frontend-k8s.yaml

echo -e "\n=== Deployment to K8s Finished ==="
echo "Check pods status with: kubectl get pods"
