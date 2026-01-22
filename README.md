# Task Manager - Prueba Técnica Full Stack

Solución de la prueba técnica **AN-PRT-001**.  
Aplicación completa de gestión de tareas desarrollada bajo arquitectura **Monorepo**, separando servidor y cliente.

---

## Estructura del Proyecto

```
/
├── backend/     # API RESTful (NestJS + Prisma + SQLite)
└── frontend/    # Cliente SPA/SSR (Nuxt 4 + Pinia)
```

---

## Instalación y Ejecución

### Backend (Puerto 3001)

```bash
cd backend
npm install
npx prisma migrate dev --name init
npm run start:dev
```

El servidor estará disponible en `http://localhost:3001`

### Frontend (Puerto 3000)

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

- Node.js (versión LTS)
- npm o pnpm
- Git