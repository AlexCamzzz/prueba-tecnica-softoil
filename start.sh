#!/bin/bash

echo "=========================================="
echo "Task Manager - Inicializando aplicación"
echo "=========================================="
echo ""

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "Error: Node.js no está instalado"
    echo "Por favor instala Node.js desde https://nodejs.org"
    exit 1
fi

echo "Node.js version: $(node -v)"
echo "npm version: $(npm -v)"
echo ""

# Backend
echo "=========================================="
echo "Configurando Backend..."
echo "=========================================="
cd backend || exit

if [ ! -d "node_modules" ]; then
    echo "Instalando dependencias del backend..."
    npm install
fi

if [ ! -f "prisma/dev.db" ]; then
    echo "Inicializando base de datos..."
    npx prisma migrate dev --name init
fi

echo "Iniciando servidor backend en puerto 3001..."
npm run start:dev &
BACKEND_PID=$!

cd ..

# Esperar a que el backend inicie
sleep 5

# Frontend
echo ""
echo "=========================================="
echo "Configurando Frontend..."
echo "=========================================="
cd frontend || exit

if [ ! -d "node_modules" ]; then
    echo "Instalando dependencias del frontend..."
    npm install
fi

echo "Iniciando aplicación frontend en puerto 3000..."
npm run dev &
FRONTEND_PID=$!

cd ..

echo ""
echo "=========================================="
echo "Aplicación iniciada correctamente"
echo "=========================================="
echo ""
echo "Backend:  http://localhost:3001"
echo "Frontend: http://localhost:3000"
echo ""
echo "Presiona Ctrl+C para detener ambos servidores"
echo ""

# Manejar señal de interrupción para matar ambos procesos al salir
trap "echo ''; echo 'Deteniendo servidores...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT

# Mantener el script en ejecución
wait