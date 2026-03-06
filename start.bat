@echo off
chcp 65001 > nul
setlocal enabledelayedexpansion

echo.
echo ═══════════════════════════════════════════════════════
echo        BarberShop - Auto Startup Script
echo ═══════════════════════════════════════════════════════
echo.

REM Verificar se MongoDB já está rodando
echo [1/3] Verificando MongoDB...
tasklist | findstr /I "mongod" >nul
if %errorlevel% equ 0 (
    echo ✓ MongoDB já está rodando
) else (
    echo ✗ MongoDB não está rodando
    echo.
    echo Abrindo MongoDB...
    start "MongoDB" mongod
    timeout /t 3 /nobreak
)

REM Iniciar Backend
echo.
echo [2/3] Iniciando Backend...
start "BarberShop Backend" cmd /k "cd backend && npm run dev"
timeout /t 3 /nobreak

REM Iniciar Frontend
echo.
echo [3/3] Iniciando Frontend...
start "BarberShop Frontend" cmd /k "cd frontend && npm start"

echo.
echo ═══════════════════════════════════════════════════════
echo ✓ Iniciando aplicação...
echo.
echo URLs:
echo   Frontend:  http://localhost:3000
echo   Backend:   http://localhost:5000
echo   Health:    http://localhost:5000/health
echo.
echo Mantendo este terminal aberto...
echo ═══════════════════════════════════════════════════════
echo.
pause
