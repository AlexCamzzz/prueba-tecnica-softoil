// stores/auth.ts
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: useCookie('auth_token').value || null,
    user: null,
    error: null as string | null, // Nuevo estado para errores
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    async fetchUser() {
      if (!this.token) return;
      const config = useRuntimeConfig();

      try {
        const userData = await $fetch(`${config.public.apiBaseUrl}/auth/profile`, {
          headers: { Authorization: `Bearer ${this.token}` }
        });
        this.user = userData;
      } catch (error) {
        console.error('Error fetching user:', error);
        // Si el token no sirve, cerramos sesión
        this.logout();
      }
    },


    // Resetear error antes de nuevas acciones
    clearError() {
      this.error = null;
    },

    async login(email: string, password: string) {
      this.clearError();
      const config = useRuntimeConfig();

      try {
        const data: any = await $fetch(`${config.public.apiBaseUrl}/auth/login`, {
          method: 'POST',
          body: { email, password },
        });

        this.token = data.access_token;
        const cookie = useCookie('auth_token');
        cookie.value = data.access_token;
        await this.fetchUser();
        return true;
      } catch (err: any) {
        // Capturar mensaje del backend o poner uno genérico
        this.error = err.data?.message || 'Credenciales incorrectas o error de servidor.';
        return false;
      }
    },

    async register(name: string, email: string, password: string) {
      this.clearError();
      const config = useRuntimeConfig();

      try {
        await $fetch(`${config.public.apiBaseUrl}/auth/register`, {
          method: 'POST',
          body: { name, email, password },
        });
        return true;
      } catch (err: any) {
        this.error = err.data?.message || 'Error al registrar usuario.';
        return false;
      }
    },

    logout() {
      this.token = null;
      this.user = null;
      this.error = null;
      const cookie = useCookie('auth_token');
      cookie.value = null;
      navigateTo('/login');
    }
  }
});
