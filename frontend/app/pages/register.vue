<template>
  <div class="flex justify-center items-center h-[80vh]">
    <div class="w-full max-w-md bg-white p-8 rounded-lg shadow-md border border-gray-100">
      <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Crear Cuenta</h2>

      <form @submit.prevent="handleRegister" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            v-model="form.name"
            type="text"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
            placeholder="Tu nombre completo"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input
            v-model="form.email"
            type="email"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
            placeholder="tu@email.com"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Contraseña (min 6 caracteres)</label>
          <input
            v-model="form.password"
            type="password"
            required
            minlength="6"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
            placeholder="••••••"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition font-medium shadow-sm"
          :disabled="isLoading"
        >
          {{ isLoading ? 'Creando cuenta...' : 'Registrarse' }}
        </button>
      </form>

      <p class="mt-4 text-center text-sm text-gray-600">
        ¿Ya tienes cuenta?
        <NuxtLink to="/login" class="text-indigo-600 hover:text-indigo-500 font-medium">Inicia Sesión</NuxtLink>
      </p>
    </div>

    <BaseModal
      :isOpen="showSuccessModal"
      title="¡Cuenta Creada!"
      @close="goToLogin"
    >
      <div class="text-center">
        <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
          <svg class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 class="text-lg leading-6 font-medium text-gray-900">Registro Exitoso</h3>
        <p class="text-sm text-gray-500 mt-2">
          Tu cuenta ha sido creada correctamente. Ahora puedes iniciar sesión con tus credenciales.
        </p>
      </div>
      <template #footer>
        <button
          @click="goToLogin"
          class="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 font-medium transition shadow-sm"
        >
          Ir al Login
        </button>
      </template>
    </BaseModal>

    <BaseModal
      :isOpen="showErrorModal"
      title="Error en el Registro"
      @close="showErrorModal = false"
    >
      <div class="text-center">
        <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
          <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <p class="text-gray-600">{{ authStore.error || 'Ocurrió un problema al crear la cuenta.' }}</p>
      </div>
      <template #footer>
        <button
          @click="showErrorModal = false"
          class="w-full bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 font-medium transition"
        >
          Reintentar
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

// Estados
const showSuccessModal = ref(false);
const showErrorModal = ref(false);
const isLoading = ref(false);

const form = reactive({
  name: '',
  email: '',
  password: ''
});

const handleRegister = async () => {
  isLoading.value = true;
  // Llamada al store
  const success = await authStore.register(form.name, form.email, form.password);
  isLoading.value = false;

  if (success) {
    // Éxito: Mostramos modal verde
    showSuccessModal.value = true;
  } else {
    // Error: Mostramos modal rojo
    showErrorModal.value = true;
  }
};

const goToLogin = () => {
  showSuccessModal.value = false;
  router.push('/login');
};
</script>
