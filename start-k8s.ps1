# Script to deploy microservices to Kubernetes (minikube/k8s)
$K8S_DIR = "./docker-k8s"

Write-Host "=== Deploying to Kubernetes ===" -ForegroundColor Cyan

# Apply manifests in order
Write-Host "Applying Discovery Service..." -ForegroundColor Green
kubectl apply -f "$K8S_DIR/discovery-k8s.yaml"

Write-Host "Applying Config Service..." -ForegroundColor Green
kubectl apply -f "$K8S_DIR/config-k8s.yaml"

Write-Host "Applying Kafka Infrastructure..." -ForegroundColor Green
kubectl apply -f "$K8S_DIR/kafka-k8s.yaml"

Write-Host "Waiting for infrastructure to be ready (30s)..." -ForegroundColor Yellow
Start-Sleep -Seconds 30

Write-Host "Applying Backend Services..." -ForegroundColor Green
kubectl apply -f "$K8S_DIR/gateway-k8s.yaml"
kubectl apply -f "$K8S_DIR/collecte-service-k8s.yaml" 2>$null # Fallback if name differs
kubectl apply -f "$K8S_DIR/collecte-k8s.yaml"
kubectl apply -f "$K8S_DIR/analyse-k8s.yaml"

Write-Host "Applying Frontend..." -ForegroundColor Green
kubectl apply -f "$K8S_DIR/frontend-k8s.yaml"

Write-Host "`n=== Deployment to K8s Finished ===" -ForegroundColor Cyan
Write-Host "Check pods status with: kubectl get pods"
