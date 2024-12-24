<template>
  <div class="flex flex-col justify-start items-stretch mt-4">
    <div class="flex justify-between items-center">
      <button
        class="border p-2 rounded disabled:text-neutral-300"
        :disabled="pagination.currentPage === 1"
        @click="changePage(pagination.currentPage - 1)"
      >
        Previous
      </button>
      <span>Page {{ pagination.currentPage }} of {{ pagination.totalPages }}</span>
      <button
        class="border p-2 rounded disabled:text-neutral-300"
        :disabled="pagination.currentPage === pagination.totalPages"
        @click="changePage(pagination.currentPage + 1)"
      >
        Next
      </button>
    </div>
    <div class="flex justify-between items-center mt-4 p-2 bg-neutral-100">
      <label for="pagesize">Page Size:</label>
      <select name='pagesize' class="border p-2 ml-4" v-model="localPageSize" @change="updatePageSize">
        <option :value="5">5</option>
        <option :value="10" selected>10</option>
        <option :value="20">20</option>
        <option :value="50">50</option>
      </select>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  pagination: {
    type: Object,
    default: () => ({
      currentPage: 1,
      pageSize: 10,
    }),
  },
});
const emit = defineEmits(['pageChange']);

const localPageSize = ref(props.pagination.pageSize);

function updatePageSize() {
  emit('pageSizeChange', localPageSize.value);
}

function changePage(newPage) {  
  emit('pageChange', newPage);
}
</script>
