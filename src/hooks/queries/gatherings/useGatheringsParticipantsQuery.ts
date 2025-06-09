import { getGatheringParticipants } from '@/lib/gatherings/gatherings';
import { useQuery } from '@tanstack/react-query';

export const useGatheringParticipantsQuery = (id: number) => {
  return useQuery({
    queryKey: ['gatheringParticipants', id],
    queryFn: () => getGatheringParticipants(id),
    enabled: !!id,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};
