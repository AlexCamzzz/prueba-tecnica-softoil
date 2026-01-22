<template>
  <div class="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
    <header class="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center">

          <div class="flex items-center">
            <NuxtLink to="/" class="flex items-center gap-2 group">
              <div class="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold group-hover:bg-indigo-700 transition-colors">
                T
              </div>
              <span class="text-xl font-bold text-gray-800 tracking-tight group-hover:text-indigo-600 transition-colors">
                TaskManager
              </span>
            </NuxtLink>
          </div>

          <div class="flex items-center gap-4">

            <template v-if="authStore.isAuthenticated">
              <div class="hidden sm:flex flex-col items-end mr-2 text-right">
                <span class="text-sm font-bold text-gray-700 leading-tight">
                  {{ authStore.user?.name || 'Usuario' }}
                </span>
                <span class="text-xs text-gray-400">
                  {{ authStore.user?.email }}
                </span>
              </div>

              <button
                @click="authStore.logout"
                class="bg-white text-gray-700 hover:text-red-600 border border-gray-300 hover:border-red-300 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm hover:shadow"
              >
                Salir
              </button>
            </template>

            <template v-else>
              <NuxtLink
                to="/login"
                class="text-gray-600 hover:text-indigo-600 font-medium text-sm transition-colors px-3 py-2"
              >
                Ingresar
              </NuxtLink>
              <NuxtLink
                to="/register"
                class="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-md hover:shadow-lg"
              >
                Crear Cuenta
              </NuxtLink>
            </template>

          </div>
        </div>
      </div>
    </header>

    <main class="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <slot />
    </main>

    <footer class="bg-white border-t border-gray-200 mt-auto">
      <div class="max-w-7xl mx-auto px-4 py-6 text-center text-gray-400 text-sm">
        &copy; {{ new Date().getFullYear() }} TaskManager App
      </div>
    </footer>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore();
</script>
