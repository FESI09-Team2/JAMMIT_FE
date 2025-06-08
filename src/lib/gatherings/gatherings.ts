import { GatheringDetailResponse } from '@/types/gathering';
import { apiClient } from '@/utils/apiClient';

export const getGatheringDetail = async (
  id: number,
): Promise<GatheringDetailResponse> => {
  const result = await apiClient.get<GatheringDetailResponse>(
    `/gatherings/${id}`,
  );
  return result;
};
