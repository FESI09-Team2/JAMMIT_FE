export interface VideoItem {
  id: string;
  title: string;
  thumbnailUrl: string;
  nickname: string;
  createdAt: string;
  viewCount: number;
  duration: string;
}

export interface GetVideoListResponse {
  page: number;
  take: number;
  total: number;
  pages: number;
  data: VideoItem[];
}
