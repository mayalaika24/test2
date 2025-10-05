import React from 'react';
import { ChildrenType } from '../types';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const ReactQueryProvider: React.FC<ChildrenType> = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 0,
        staleTime: 1000 * 60 * 5,
        // staleTime: 1000 * 30, // 30 seconds - data becomes stale after this time
        // cacheTime: 1000 * 60 * 5, // 5 minutes - cache is kept for this lo
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;
