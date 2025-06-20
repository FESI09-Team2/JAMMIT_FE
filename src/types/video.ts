export interface VideoDetailProp {
  id: string;
  title: string;
  videoUrl: string;
  viewCount: number;
  likeCount: number;
  description: string;
  nickname: string;
  userId: string;
  thumbnailUrl: string;
  createdAt: string;
}
export interface VideoItem {
  id: string;
  title: string;
  thumbnailUrl: string;
  nickname: string;
  createdAt: string;
  viewCount: number;
  duration: string;
}

export interface WeekTopVideo {
  id: string;
}

export interface GetVideoListResponse {
  totalPage: number;
  page: number;
  data: VideoItem[];
  weekTopVideo: WeekTopVideo;
}
