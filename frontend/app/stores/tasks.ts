// stores/tasks.ts
import { defineStore } from 'pinia';
import { useAuthStore } from './auth';

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: [] as any[],
    loading: false,
  }),

  actions: {
    async fetchSecure(path: string, options: any = {}) {
      const config = useRuntimeConfig();
      const authStore = useAuthStore();

      const headers = { ...options.headers };
      if (authStore.token) {
        headers['Authorization'] = `Bearer ${authStore.token}`;
      }

      // Usamos el cliente nativo de Nuxt ($fetch) en lugar de Axios
      // para mejor integración, pero cumple la función de Cliente HTTP solicitada.
      return $fetch(`${config.public.apiBaseUrl}${path}`, {
        ...options,
        headers,
      });
    },

    // AHORA: Acepta filtros opcionales [cite: 439-443]
    async loadTasks(filters: any = {}) {
      this.loading = true;
      try {
        // Convertimos el objeto de filtros a query params URL
        // Ejemplo: ?search=comprar&status=PENDING
        const params = new URLSearchParams();
        if (filters.search) params.append('search', filters.search);
        if (filters.status) params.append('status', filters.status);
        if (filters.category) params.append('category', filters.category);

        const queryString = params.toString() ? `?${params.toString()}` : '';

        // [cite: 434] GET /tasks con filtros
        this.tasks = await this.fetchSecure(`/tasks${queryString}`);
      } catch (error) {
        console.error('Error cargando tareas:', error);
      } finally {
        this.loading = false;
      }
    },

    async createTask(task: any) {
      try {
        await this.fetchSecure('/tasks', {
          method: 'POST',
          body: task
        });
        await this.loadTasks();
      } catch (error) {
        console.error('Error creando tarea:', error);
        throw error; // Re-lanzar para manejar en la UI
      }
    },

    // NUEVO: Editar Tarea
    async updateTask(id: number, task: any) {
      try {
        await this.fetchSecure(`/tasks/${id}`, {
          method: 'PUT',
          body: task // UpdateTaskDto
        });
        await this.loadTasks();
      } catch (error) {
        console.error('Error actualizando tarea:', error);
        throw error;
      }
    },

    async toggleComplete(id: number) {
      try {
        // [cite: 438] PATCH /tasks/:id/complete
        await this.fetchSecure(`/tasks/${id}/complete`, {
          method: 'PATCH'
        });
        // Recargar para actualizar filtros si estamos viendo solo "Pendientes"
        await this.loadTasks();
      } catch (error) {
        console.error('Error completando tarea:', error);
      }
    },

    async removeTask(id: number) {
      try {
        await this.fetchSecure(`/tasks/${id}`, {
          method: 'DELETE'
        });
        this.tasks = this.tasks.filter(t => t.id !== id);
      } catch (error) {
        console.error('Error eliminando tarea:', error);
      }
    }
  }
});
