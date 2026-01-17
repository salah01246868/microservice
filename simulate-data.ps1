$GATEWAY_URL = "http://localhost:8887"
$COLLECTE_API = "$GATEWAY_URL/api/collecte"
$ANALYSE_API = "$GATEWAY_URL/api/analyse"

Write-Host "=== Irrigation Optimization Simulation ==="

# 1. Create a Capteur
Write-Host "Step 1: Creating a sensor..."
$capteurBody = @{
    type = "HUMIDITE"
    parcelleId = 1
    emplacement = "Zone Powershell"
} | ConvertTo-Json

try {
    $capteurResponse = Invoke-RestMethod -Uri "$COLLECTE_API/capteurs" -Method Post -Body $capteurBody -ContentType "application/json"
    Write-Host "Response: $($capteurResponse | ConvertTo-Json -Depth 1)"
    $capteurId = $capteurResponse.id
} catch {
    Write-Host "Error creating sensors: $_"
    exit 1
}

if (-not $capteurId) {
    Write-Host "Error: Failed to get sensor ID"
    exit 1
}

Write-Host "Sensor created with ID: $capteurId"

# 2. Add Observations
Write-Host "`nStep 2: Adding observations..."

# High humidity - Should NOT trigger watering
$obs1 = @{
    capteurId = $capteurId
    valeur = 80.0
    unite = "%"
    date = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ss")
} | ConvertTo-Json

Invoke-RestMethod -Uri "$COLLECTE_API/observations" -Method Post -Body $obs1 -ContentType "application/json"
Write-Host "Posted High Humidity (80%)"

Start-Sleep -Seconds 2

# Low humidity - Should TRIGGER watering
$obs2 = @{
    capteurId = $capteurId
    valeur = 25.0
    unite = "%"
    date = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ss")
} | ConvertTo-Json

Invoke-RestMethod -Uri "$COLLECTE_API/observations" -Method Post -Body $obs2 -ContentType "application/json"
Write-Host "Posted Low Humidity (25%)"

# 3. Wait for Async Processing
Write-Host "`nStep 3: Waiting for asynchronous analysis (5s)..."
Start-Sleep -Seconds 5

# 4. Check for Recommendations
Write-Host "Step 4: Fetching recommendations for Parcelle 1..."
$recos = Invoke-RestMethod -Uri "$ANALYSE_API/recommandations/1" -Method Get

if ($recos) {
    Write-Host "`nSUCCESS: Recommendations received!"
    $recos | Format-Table
} else {
    Write-Host "`nWARNING: No recommendations found. Kafka might be slow or down."
}

Write-Host "`n=== Simulation Finished ==="
