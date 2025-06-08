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
