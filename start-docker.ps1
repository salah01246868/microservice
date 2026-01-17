# Script to build and launch microservices via Docker Compose on Windows
Write-Host "=== Building and Starting Docker Containers ===" -ForegroundColor Cyan

# Check for Java 17
if (-not (Get-Command java -ErrorAction SilentlyContinue)) {
    Write-Error "Java not found. Please ensure Java 17+ is installed and in your PATH."
    exit 1
}

# Find Java 17 if possible
$java17Path = "C:\Program Files\Java\jdk-17"
if (Test-Path $java17Path) {
    $env:JAVA_HOME = $java17Path
    Write-Host "Using JAVA_HOME: $env:JAVA_HOME" -ForegroundColor Gray
}

Write-Host "Step 1: Rebuilding JARs..." -ForegroundColor Green
# Find mvn.cmd in the project
$mvnPath = Get-ChildItem -Path . -Filter mvn.cmd -Recurse | Select-Object -First 1 -ExpandProperty FullName
if (-not $mvnPath) {
    Write-Error "Maven (mvn.cmd) not found in the project. Please ensure it exists."
    exit 1
}

& $mvnPath clean install -DskipTests

Write-Host "`nStep 2: Building and starting Docker containers..." -ForegroundColor Green
docker-compose build --no-cache
docker-compose down
docker-compose up -d

Write-Host "`n=== Deployment Complete ===" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:8083"
Write-Host "Eureka Console: http://localhost:8761"
Write-Host "Gateway: http://localhost:8887"
