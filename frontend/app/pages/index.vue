<template>
  <div>
    <div class="flex flex-col md:flex-row justify-between items-end md:items-center mb-6 gap-4">
      <div>
        <h1 class="text-3xl font-extrabold text-gray-900 tracking-tight">Mis Tareas</h1>
        <p class="text-gray-500 mt-1">Gestión avanzada de pendientes</p>
      </div>
      <button
        @click="openCreateModal"
        class="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2 font-medium active:scale-95 transform whitespace-nowrap"
      >
        <span class="text-xl leading-none">+</span> Nueva Tarea
      </button>
    </div>

    <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-8 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
      <div class="md:col-span-6 relative">
        <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
        <input
          v-model="filters.search"
          @input="applyFilters"
          type="text"
          placeholder="Buscar tareas..."
          class="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
        />
      </div>

      <div class="md:col-span-3">
        <select
          v-model="filters.status"
          @change="applyFilters"
          class="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer"
        >
          <option value="">Todos los estados</option>
          <option value="PENDING">Pendientes</option> <option value="COMPLETED">Completadas</option>
        </select>
      </div>

      <div class="md:col-span-3">
        <input
          v-model="filters.category"
          @input="applyFilters"
          type="text"
          placeholder="Filtrar por categoría..."
          class="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>
    </div>

    <div v-if="tasksStore.loading" class="flex justify-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-4 border-indigo-100 border-t-indigo-600"></div>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="task in tasksStore.tasks"
        :key="task.id"
        class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all flex flex-col justify-between h-full group relative overflow-hidden"
      >
        <div
          class="absolute left-0 top-0 bottom-0 w-1.5 transition-colors"
          :class="task.completed ? 'bg-green-500' : 'bg-indigo-500'"
        ></div>

        <div class="pl-2">
          <div class="flex justify-between items-start mb-3">
            <span v-if="task.category" class="px-2.5 py-1 bg-gray-50 text-gray-600 text-xs font-bold rounded-md uppercase tracking-wider border border-gray-200">
              {{ task.category }}
            </span>
            <span v-if="task.dueDate" class="text-xs text-gray-500 font-medium flex items-center gap-1 bg-gray-50 px-2 py-1 rounded">
              📅 {{ formatDate(task.dueDate) }}
            </span>
          </div>

          <h3
            class="text-lg font-bold text-gray-900 mb-2 break-words leading-tight"
            :class="{ 'line-through text-gray-400': task.completed }"
          >
            {{ task.title }}
          </h3>

          <p class="text-gray-500 text-sm line-clamp-3 mb-4 leading-relaxed">
            {{ task.description || 'Sin detalles adicionales.' }}
          </p>
        </div>

        <div class="flex justify-between items-center mt-auto pl-2 pt-4 border-t border-gray-50">
          <button
            @click="tasksStore.toggleComplete(task.id)"
            class="px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide transition-colors flex items-center gap-1.5"
            :class="task.completed ? 'text-green-700 bg-green-50 hover:bg-green-100' : 'text-indigo-600 bg-indigo-50 hover:bg-indigo-100'"
          >
            <span v-if="task.completed">✓ Lista</span>
            <span v-else>○ Pendiente</span>
          </button>

          <div class="flex gap-1">
            <button
              @click="openEditModal(task)"
              class="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
              title="Editar tarea"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>

            <button
              @click="openDeleteModal(task.id)"
              class="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Eliminar tarea"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div v-if="tasksStore.tasks.length === 0 && !tasksStore.loading" class="col-span-full text-center py-20 bg-white rounded-xl border-2 border-dashed border-gray-200">
        <div class="text-5xl mb-4 opacity-30">🔍</div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">No se encontraron tareas</h3>
        <p class="text-gray-500">Prueba ajustando los filtros o crea una nueva tarea.</p>
      </div>
    </div>

    <BaseModal
      :isOpen="isCreateModalOpen"
      :title="isEditing ? 'Editar Tarea' : 'Nueva Tarea'"
      @close="closeCreateModal"
    >
      <form @submit.prevent="handleSaveTask" class="space-y-5">
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-1">Título <span class="text-red-500">*</span></label>
          <input
            v-model="formTask.title"
            type="text"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            placeholder="Ej: Revisar reporte mensual"
          />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
            <input
              v-model="formTask.category"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Fecha Límite</label>
            <input
              v-model="formTask.dueDate"
              type="date"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <textarea
            v-model="formTask.description"
            rows="3"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none transition-all"
            placeholder="Detalles..."
          ></textarea>
        </div>
      </form>

      <template #footer>
        <button @click="closeCreateModal" class="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium">
          Cancelar
        </button>
        <button
          @click="handleSaveTask"
          class="px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition shadow-md font-medium flex items-center gap-2"
          :disabled="isSaving"
        >
          <span v-if="isSaving" class="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
          {{ isSaving ? 'Guardando...' : 'Guardar' }}
        </button>
      </template>
    </BaseModal>

    <BaseModal
      :isOpen="isDeleteModalOpen"
      title="¿Eliminar tarea?"
      @close="closeDeleteModal"
    >
      <div class="flex items-start gap-4">
        <div class="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:h-10 sm:w-10">
          <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <div>
          <h3 class="text-sm font-medium text-gray-900">Esta acción es permanente</h3>
          <p class="text-sm text-gray-500 mt-2">
            ¿Estás seguro de que quieres eliminar esta tarea?
          </p>
        </div>
      </div>
      <template #footer>
        <button @click="closeDeleteModal" class="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg">Cancelar</button>
        <button @click="confirmDelete" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Eliminar</button>
      </template>
    </BaseModal>
  </div>
