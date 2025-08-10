import { http, HttpResponse } from 'msw';
import { RecruitResponse } from '@/types/recruit';
import { MOCK_GATHERINGS } from '@/mocks/data/gatherings';

export const gatheringsHandlers = [
  // 모임 목록 조회
  http.get('*/gatherings', ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '0');
    const size = parseInt(url.searchParams.get('size') || '8');
    const sort = url.searchParams.get('sort') || 'recruitDeadline,asc';
    const genres = url.searchParams.getAll('genres');
    const sessions = url.searchParams.getAll('sessions');

    // 필터링 로직 (실제로는 더 복잡할 수 있음)
    let filteredGatherings = MOCK_GATHERINGS;

    if (genres.length > 0) {
      filteredGatherings = filteredGatherings.filter((gathering) =>
        gathering.genres.some((genre) => genres.includes(genre)),
      );
    }

    if (sessions.length > 0) {
      filteredGatherings = filteredGatherings.filter((gathering) =>
        gathering.sessions.some((session) =>
          sessions.includes(session.bandSession),
        ),
      );
    }

    // 정렬 로직
    if (sort === 'recruitDeadline,asc') {
      filteredGatherings.sort(
        (a, b) =>
          new Date(a.recruitDeadline).getTime() -
          new Date(b.recruitDeadline).getTime(),
      );
    } else if (sort === 'recruitDeadline,desc') {
      filteredGatherings.sort(
        (a, b) =>
          new Date(b.recruitDeadline).getTime() -
          new Date(a.recruitDeadline).getTime(),
      );
    }

    // 페이지네이션
    const totalElements = filteredGatherings.length;
    const totalPage = Math.ceil(totalElements / size);
    const startIndex = page * size;
    const endIndex = startIndex + size;
    const paginatedGatherings = filteredGatherings.slice(startIndex, endIndex);

    const response: RecruitResponse = {
      gatherings: paginatedGatherings,
      currentPage: page,
      totalPage,
      totalElements,
    };

    return HttpResponse.json(response);
  }),
];
