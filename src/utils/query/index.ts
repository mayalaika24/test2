import { QueryClient } from '@tanstack/react-query';

export const queryClientUtils = {
  invalidateAll: (queryClient: QueryClient, key: string) => {
    return queryClient.invalidateQueries({
      predicate: (query) => query.queryKey[0] === key,
    });
  },
};
