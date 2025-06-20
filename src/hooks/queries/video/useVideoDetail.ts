import { queryClient } from '@/lib/react-query';
import { getVideoDetail } from '@/lib/video/videoDetail';
import { useQuery } from '@tanstack/react-query';

export const prefetchVideoQuery = ({ videoId }: { videoId: string }) => {
  return queryClient.fetchQuery({
    queryKey: ['video', videoId],
    queryFn: () => getVideoDetail({ videoId }),
  });
};
export const useVideoDetailQuery = ({ videoId }: { videoId: string }) => {
  return useQuery({
    queryKey: ['video', videoId],
    queryFn: () => getVideoDetail({ videoId }),
  });
};
