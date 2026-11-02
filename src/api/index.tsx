import { Query, QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { PropsWithChildren } from 'react';
import { queryPersister } from './persister';

export const WEEK_IN_MS = 7 * 24 * 60 * 60 * 1000;
export const CACHE_MAX_AGE = WEEK_IN_MS;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
      gcTime: CACHE_MAX_AGE,
      networkMode: 'online',
      refetchOnReconnect: true,
    },
  },
});

export const QueryProvider = ({ children }: PropsWithChildren) => {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister: queryPersister,
        maxAge: CACHE_MAX_AGE,
        buster: 'books-cache',

        dehydrateOptions: {
          shouldDehydrateQuery: (query: Query): boolean =>
            query.state.status === 'success',

          shouldDehydrateMutation: () => false,
        },
      }}
    >
      {children}
    </PersistQueryClientProvider>
  );
};
