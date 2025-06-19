import { nestApiClient } from '@/utils/nestApiClient';

export interface VideoItem {
  id: string;
  title: string;
  thumbnailUrl: string;
  nickname: string;
  createdAt: string;
}

export interface GetVideoListResponse {
  page: number;
  take: number;
  total: number;
  pages: number;
  data: VideoItem[];
}

export interface GetVideoListParams {
  order?: 'latest' | 'popular';
  take?: number;
  page?: number;
}

export const getVideoList = async ({
  order = 'latest',
  take = 10,
  page = 1,
}: GetVideoListParams): Promise<GetVideoListResponse> => {
  const query = new URLSearchParams({
    order,
    take: take.toString(),
    page: page.toString(),
  }).toString();
  const result = await nestApiClient.get<GetVideoListResponse>(
    `video?${query}`,
  );
  return result;
};
