import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
import { useErrorModalStore } from '@/stores/useErrorModalStore';
import { useToastStore } from '@/stores/useToastStore';

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
    onSuccess: (data, variables, context, mutation) => {
      const meta = mutation?.meta as { successMessage?: string };
      if (meta?.successMessage) {
        useToastStore.getState().show(meta.successMessage);
      }
    },
  }),
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});
