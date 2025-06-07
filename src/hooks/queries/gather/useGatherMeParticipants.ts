import { getUserParticipantsGatherings } from '@/lib/gathering/participants';
import { useQuery } from '@tanstack/react-query';
import { GetUserGatheringsParams } from '@/types/gather';

export const useGatherMeParticipants = ({
  page,
  size,
  includeCanceled = false,
}: GetUserGatheringsParams) =>
  useQuery({
    queryKey: ['me', 'participants', page, size, includeCanceled],
    queryFn: () =>
      getUserParticipantsGatherings({ page, size, includeCanceled }),
    retry: true,
  });
