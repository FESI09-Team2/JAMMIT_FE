import { WishResponse } from '@/types/wish';
import { apiClient } from '@/utils/apiClient';

export async function getReview({
  queryKey,
  pageParam = 0,
}: {
  queryKey: [string, { includeCanceled: boolean }];
  pageParam: number;
}): Promise<WishResponse> {
  const [, { includeCanceled }] = queryKey;

  return await apiClient.get(
    `/gatherings/{gatheringId}/participants/my?includeCanceled=${includeCanceled}&page=${pageParam}&size=8`,
  );
}
