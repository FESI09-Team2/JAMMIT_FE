import { GenreType, BandSessionType, GatheringStatus } from './tags';
export interface JamFormData {
  /** 모임 이름 */
  name: string;
  /** 썸네일 */
  thumbnail: string | File | null;
  /** 모임 장소 */
  place: string;
  /** 모임 소개 */
  description: string;
  /** 모임 날짜 */
  gatheringDateTime: string;
  /** 모임 모집 마감 날짜 */
  recruitDateTime: string;
  /** 장르 */
  genres: GenreType[];
  /** 모임 상태 */
  status: GatheringStatus;
  /** 총 모집 인원 */
  totalRecruitCount: number;
  /** 세션 */
  gatheringSessions: {
    bandSession: BandSessionType;
    recruitCount: number;
  }[];
}
