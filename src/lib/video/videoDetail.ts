import { VideoDetailProp } from '@/types/video';
import { nestApiClient } from '@/utils/apiClient';

export const getVideoDetail = async ({ videoId }: { videoId: string }) => {
  return nestApiClient.get<VideoDetailProp>(`/video/${videoId}`);
};
