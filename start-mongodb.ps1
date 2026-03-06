# Script para iniciar MongoDB no Windows

Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "Iniciador MongoDB - BarberShop" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""

# Verificar se MongoDB está já rodando
Write-Host "Verificando se MongoDB já está rodando..." -ForegroundColor Yellow

$mongoProcess = Get-Process mongod -ErrorAction SilentlyContinue
if ($mongoProcess) {
    Write-Host "✓ MongoDB já está rodando (PID: $($mongoProcess.Id))" -ForegroundColor Green
    Write-Host ""
    Write-Host "Você pode agora iniciar o Backend em outro terminal:" -ForegroundColor Green
    Write-Host "  cd backend" -ForegroundColor White
    Write-Host "  npm run dev" -ForegroundColor White
    Write-Host ""
    pause
    exit
}

Write-Host "MongoDB não encontrado em execução." -ForegroundColor Yellow
Write-Host ""

# Tentar iniciar MongoDB como serviço (se instalado como serviço)
Write-Host "Tentando iniciar MongoDB como serviço do Windows..." -ForegroundColor Yellow

try {
    Get-Service MongoDB -ErrorAction Stop | Out-Null
    Write-Host "✓ Serviço MongoDB encontrado" -ForegroundColor Green
    
    Start-Service MongoDB -ErrorAction Stop
    Write-Host "✓ MongoDB iniciado como serviço" -ForegroundColor Green
    
    Start-Sleep -Seconds 3
    Write-Host "✓ MongoDB pronto!" -ForegroundColor Green
} catch {
    Write-Host "✗ Não conseguiu iniciar como serviço" -ForegroundColor Red
    Write-Host ""
    Write-Host "Tentando executar mongod manualmente..." -ForegroundColor Yellow
    Write-Host ""
    
    try {
        Start-Process mongod -NoNewWindow
        Write-Host "✓ MongoDB iniciado!" -ForegroundColor Green
        Start-Sleep -Seconds 3
    } catch {
        Write-Host "✗ Erro: não conseguiu encontrar o comando mongod" -ForegroundColor Red
        Write-Host ""
        Write-Host "SOLUÇÕES:" -ForegroundColor Yellow
        Write-Host "1. Instale MongoDB Community Edition" -ForegroundColor White
        Write-Host "   Download: https://www.mongodb.com/try/download/community" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "2. Ou use MongoDB Atlas (na nuvem, grátis):" -ForegroundColor White
        Write-Host "   https://www.mongodb.com/cloud/atlas" -ForegroundColor Cyan
        Write-Host "   E configure a URI em backend/.env" -ForegroundColor Cyan
        Write-Host ""
        pause
        exit 1
    }
}

Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
Write-Host "✓ MongoDB está rodando!" -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
Write-Host ""
Write-Host "Próximas etapas:" -ForegroundColor Green
Write-Host "1. Abra outro terminal (PowerShell/CMD)" -ForegroundColor White
Write-Host "2. Navegue até a pasta: cd backend" -ForegroundColor White
Write-Host "3. Inicie o servidor: npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "Mantenha este terminal aberto (MongoDB continuará rodando)" -ForegroundColor Yellow
Write-Host ""
pause
