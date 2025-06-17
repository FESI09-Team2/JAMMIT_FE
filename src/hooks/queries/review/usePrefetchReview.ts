import { getReviewRead } from '@/lib/review/reviewRead';
import { ReviewRequest } from '@/types/review';
import { useQuery } from '@tanstack/react-query';

export const useReviewQuery = ({ gatheringId, userId }: ReviewRequest) => {
  return useQuery({
    queryKey: ['prefetch_review', gatheringId, userId],
    queryFn: () => getReviewRead({ gatheringId, userId }),
  });
};
