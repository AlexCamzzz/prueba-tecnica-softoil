<script setup>
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore();

if (authStore.token && !authStore.user) {
  await authStore.fetchUser();
}
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
