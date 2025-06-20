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
  totalPage: number;
  page: number;
  data: VideoItem[];
}
