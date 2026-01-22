<template>
  <div class="flex justify-center items-center min-h-[80vh]">
    <div class="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-100">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-extrabold text-gray-900">Bienvenido</h2>
        <p class="text-gray-500 mt-2">Ingresa a tu cuenta para continuar</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-5">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
          <input
            v-model="form.email"
            type="email"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            required
            placeholder="tu@email.com"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
          <input
            v-model="form.password"
            type="password"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            required
            placeholder="••••••"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-indigo-700 transition shadow-md hover:shadow-lg transform active:scale-95"
        >
          Iniciar Sesión
        </button>
      </form>

      <p class="mt-6 text-center text-sm text-gray-600">
        ¿No tienes cuenta?
        <NuxtLink to="/register" class="text-indigo-600 hover:text-indigo-500 font-medium">Regístrate gratis</NuxtLink>
      </p>
    </div>

    <BaseModal
      :isOpen="showErrorModal"
      title="Error de Autenticación"
      @close="showErrorModal = false"
    >
      <div class="text-center">
        <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
          <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <p class="text-gray-600">{{ authStore.error }}</p>
      </div>
      <template #footer>
        <button
          @click="showErrorModal = false"
          class="w-full bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 font-medium"
        >
          Entendido
        </button>
      </template>
    </BaseModal>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth';

definePageMeta({ middleware: 'guest' });

const authStore = useAuthStore();
const router = useRouter();
const showErrorModal = ref(false);

const form = reactive({
  email: '',
  password: ''
});

const handleLogin = async () => {
  const success = await authStore.login(form.email, form.password);
  if (success) {
    router.push('/');
  } else {
    // Si falla, activamos el modal
    showErrorModal.value = true;
  }
};
</script>
