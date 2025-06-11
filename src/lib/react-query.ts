import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
import { useErrorModalStore } from '@/stores/useErrorModalStore';

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      const meta = query?.meta as { errorMessage?: string };
      const errorMessage =
        (error as Error)?.message || meta?.errorMessage || '데이터 로드 실패';
      useErrorModalStore.getState().open(errorMessage);
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      const errorMessage = (error as Error)?.message || '데이터 로드 실패';
      useErrorModalStore.getState().open(errorMessage);
    },
  }),
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});
