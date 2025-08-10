import { http, HttpResponse } from 'msw';
import { RecruitResponse } from '@/types/recruit';
import {
  RegisterGatheringsRequest,
  ModifiedGatheringsRequest,
} from '@/types/gather';
import {
  MOCK_GATHERINGS,
  MOCK_MY_CREATED_GATHERINGS,
  MOCK_MY_PARTICIPATED_GATHERINGS,
  MOCK_REGISTER_RESPONSE,
  MOCK_MODIFIED_RESPONSE,
} from '@/mocks/data/gatherings';

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

  // 모임 생성
  http.post('*/gatherings', async ({ request }) => {
    const authHeader = request.headers.get('Authorization');

    // 인증 토큰 확인
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new HttpResponse(null, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    if (!token.includes('mock')) {
      return new HttpResponse(null, { status: 401 });
    }

    const body = (await request.json()) as RegisterGatheringsRequest;

    // 필수 필드 검증
    if (
      !body?.name ||
      !body?.place ||
      !body?.gatheringDateTime ||
      !body?.recruitDateTime
    ) {
      return new HttpResponse(null, { status: 400 });
    }

    // 동적으로 ID 생성 (실제로는 서버에서 생성)
    const newId = Math.floor(Math.random() * 1000) + 1000;

    return HttpResponse.json({
      success: true,
      result: {
        ...MOCK_REGISTER_RESPONSE,
        id: newId,
        name: body.name,
        gatheringDateTime: body.gatheringDateTime,
        recruitDeadline: body.recruitDateTime,
      },
    });
  }),

  // 모임 수정
  http.put('*/gatherings/:id', async ({ request, params }) => {
    const authHeader = request.headers.get('Authorization');

    // 인증 토큰 확인
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new HttpResponse(null, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    if (!token.includes('mock')) {
      return new HttpResponse(null, { status: 401 });
    }

    const { id } = params;
    const body = (await request.json()) as ModifiedGatheringsRequest;

    // 필수 필드 검증
    if (
      !body?.name ||
      !body?.place ||
      !body?.gatheringDateTime ||
      !body?.recruitDeadline
    ) {
      return new HttpResponse(null, { status: 400 });
    }

    // 모임 존재 여부 확인 (실제로는 DB에서 확인)
    const gatheringExists = MOCK_GATHERINGS.some(
      (g) => g.id === parseInt(id as string),
    );
    if (!gatheringExists) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json({
      success: true,
      result: {
        ...MOCK_MODIFIED_RESPONSE,
        id: parseInt(id as string),
        name: body.name,
        place: body.place,
        description: body.description,
        gatheringDateTime: body.gatheringDateTime,
        recruitDeadline: body.recruitDeadline,
        genres: body.genres,
        sessions:
          body.gatheringSessions?.map((session) => ({
            ...session,
            currentCount: 0, // 수정 시에는 현재 참가자 수를 0으로 초기화
          })) || [],
      },
    });
  }),

  // 내가 생성한 모임 목록
  http.get('*/gatherings/my/created', ({ request }) => {
    const authHeader = request.headers.get('Authorization');

    // 인증 토큰 확인
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new HttpResponse(null, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    if (!token.includes('mock')) {
      return new HttpResponse(null, { status: 401 });
    }

    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '0');
    const size = parseInt(url.searchParams.get('size') || '8');
    const includeCanceled = url.searchParams.get('includeCanceled') === 'true';

    // 페이지네이션
    const totalElements = MOCK_MY_CREATED_GATHERINGS.length;
    const totalPage = Math.ceil(totalElements / size);
    const startIndex = page * size;
    const endIndex = startIndex + size;
    const paginatedGatherings = MOCK_MY_CREATED_GATHERINGS.slice(
      startIndex,
      endIndex,
    );

    // 취소된 모임 필터링
    const filteredGatherings = includeCanceled
      ? paginatedGatherings
      : paginatedGatherings.filter((g) => g.status !== 'CANCELED');

    const response: RecruitResponse = {
      gatherings: filteredGatherings,
      currentPage: page,
      totalPage,
      totalElements: filteredGatherings.length,
    };

    return HttpResponse.json(response);
  }),

  // 내가 참가한 모임 목록
  http.get('*/gatherings/:gatheringId/participants/my', ({ request }) => {
    const authHeader = request.headers.get('Authorization');

    // 인증 토큰 확인
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new HttpResponse(null, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    if (!token.includes('mock')) {
      return new HttpResponse(null, { status: 401 });
    }

    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '0');
    const size = parseInt(url.searchParams.get('size') || '8');
    const includeCanceled = url.searchParams.get('includeCanceled') === 'true';

    // 페이지네이션
    const totalElements = MOCK_MY_PARTICIPATED_GATHERINGS.length;
    const totalPage = Math.ceil(totalElements / size);
    const startIndex = page * size;
    const endIndex = startIndex + size;
    const paginatedGatherings = MOCK_MY_PARTICIPATED_GATHERINGS.slice(
      startIndex,
      endIndex,
    );

    // 취소된 모임 필터링
    const filteredGatherings = includeCanceled
      ? paginatedGatherings
      : paginatedGatherings.filter((g) => g.status !== 'CANCELED');

    const response: RecruitResponse = {
      gatherings: filteredGatherings,
      currentPage: page,
      totalPage,
      totalElements: filteredGatherings.length,
    };

    return HttpResponse.json(response);
  }),

  // 모임 삭제
  http.delete('*/gatherings/:id', ({ request, params }) => {
    const authHeader = request.headers.get('Authorization');

    // 인증 토큰 확인
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new HttpResponse(null, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    if (!token.includes('mock')) {
      return new HttpResponse(null, { status: 401 });
    }

    const { id } = params;

    // 모임 존재 여부 확인
    const gatheringExists = MOCK_GATHERINGS.some(
      (g) => g.id === parseInt(id as string),
    );
    if (!gatheringExists) {
      return new HttpResponse(null, { status: 404 });
    }

    // 삭제 성공 (실제로는 DB에서 삭제)
    return new HttpResponse(null, { status: 204 });
  }),
];
