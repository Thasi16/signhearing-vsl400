param([switch]$Production)
$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
$runtimeRoot = Join-Path $projectRoot '.runtime'
New-Item -ItemType Directory -Path $runtimeRoot -Force | Out-Null

$nodeCommand = Get-Command node -ErrorAction SilentlyContinue
$nodePath = if ($nodeCommand) { $nodeCommand.Source } else {
    $portableRoot = [System.IO.Path]::GetFullPath((Join-Path $projectRoot '..\..\.tools'))
    $candidate = Get-ChildItem -LiteralPath $portableRoot -Filter 'node-v*-win-x64' -Directory -ErrorAction SilentlyContinue | Sort-Object Name -Descending | Select-Object -First 1
    if ($candidate) { Join-Path $candidate.FullName 'node.exe' }
}
if (-not $nodePath -or -not (Test-Path -LiteralPath $nodePath)) { throw 'Install Node.js 22+ and run npm ci in frontend first.' }
$pythonPath = Join-Path $projectRoot 'backend\.venv\Scripts\python.exe'
if (-not (Test-Path -LiteralPath $pythonPath)) { throw 'Run uv sync in backend first.' }
foreach ($port in @(3000,8001)) {
    $probe = New-Object System.Net.Sockets.TcpClient
    $occupied = $false
    try { $occupied = $probe.ConnectAsync('127.0.0.1', $port).Wait(250) -and $probe.Connected } catch { $occupied = $false } finally { $probe.Dispose() }
    if ($occupied) {
        throw "Port $port is already occupied; no existing process was stopped."
    }
}
if (-not $Production) {
    & $nodePath (Join-Path $projectRoot 'frontend\scripts\sync-content.mjs')
    if ($LASTEXITCODE -ne 0) { throw 'Content synchronization failed.' }
}
$backendProcess = Start-Process -FilePath $pythonPath -ArgumentList @('-m','uvicorn','app.main:app','--host','127.0.0.1','--port','8001') -WorkingDirectory (Join-Path $projectRoot 'backend') -WindowStyle Hidden -RedirectStandardOutput (Join-Path $runtimeRoot 'backend.out.log') -RedirectStandardError (Join-Path $runtimeRoot 'backend.err.log') -PassThru
$nextCommand = if ($Production) { 'start' } else { 'dev' }
$nextCli = Join-Path $projectRoot 'frontend\node_modules\next\dist\bin\next'
$frontendProcess = Start-Process -FilePath $nodePath -ArgumentList @($nextCli,$nextCommand,'--hostname','127.0.0.1','--port','3000') -WorkingDirectory (Join-Path $projectRoot 'frontend') -WindowStyle Hidden -RedirectStandardOutput (Join-Path $runtimeRoot 'frontend.out.log') -RedirectStandardError (Join-Path $runtimeRoot 'frontend.err.log') -PassThru
@{ backend = $backendProcess.Id; frontend = $frontendProcess.Id } | ConvertTo-Json | Set-Content -LiteralPath (Join-Path $runtimeRoot 'processes.json')
Write-Output "Frontend: http://127.0.0.1:3000 (PID $($frontendProcess.Id))"
Write-Output "Learning: http://127.0.0.1:3000/app"
Write-Output "API: http://127.0.0.1:8001/api/health (PID $($backendProcess.Id))"
Write-Output "Logs: $runtimeRoot"
