import { RecruitCardData } from '@/types/card';
export interface GatheringsResponse {
  gatherings: {
    id: number;
    name: string;
    place: string;
    thumbnail: string;
    gatheringDateTime: string;
    totalRecruit: number;
    totalCurrent: number;
    viewCount: number;
    recruitDeadline: string;
    status: 'RECRUITING' | 'CLOSED' | string;
    genres: string[];
    creator: {
      id: number;
      nickname: string;
    };
    sessions: {
      bandSession: string;
      recruitCount: number;
      currentCount: number;
    };
  }[];
  currentPage: number;
  totalPage: number;
  totalElements: number;
}

export interface GetUserGatheringsParams {
  page: number;
  size: number;
  includeCanceled?: boolean;
}

export interface GatheringListData {
  gatherings: RecruitCardData[];
  currentPage: number;
  totalPage: number;
  totalElements: number;
}

export interface CreatedProps {
  initialData?: GatheringListData;
}
