<template>
  <div>
    <ControlBar
      :searchQuery="searchQuery"
      :sorting="sortOptions"
      @searchQueryChange="$emit('searchQueryChange', $event)"
      @sortChange="$emit('sortChange', $event)"
    />
    <div class="overflow-x-auto">
      <table class="table-auto border-collapse w-full">
        <thead class="hidden md:table-header-group">
          <tr>
            <th class="border px-4 py-2">User ID</th>
            <th class="border px-4 py-2">Name</th>
            <th class="border px-4 py-2">Date of Registration</th>
            <th class="border px-4 py-2">Address</th>
            <th class="border px-4 py-2">Phone Number</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id" class="block md:table-row border-b-2 md:border-b-0">
            <td class="table-cell-responsive before-label" data-label="User ID: ">{{ user.id }}</td>
            <td class="table-cell-responsive before-label" data-label="Name: " v-html="highlight(user.name)"></td>
            <td class="table-cell-responsive before-label" data-label="Date: ">{{ user.date }}</td>
            <td class="table-cell-responsive before-label" data-label="Address: " v-html="highlight(user.address)"></td>
            <td class="table-cell-responsive before-label" data-label="Phone: " v-html="highlight(user.phone)"></td>
          </tr>
          <tr v-if="users.length === 0">
            <td colspan="5" class="text-center py-4">No users found</td>
          </tr>
        </tbody>
      </table>
    </div>
    <Pagination
      :pagination="pagination"
      @pageChange="$emit('pageChange', $event)"
      @pageSizeChange="$emit('pageSizeChange', $event)"
    />
  </div>
</template>

<script setup>
import Pagination from './Pagination.vue';
import ControlBar from './ControlBar.vue';
import { highlightText } from '@/utils/highlight.js';

const props = defineProps({
  users: {
    type: Array,
    default: () => [],
  },
  pagination: {
    type: Object,
    default: () => ({
      currentPage: 1,
      pageSize: 10,
    }),
  },
  searchQuery: {
    type: String,
    default: '',
  },
  sorting: {
    type: Array,
    default: [],
  },
});
const emit = defineEmits(['pageChange', 'searchQueryChange', 'sortChange', 'pageSizeChange']);

const sortOptions = [
  { key: 'name', label: 'Name' },
  { key: 'date', label: 'Date' },
];

function highlight(text) {
  return highlightText(text, props.searchQuery);
}
</script>
