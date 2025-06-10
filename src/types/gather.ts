// import { RecruitCardData } from '@/types/card';
// MEMO: 임시 방편, recurit 변경되면 맞출게요
import { GatheringCard } from '@/types/card';
import { GenreType, BandSessionType, GatheringStatus } from './tags';

/** gather에 대한 get을 했을때 오는 response */
export interface GatheringsResponse {
  gatherings: GatheringCard[];
  /** 현재 페이지 */
  currentPage: number;
  /** 전체 페이지 */
  totalPage: number;
  /** 전체 수 */
  totalElements: number;
}

/** gather에 대한 get을 했을때 보내야하는 parameter */
export interface GetUserGatheringsParams {
  /** 페이지 번호 */
  page: number;
  /** 페이지 크기 */
  size: number;
  /** 취소된 모임 포함 여부 */
  includeCanceled?: boolean;
}

/** gather를 생성할 때 보내야할 request */
export interface RegisterGatheringsRequest {
  name: string;
  thumbnail: string;
  place: string;
  description: string;
  gatheringDateTime: string;
  recruitDateTime: string;
  genres: GenreType[];
  status: GatheringStatus;
  totalRecruitCount: number;
  gatheringsessions: {
    bandSession: BandSessionType;
    recruitCount: number;
    currentCount: number;
  }[];
}

/** gather를 생성할 때 받아야할 response */
export interface RegisterGatheringsResponse {
  id: number;
  name: string;
  message: string;
  gatheringDateTime: string;
  recruitDeadline: string;
  thumbnail: string;
  status: GatheringStatus;
}
