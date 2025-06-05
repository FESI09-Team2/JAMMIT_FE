import { getUserCreatedGatherings } from '@/lib/gathering/created';
import { useQuery } from '@tanstack/react-query';

export const useGatherMeCreate = () =>
  useQuery({
    queryKey: ['me', 'created'],
    queryFn: getUserCreatedGatherings,
    retry: true,
  });
