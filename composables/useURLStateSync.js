export function useURLStateSync({ searchQuery, sorting, pagination }) {
  const route = useRoute();
  const router = useRouter();

  if (route.query.search) searchQuery.value = route.query.search;

  if (route.query.sort) {
    try {
      sorting.value = JSON.parse(route.query.sort);
    } catch (e) {
      sorting.value = [];
    }
  }

  if (route.query.page) pagination.value.currentPage = parseInt(route.query.page, 10);
  if (route.query.pageSize) pagination.value.pageSize = parseInt(route.query.pageSize, 10);

  watch(
    [searchQuery, sorting, pagination],
    () => {
      const newQuery = {
        ...route.query,
        search: searchQuery.value || undefined,
        sort: sorting.value.length ? JSON.stringify(sorting.value) : undefined,
        page: pagination.value.currentPage !== 1 ? pagination.value.currentPage : undefined,
        pageSize: pagination.value.pageSize !== 10 ? pagination.value.pageSize : undefined,
      };

      Object.keys(newQuery).forEach(
        (key) => newQuery[key] === undefined && delete newQuery[key]
      );

      router.replace({ query: newQuery });
    },
    { deep: true }
  );
}
