// import { RecruitCardData } from '@/types/card';
// MEMO: 임시 방편, recurit 변경되면 맞출게요
import { GatheringCard } from '@/types/card';

/** gather에 대한 get을 했을때 오는 response */
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

/** gather에 대한 get을 했을때 보내야하는 parameter */
export interface GetUserGatheringsParams {
  page: number;
  size: number;
  includeCanceled?: boolean;
}

/** mypage에서 gather에 대한 props 전달 값 */
export interface InitialGatherData {
  initialData: {
    gatherings: GatheringCard[];
    currentPage: number;
    totalPage: number;
    totalElements: number;
  };
}
