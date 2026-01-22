@echo off
echo ==========================================
echo Task Manager - Inicializando aplicación
echo ==========================================
echo.

REM Verificar Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
     echo Error: Node.js no está instalado
     echo Por favor instala Node.js desde https://nodejs.org
     REM Intentamos pause, si falla no importa
     pause >nul 2>&1
     exit /b 1
)

REM Usamos 'call' para que el script no muera
node -v
call npm -v
echo.

REM Backend
echo ==========================================
echo Configurando Backend...
echo ==========================================
cd backend

if not exist "node_modules\" (
     echo Instalando dependencias del backend...
     call npm install
)

if not exist "prisma\dev.db" (
     echo Inicializando base de datos...
     call npx prisma migrate dev --name init
)

echo Iniciando servidor backend en puerto 3001...
start "Backend Server" cmd /k "npm run start:dev"

cd ..

REM Esperar a que el backend inicie (5 segundos)
REM CORRECCION: Usamos ping en lugar de timeout para evitar error de input redirection
echo Esperando al backend...
ping 127.0.0.1 -n 6 >nul

REM Frontend
echo.
echo ==========================================
echo Configurando Frontend...
echo ==========================================
cd frontend

if not exist "node_modules\" (
     echo Instalando dependencias del frontend...
     call npm install
)

echo Iniciando aplicación frontend en puerto 3000...
start "Frontend App" cmd /k "npm run dev"

cd ..

echo.
echo ==========================================
echo Aplicación iniciada correctamente
echo ==========================================
echo.
echo Backend:  http://localhost:3001
echo Frontend: http://localhost:3000
echo.
echo Las ventanas de los servidores se abrieron por separado.
echo.

pause >nul 2>&1