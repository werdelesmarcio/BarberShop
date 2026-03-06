@echo off
setlocal enabledelayedexpansion

echo ===============================================
echo Teste de Conectividade - BarberShop
echo ===============================================
echo.

REM Testar MongoDB
echo [TESTE 1] MongoDB (porta 27017)
netstat -ano | findstr ":27017" >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ MongoDB: Respondendo
) else (
    echo ✗ MongoDB: NAO ESTA RODANDO
    echo   Abra um terminal Admin e execute: mongod
)
echo.

REM Testar Backend
echo [TESTE 2] Backend (porta 5000)
powershell -Command "(New-Object System.Net.WebClient).DownloadString('http://localhost:5000/health')" 2>nul | findstr "OK" >nul
if %errorlevel% equ 0 (
    echo ✓ Backend: Rodando
) else (
    echo ✗ Backend: NAO ESTA RODANDO
    echo   Execute: cd backend && npm run dev
)
echo.

REM Testar Frontend
echo [TESTE 3] Frontend (porta 3000)
netstat -ano | findstr ":3000" >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ Frontend: Rodando
) else (
    echo - Frontend: Nao esta rodando
    echo   Execute: cd frontend && npm start
)
echo.

echo ===============================================
echo Proximos passos:
echo 1. Abra https://localhost:3000 no navegador
echo 2. Verifique se aparece mensagem de conexao
echo 3. Se tiver erro, verifique os logs acima
echo ===============================================
echo.
pause