</template>

<script setup>
import { useTasksStore } from '~/stores/tasks';
import { debounce } from 'lodash'; // Si tienes lodash, o usar un debounce manual simple

definePageMeta({ middleware: 'auth' });
const tasksStore = useTasksStore();

// --- Filtros y Búsqueda ---
const filters = reactive({
  search: '',
  status: '',
  category: ''
});

// Debounce manual para evitar peticiones excesivas al escribir
let timeout = null;
const applyFilters = () => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    // Pasar filtros al store [cite: 434]
    tasksStore.loadTasks({ ...filters });
  }, 300);
};

// --- Gestión de Modal (Crear / Editar) ---
const isCreateModalOpen = ref(false);
const isEditing = ref(false); // Flag para saber modo
const editingTaskId = ref(null);
const isSaving = ref(false);

const formTask = reactive({
  title: '',
  description: '',
  category: '',
  dueDate: ''
});

// Abrir en modo CREAR
const openCreateModal = () => {
  isEditing.value = false;
  editingTaskId.value = null;
  resetForm();
  isCreateModalOpen.value = true;
};

const openEditModal = (task) => {
  isEditing.value = true;
  editingTaskId.value = task.id;

  formTask.title = task.title;
  formTask.description = task.description || '';
  formTask.category = task.category || '';
  // Formatear fecha para input type="date" (YYYY-MM-DD)
  formTask.dueDate = task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '';

  isCreateModalOpen.value = true;
};

const closeCreateModal = () => {
  isCreateModalOpen.value = false;
  resetForm();
};

const resetForm = () => {
  formTask.title = '';
  formTask.description = '';
  formTask.category = '';
  formTask.dueDate = '';
};

// Guardar (Discrimina entre Crear o Actualizar)
const handleSaveTask = async () => {
  if (!formTask.title.trim()) return;

  isSaving.value = true;
  try {
    const payload = {
      title: formTask.title,
      description: formTask.description || undefined,
      category: formTask.category || undefined,
      dueDate: formTask.dueDate ? new Date(formTask.dueDate).toISOString() : undefined
    };

    if (isEditing.value && editingTaskId.value) {
      // LLamar a endpoint PUT
      await tasksStore.updateTask(editingTaskId.value, payload);
    } else {
      // LLamar a endpoint POST [cite: 435]
      await tasksStore.createTask(payload);
    }

    closeCreateModal();
  } catch (error) {
    console.error(error);
  } finally {
    isSaving.value = false;
  }
};

// --- Eliminación
const isDeleteModalOpen = ref(false);
const taskToDeleteId = ref(null);

const openDeleteModal = (id) => {
  taskToDeleteId.value = id;
  isDeleteModalOpen.value = true;
};
const closeDeleteModal = () => {
  isDeleteModalOpen.value = false;
  taskToDeleteId.value = null;
};
const confirmDelete = async () => {
  if (taskToDeleteId.value) {
    await tasksStore.removeTask(taskToDeleteId.value);
    closeDeleteModal();
  }
};

// Utils
const formatDate = (isoString) => {
  if (!isoString) return '';
  const date = new Date(isoString);
  return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
};

onMounted(() => {
  tasksStore.loadTasks();
});
</script>
