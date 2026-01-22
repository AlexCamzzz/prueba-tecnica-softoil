# Task Manager - Prueba Técnica Full Stack

Solución de la prueba técnica **AN-PRT-001**.  
Aplicación completa de gestión de tareas desarrollada bajo arquitectura **Monorepo**, separando servidor y cliente.

---

## Estructura del Proyecto

```
/
├── backend/     # API RESTful (NestJS + Prisma + SQLite)
├── frontend/    # Cliente SPA/SSR (Nuxt 4 + Pinia)
├── start.sh     # Script de inicio para Linux/Mac
└── start.bat    # Script de inicio para Windows
```

---

## Ejecución Rápida (Recomendado)

El proyecto incluye scripts automatizados que se encargan de instalar dependencias (si faltan), configurar la base de datos (Prisma migrate) y levantar ambos servidores en paralelo.

### Linux y macOS

Es necesario dar permisos de ejecución al script la primera vez:

```bash
chmod +x start.sh
./start.sh
```

### Windows

Puedes hacer doble clic en el archivo `start.bat` o ejecutarlo desde la terminal:

```cmd
start.bat
```

> **Nota:** En Windows, el script abrirá dos ventanas de consola adicionales (una para el Backend y otra para el Frontend). Para detener los servidores, cierra dichas ventanas.

---

## Instalación y Ejecución Manual

Si prefieres ejecutar los servicios paso a paso o necesitas depurar uno específicamente:

### 1. Backend (Puerto 3001)

```bash
cd backend
npm install
npx prisma migrate dev --name init
npm run start:dev
```

El servidor estará disponible en `http://localhost:3001`

### 2. Frontend (Puerto 3000)

```bash
cd frontend
npm install
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

---

## Stack Tecnológico

**Backend**
- NestJS
- SQLite con Prisma ORM
- Passport + JWT + Bcrypt
- Arquitectura modular (Auth, Tasks, Users)

**Frontend**
- Nuxt 4 (Vue.js)
- Nuxt UI + Tailwind CSS
- Pinia para estado global
- TypeScript

---

## Funcionalidades

**Autenticación**
- Registro con validación de email único
- Encriptación de contraseñas
- Login con JWT
- Protección de rutas
- Persistencia de sesión

**Gestión de Tareas**
- Listado completo
- Filtrado por estado y categoría
- Crear, editar y eliminar tareas
- Marcar como completadas
- Campos: título, descripción, fecha límite

---

## API Endpoints

| Método | Ruta           | Descripción              | Requiere Auth |
|--------|----------------|--------------------------|---------------|
| POST   | /auth/register | Registrar usuario        | No            |
| POST   | /auth/login    | Iniciar sesión (JWT)     | No            |
| GET    | /auth/profile  | Obtener perfil           | Sí            |
| GET    | /tasks         | Listar tareas            | Sí            |
| POST   | /tasks         | Crear tarea              | Sí            |
| PATCH  | /tasks/:id     | Actualizar tarea         | Sí            |
| DELETE | /tasks/:id     | Eliminar tarea           | Sí            |

---

## Prerrequisitos

- Node.js (versión LTS v18+ recomendada)
- npm o pnpm
- Git