import { getUserCreatedGatherings } from '@/lib/gathering/created';
import { useQuery } from '@tanstack/react-query';
import { GetUserGatheringsParams } from '@/types/gather';

export const useGatherMeCreate = ({
  page,
  size,
  includeCanceled = false,
}: GetUserGatheringsParams) =>
  useQuery({
    queryKey: ['me', 'created', page, size, includeCanceled],
    queryFn: () => getUserCreatedGatherings({ page, size, includeCanceled }),
    retry: true,
  });
