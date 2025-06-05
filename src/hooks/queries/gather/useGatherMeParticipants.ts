import { getUserParticipantsGatherings } from '@/lib/gathering/participants';
import { useQuery } from '@tanstack/react-query';

export const useGatherMeParticipants = () =>
  useQuery({
    queryKey: ['me', 'participants'],
    queryFn: getUserParticipantsGatherings,
    retry: true,
  });
