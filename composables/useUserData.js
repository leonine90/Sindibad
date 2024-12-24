export function useUserData(users) {
  const searchQuery = ref('');
  const sorting = ref([]);
  const pagination = ref({ currentPage: 1, pageSize: 10 });

  const filteredUsers = computed(() => {
    if (!users || !Array.isArray(users) || users.length === 0) {
      return [];
    }

    if (!searchQuery.value) return users;

    const query = searchQuery.value.toLowerCase();
    return users.filter((user) =>
      ['name', 'phone', 'address']
        .some((field) => user[field]?.toLowerCase().includes(query))
    );
  });

  const sortedUsers = computed(() => {
    if (!filteredUsers.value || filteredUsers.value.length === 0) {
      return [];
    }

    if (sorting.value.length === 0) {
      return filteredUsers.value;
    }

    return [...filteredUsers.value].sort((a, b) => {
      for (const sort of sorting.value) {
        const key = sort.key;
        const order = sort.order === 'asc' ? 1 : -1;

        if (a[key] > b[key]) return order;
        if (a[key] < b[key]) return -order;
      }
      return 0;
    });
  });

  const totalPages = computed(() => {
    if (!sortedUsers.value || sortedUsers.value.length === 0) {
      return 1;
    }
    return Math.ceil(sortedUsers.value.length / pagination.value.pageSize);
  });

  const updatedPagination = computed(() => ({
    ...pagination.value,
    totalPages: totalPages.value,
  }));

  const paginatedUsers = computed(() => {
    if (!sortedUsers.value || sortedUsers.value.length === 0) {
      return [];
    }
    const start = (pagination.value.currentPage - 1) * pagination.value.pageSize;
    return sortedUsers.value.slice(start, start + pagination.value.pageSize);
  });

  function setSearchQuery(query) {
    searchQuery.value = query;
    pagination.value.currentPage = 1;
  }

  function setSort({ key, order }) {
    const existingIndex = sorting.value.findIndex((s) => s.key === key);
    
    if (order) {
      if (existingIndex > -1) {
        sorting.value[existingIndex].order = order;
      } else {
        sorting.value.push({ key, order });
      }
    } else {
      sorting.value.splice(existingIndex, 1);
    }
  }

  function setPage(newPage) {
    pagination.value.currentPage = newPage;
  }

  function setPageSize(newSize) {
    pagination.value.pageSize = newSize;
    pagination.value.currentPage = 1;
  }

  return {
    searchQuery,
    sorting,
    pagination: updatedPagination,
    paginatedUsers,
    setSearchQuery,
    setSort,
    setPage,
    setPageSize,
  };
}
