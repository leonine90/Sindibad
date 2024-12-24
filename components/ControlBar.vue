<template>
  <div class="flex md:flex-row flex-col justify-between items-start md:items-center p-2 md:mb-4 bg-neutral-100">
    <input
      type="text"
      class="border p-2 rounded w-full md:max-w-[33%]"
      placeholder="Search users..."
      v-model="localSearchQuery"
      @input="updateSearch"
    />

    <div class="flex gap-4 p-2 md:max-w-[33%] mt-2 md:mt-0">
      Sort By:
      <div v-for="sort in localSorting" :key="sort.key">
        <span @click="toggleSort(sort.key)" class="cursor-pointer">
          {{ sort.label }}
          <span class="ml-2">
            {{ getSortIcon(sort.key) }}
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';

const props = defineProps({
  searchQuery: {
    type: String,
    default: '',
  },
  sorting: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['searchQueryChange', 'sortChange']);

const localSearchQuery = ref(props.searchQuery);
const localSorting = ref([]);

const sortOptions = [
  { key: 'name', label: 'Name' },
  { key: 'date', label: 'Date' },
];

function initializeSorting() {
  localSorting.value = sortOptions.map((option) => {
    const existingSort = props.sorting.find((s) => s.key === option.key);

    return {
      key: option.key,
      label: option.label,
      order: existingSort ? existingSort.order : '',
    };
  });
}

watch(() => props.sorting, initializeSorting, { immediate: true });

function updateSearch() {
  emit('searchQueryChange', localSearchQuery.value);
}

function toggleSort(column) {
  const currentSort = localSorting.value.find((s) => s.key === column);

  if (currentSort.order === '') {
    currentSort.order = 'asc';
  } else if (currentSort.order === 'asc') {
    currentSort.order = 'desc';
  } else {
    currentSort.order = '';
  }

  emit('sortChange', { key: column, order: currentSort.order });
}

function getSortIcon(column) {
  const sortEntry = localSorting.value.find((s) => s.key === column);
  if (!sortEntry || sortEntry.order === '') return '↕️';
  return sortEntry.order === 'asc' ? '🔼' : '🔽';
}

onMounted(initializeSorting);
</script>
