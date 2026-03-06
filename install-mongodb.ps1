# Script para instalar MongoDB automaticamente no Windows

Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "Instalador MongoDB - BarberShop" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""

# Verificar se tem permissão de Admin
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")
if (-not $isAdmin) {
    Write-Host "✗ ERRO: Execute este script como Administrador!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Clique com botão direito no PowerShell → Executar como administrador" -ForegroundColor Yellow
    Write-Host ""
    pause
    exit 1
}

Write-Host "✓ Executando como Administrador" -ForegroundColor Green
Write-Host ""

# Verificar se mongod já está instalado
Write-Host "Verificando se MongoDB já está instalado..." -ForegroundColor Yellow
$mongoPath = Get-Command mongod -ErrorAction SilentlyContinue
if ($mongoPath) {
    Write-Host "✓ MongoDB já está instalado!" -ForegroundColor Green
    Write-Host "   Localização: $($mongoPath.Source)" -ForegroundColor Green
    Write-Host ""
    pause
    exit 0
}

Write-Host "✗ MongoDB não encontrado" -ForegroundColor Red
Write-Host ""

# Verificar se tem Chocolatey
Write-Host "Verificando Chocolatey (gerenciador de pacotes)..." -ForegroundColor Yellow
$chocoPath = Get-Command choco -ErrorAction SilentlyContinue
if (-not $chocoPath) {
    Write-Host "✗ Chocolate não está instalado" -ForegroundColor Red
    Write-Host ""
    Write-Host "Instalando Chocolatey..." -ForegroundColor Yellow
    Write-Host ""
    
    try {
        Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process -Force
        [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
        Invoke-Expression ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
        Write-Host "✓ Chocolatey instalado!" -ForegroundColor Green
    } catch {
        Write-Host "✗ Erro ao instalar Chocolatey" -ForegroundColor Red
        Write-Host "   Erro: $_" -ForegroundColor Red
        Write-Host ""
        Write-Host "ALTERNATIVA: Use MongoDB Atlas (nuvem, grátis)" -ForegroundColor Yellow
        Write-Host "Veja o arquivo: SETUP-ATLAS.md" -ForegroundColor Cyan
        Write-Host ""
        pause
        exit 1
    }
} else {
    Write-Host "✓ Chocolatey encontrado" -ForegroundColor Green
}

Write-Host ""
Write-Host "Instalando MongoDB Community Edition..." -ForegroundColor Yellow
Write-Host "Isto pode levar alguns minutos..." -ForegroundColor Yellow
Write-Host ""

try {
    choco install mongodb-community -y
    Write-Host ""
    Write-Host "✓ MongoDB instalado com sucesso!" -ForegroundColor Green
    Write-Host ""
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
    Write-Host "Próximos passos:" -ForegroundColor Green
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
    Write-Host ""
    Write-Host "1. Abra um PowerShell normal (não precisa Admin)" -ForegroundColor White
    Write-Host "2. Execute: mongod" -ForegroundColor White
    Write-Host "3. Em outro terminal execute: .\start.bat" -ForegroundColor White
    Write-Host ""
} catch {
    Write-Host "✗ Erro ao instalar MongoDB" -ForegroundColor Red
    Write-Host "   Erro: $_" -ForegroundColor Red
    Write-Host ""
    Write-Host "ALTERNATIVA: Use MongoDB Atlas (nuvem, grátis)" -ForegroundColor Yellow
    Write-Host "Veja o arquivo: SETUP-ATLAS.md" -ForegroundColor Cyan
    Write-Host ""
}

pause
