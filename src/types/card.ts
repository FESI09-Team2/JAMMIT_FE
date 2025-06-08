import { StaticImageData } from 'next/image';

export interface RecruitCardData {
  id: number;
  name: string;
  thumbnail: StaticImageData;

  genres: string[];
  author: string;
  totalRecruit: number;
  totalCurrent: number;
  recruitDeadline: string;
  member: { name: string; personnel: number; total: number }[];
}

// TODO: 진환님 다음과 같이 맞혀야될것 같아요
export interface GatheringCard {
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
}
