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
  /** 모임 이름 */
  name: string;
  /** 썸네일 */
  thumbnail: string;
  /** 모임 장소 */
  place: string;
  /** 모임 소개 */
  description: string;
  /** 모임 날짜 */
  gatheringDateTime: string;
  /** 모집 마감 날짜 */
  recruitDateTime: string;
  /** 장르 */
  genres: GenreType[];
  /** 모임 상태 */
  status: GatheringStatus;
  /** 모집 인원 */
  totalRecruitCount: number;
  /** 세션 */
  gatheringSessions: {
    bandSession: BandSessionType;
    recruitCount: number;
  }[];
}

/** gather를 생성할 때 받아야할 response */
export interface RegisterGatheringsResponse {
  /** 모임 id */
  id: number;
  /** 모임 이름 */
  name: string;
  /** 메세지(오류 or 성공) */
  message: string;
  /** 모임 날짜 */
  gatheringDateTime: string;
  /** 모집 마감 날짜 */
  recruitDeadline: string;
  /** 썸네일 */
  thumbnail: string;
  /** 모임 상태 */
  status: GatheringStatus;
}
