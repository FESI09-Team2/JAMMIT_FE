export interface GatheringsResponse {
  success: boolean;
  code: number;
  message: string;
  result: {
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
    }[];
    currentPage: number;
    totalPage: number;
    totalElements: number;
  };
}
