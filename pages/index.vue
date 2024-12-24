<template>
  <div class="p-4 md:p-8">
    <h1 class="text-2xl font-bold mb-4 text-center">User List</h1>

    <UserList
      :users="paginatedUsers"
      :pagination="pagination"
      :searchQuery="searchQuery"
      :sorting="sorting"
      @searchQueryChange="setSearchQuery"
      @sortChange="setSort"
      @pageChange="setPage"
      @pageSizeChange="setPageSize"
    />
  </div>
</template>

<script setup>
import UserList from '~/components/UserList.vue';
import { useUserData } from '@/composables/useUserData';
import { useURLStateSync } from '@/composables/useURLStateSync';
import users from '@/public/records.json';

const {
  searchQuery,
  sorting,
  pagination,
  paginatedUsers,
  setSearchQuery,
  setSort,
  setPage,
  setPageSize,
} = useUserData(users || []);

useURLStateSync({ searchQuery, sorting, pagination });
</script>
