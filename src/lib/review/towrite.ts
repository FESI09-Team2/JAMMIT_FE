import { ReviewWriteResponse } from '@/types/review';
import { apiClient } from '@/utils/apiClient';

export async function getReviewWrite(): Promise<ReviewWriteResponse> {
  return await apiClient.get<ReviewWriteResponse>('/review/unwritten');
}
