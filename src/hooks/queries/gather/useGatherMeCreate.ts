import { getUserCreatedGatherings } from '@/lib/gathering/created';
import { useQuery } from '@tanstack/react-query';

export const useUserMeQuery = () =>
  useQuery({
    queryKey: ['me'],
    queryFn: getUserCreatedGatherings,
    retry: true,
  });
