import { getUserParicipantsGatherings } from '@/lib/gathering/participants';
import { useQuery } from '@tanstack/react-query';

export const useGatherMeCreate = () =>
  useQuery({
    queryKey: ['me'],
    queryFn: getUserParicipantsGatherings,
    retry: true,
  });
