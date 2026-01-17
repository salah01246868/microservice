# Script to launch microservices locally on Windows
Write-Host "=== Starting Irrigation Microservices Locally ===" -ForegroundColor Cyan

# Check for Java
if (-not (Get-Command java -ErrorAction SilentlyContinue)) {
    Write-Error "Java not found. Please ensure Java 17+ is installed and in your PATH."
    exit 1
}

# Check for NPM
if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Warning "npm not found. Frontend might not start."
}


# Function to kill process on a specific port
function Stop-PortProcess {
    param (
        [int]$Port
    )
    $process = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue
    if ($process) {
        $pidToAdd = $process.OwningProcess
        Write-Host "Stopping process on port $Port (PID: $pidToAdd)..." -ForegroundColor Yellow
        Stop-Process -Id $pidToAdd -Force -ErrorAction SilentlyContinue
    }
}

# 0. Cleanup Ports
Write-Host "Cleaning up ports..." -ForegroundColor Cyan
Stop-PortProcess -Port 8761 # Discovery
Stop-PortProcess -Port 8888 # Config
Stop-PortProcess -Port 8887 # Gateway
Stop-PortProcess -Port 8081 # Collecte
Stop-PortProcess -Port 8082 # Analyse
Stop-PortProcess -Port 4200 # Frontend

# 1. Start Infrastructure
Write-Host "Starting Discovery Service..." -ForegroundColor Green
Start-Process -FilePath "java" -ArgumentList "-jar", "discovery-service/target/discovery-service-1.0.0.jar" -RedirectStandardOutput "discovery.log" -RedirectStandardError "discovery.err" -WindowStyle Hidden
Start-Sleep -Seconds 5

Write-Host "Starting Config Service..." -ForegroundColor Green
Start-Process -FilePath "java" -ArgumentList "-jar", "config-service/target/config-service-1.0.0.jar" -RedirectStandardOutput "config.log" -RedirectStandardError "config.err" -WindowStyle Hidden
Start-Sleep -Seconds 10

# 2. Start Services
Write-Host "Starting Gateway Service..." -ForegroundColor Green
Start-Process -FilePath "java" -ArgumentList "-jar", "gateway-service/target/gateway-service-1.0.0.jar" -RedirectStandardOutput "gateway.log" -RedirectStandardError "gateway.err" -WindowStyle Hidden

Write-Host "Starting Collecte Service..." -ForegroundColor Green
Start-Process -FilePath "java" -ArgumentList "-jar", "collecte-service/target/collecte-service-1.0.0.jar" -RedirectStandardOutput "collecte.log" -RedirectStandardError "collecte.err" -WindowStyle Hidden

Write-Host "Starting Analyse Service..." -ForegroundColor Green
Start-Process -FilePath "java" -ArgumentList "-jar", "analyse-service/target/analyse-service-1.0.0.jar" -RedirectStandardOutput "analyse.log" -RedirectStandardError "analyse.err" -WindowStyle Hidden

# 3. Start Frontend
Write-Host "Starting Frontend (Angular)..." -ForegroundColor Green
if (Test-Path "angular-frontend") {
    Push-Location "angular-frontend"
    # Using cmd /c to bypass PowerShell Execution Policy for npm scripts
    Start-Process -FilePath "cmd" -ArgumentList "/c", "npm", "start" -RedirectStandardOutput "../frontend.log" -RedirectStandardError "../frontend.err" -WindowStyle Hidden
    Pop-Location
} else {
    Write-Warning "angular-frontend directory not found."
}

Write-Host "=== Services are starting in the background. Check *.log files for details. ===" -ForegroundColor Cyan
Write-Host "Port mapping: Eureka:8761, Config:8888, Gateway:8887, Collecte:8081, Analyse:8082, Frontend:4200"
