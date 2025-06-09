import { StaticImageData } from 'next/image';

export interface RecruitCardData {
  id: number;
  name: string;
  place?: string;
  thumbnail: StaticImageData;
  gatheringDateTime?: string;
  totalRecruit: number;
  totalCurrent: number;
  viewCount?: number;
  recruitDeadline: string;
  status?: string;
  genres: string[];
  creator: {
    id: number;
    nickname: string;
  };
  sessions: {
    bandSession: string;
    recruitCount: number;
    currentCount: number;
  }[];
}
