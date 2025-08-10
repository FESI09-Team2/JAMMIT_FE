import { http, HttpResponse } from 'msw';
import { RecruitResponse } from '../../types/recruit';
import {
  RegisterGatheringsRequest,
  ModifiedGatheringsRequest,
} from '../../types/gather';
import {
  MOCK_GATHERINGS,
  MOCK_MY_CREATED_GATHERINGS,
  MOCK_MY_PARTICIPATED_GATHERINGS,
  MOCK_MY_ALL_PARTICIPATED_GATHERINGS,
  MOCK_MY_COMPLETED_GATHERINGS,
  MOCK_GATHERING_DETAILS,
  MOCK_PARTICIPANTS,
  MOCK_REGISTER_RESPONSE,
  MOCK_MODIFIED_RESPONSE,
} from '../data/gatherings';

export const gatheringsHandlers = [
  // 모임 상세 조회 (인증 불필요)
  http.get('*/gatherings/:id', ({ params }) => {
    console.log('MSW (서버/클라이언트): 모임 상세 조회 요청 가로챔', params.id);
    const id = parseInt(params.id as string);

    // 기존 모임 데이터가 있으면 사용
    let gatheringDetail =
      MOCK_GATHERING_DETAILS[id as keyof typeof MOCK_GATHERING_DETAILS];

    // 없으면 동적으로 생성
    if (!gatheringDetail) {
      const mockNames = [
        '락 밴드 모임',
        '팝 밴드 모임',
        '재즈 세션',
        '인디 밴드',
        '어쿠스틱 밴드',
        '메탈 밴드',
        '펑크 밴드',
        '블루스 세션',
        '컨트리 밴드',
        '일렉트로닉 밴드',
        '힙합 크루',
        '클래식 앙상블',
      ];
      const mockPlaces = [
        '서울 강남구',
        '서울 이태원',
        '서울 홍대',
        '서울 신촌',
        '부산 해운대',
        '대구 동성로',
        '인천 송도',
        '광주 서구',
      ];
      const mockGenres = [
        ['ROCK', 'METAL'],
        ['POP', 'BALLAD'],
        ['JAZZ'],
        ['INDIE', 'ALTERNATIVE'],
        ['ACOUSTIC', 'FOLK'],
        ['ELECTRONIC'],
        ['HIPHOP'],
        ['CLASSICAL'],
      ];

      const randomName = mockNames[id % mockNames.length];
      const randomPlace = mockPlaces[id % mockPlaces.length];
      const randomGenres = mockGenres[id % mockGenres.length];

      gatheringDetail = {
        id,
        name: `${randomName} ${id}`,
        thumbnail: `/images/card/img_card_pc_${(id % 18) + 1}.avif`,
        place: randomPlace,
        description: `${randomName}입니다. 다양한 음악을 연주하며 즐거운 시간을 보내고 싶습니다.`,
        gatheringDateTime: `2024-12-${25 + (id % 7)}T19:00:00`,
        recruitDeadline: `2024-12-${20 + (id % 5)}T23:59:59`,
        status: id % 3 === 0 ? 'COMPLETED' : 'RECRUITING',
        genres: randomGenres,
        sessions: [
          { bandSession: 'VOCAL', recruitCount: 1, currentCount: id % 2 },
          {
            bandSession: 'ELECTRIC_GUITAR',
            recruitCount: 2,
            currentCount: id % 3,
          },
          { bandSession: 'DRUM', recruitCount: 1, currentCount: 1 },
          { bandSession: 'BASS', recruitCount: 1, currentCount: id % 2 },
          { bandSession: 'KEYBOARD', recruitCount: 1, currentCount: id % 2 },
        ],
        creator: {
          id: (id % 10) + 1,
          nickname: `유저${(id % 10) + 1}`,
          profileImagePath: '/images/ic_default_profile.svg',
        },
      };
    }

    console.log('MSW: 모임 상세 데이터 반환', gatheringDetail);
    return HttpResponse.json(gatheringDetail);
  }),

  // 모임 상세 조회 (상대 경로, 인증 불필요)
  http.get('/gatherings/:id', ({ params }) => {
    console.log('MSW: 모임 상세 조회 요청 가로챔 (상대 경로)', params.id);
    const id = parseInt(params.id as string);
    const gatheringDetail =
      MOCK_GATHERING_DETAILS[id as keyof typeof MOCK_GATHERING_DETAILS];

    if (!gatheringDetail) {
      console.log('MSW: 모임을 찾을 수 없음 (상대 경로)', id);
      return new HttpResponse(null, { status: 404 });
    }

    console.log('MSW: 모임 상세 데이터 반환 (상대 경로)', gatheringDetail);
    return HttpResponse.json(gatheringDetail);
  }),

  // 모임 참가자 목록 조회 (인증 불필요)
  http.get('*/gatherings/:id/participants', ({ params }) => {
    const id = parseInt(params.id as string);

    // 기존 참가자 데이터가 있으면 사용
    let participants =
      MOCK_PARTICIPANTS[id as keyof typeof MOCK_PARTICIPANTS] || [];

    // 없으면 동적으로 생성
    if (participants.length === 0) {
      const mockNicknames = [
        '보컬리스트',
        '드러머',
        '기타리스트',
        '베이시스트',
        '키보디스트',
        '재즈맨',
        '팝스타',
        '인디러버',
        '락스타',
        '재즈마스터',
      ];
      const mockSessions = [
        'VOCAL',
        'DRUM',
        'ELECTRIC_GUITAR',
        'BASS',
        'KEYBOARD',
      ];

      const participantCount = (id % 5) + 1; // 1~5명

      participants = Array.from({ length: participantCount }, (_, index) => ({
        participantId: id * 100 + index + 1,
        userId: id * 10 + index + 1,
        userNickname: mockNicknames[(id + index) % mockNicknames.length],
        userEmail: `user${id * 10 + index + 1}@test.com`,
        bandSession: mockSessions[index % mockSessions.length],
        status:
          index === 0 ? 'APPROVED' : index % 2 === 0 ? 'PENDING' : 'APPROVED',
        createdAt: `2024-12-${1 + (index % 10)}T${10 + index}:00:00`,
        introduction: `${mockNicknames[(id + index) % mockNicknames.length]}입니다. 즐거운 음악을 만들어가고 싶습니다.`,
        userProfileImagePath: '/images/ic_default_profile.svg',
      }));
    }

    return HttpResponse.json({
      participants,
      total: participants.length,
    });
  }),

  // 모임 참가자 목록 조회 (상대 경로, 인증 불필요)
  http.get('/gatherings/:id/participants', ({ params }) => {
    const id = parseInt(params.id as string);
    const participants =
      MOCK_PARTICIPANTS[id as keyof typeof MOCK_PARTICIPANTS] || [];

    return HttpResponse.json({
      participants,
      total: participants.length,
    });
  }),

  // 모임 참가 신청
  http.post('*/gatherings/:id/participants', async ({ request, params }) => {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new HttpResponse(null, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    if (!token.includes('mock')) {
      return new HttpResponse(null, { status: 401 });
    }

    const body = (await request.json()) as {
      bandSession: string;
      introduction: string;
    };
    const { bandSession, introduction } = body;

    if (!bandSession || !introduction) {
      return new HttpResponse(null, { status: 400 });
    }

    return HttpResponse.json({
      gatheringId: parseInt(params.id as string),
      userId: 1, // 현재 로그인한 사용자 ID
      bandSession,
      status: 'PENDING',
      message: '참가 신청이 완료되었습니다.',
      completed: false,
      canceled: false,
      approved: false,
      rejected: false,
      pending: true,
    });
  }),

  // 모임 목록 조회 (인증 불필요)
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

  // 모임 목록 조회 (상대 경로, 인증 불필요)
  http.get('/gatherings', ({ request }) => {
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
      totalElements,
      totalPage,
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

  // 내가 참가한 모임 목록 (작성 가능한 리뷰용)
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

    // includeCanceled 파라미터에 따라 필터링
    let filteredGatherings = MOCK_MY_ALL_PARTICIPATED_GATHERINGS;
    if (!includeCanceled) {
      filteredGatherings = filteredGatherings.filter(
        (g) => g.status !== 'CANCELED',
      );
    }

    // 페이지네이션 적용
    const totalElements = filteredGatherings.length;
    const totalPage = Math.ceil(totalElements / size);
    const startIndex = page * size;
    const endIndex = startIndex + size;
    const paginatedGatherings = filteredGatherings.slice(startIndex, endIndex);

    return HttpResponse.json({
      gatherings: paginatedGatherings,
      currentPage: page,
      totalPage,
      totalElements,
    });
  }),

  // 내가 참가한 모임 목록 (기존 - 단순 참가 모임만)
  http.get('*/gatherings/my/participated', ({ request }) => {
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

  // 내가 참가한 완료된 모임 목록
  http.get(
    '*/gatherings/:gatheringId/participants/my/completed',
    ({ request }) => {
      const authHeader = request.headers.get('Authorization');

      // 인증 토큰 확인
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return new HttpResponse(null, { status: 401 });
      }

      const token = authHeader.replace('Bearer ', '');
      if (!token.includes('mock')) {
        return new HttpResponse(null, { status: 401 });
      }

      // 완료된 모임만 필터링하고 GetGetherItem 형식으로 변환
      const completedGatherings = MOCK_MY_COMPLETED_GATHERINGS.filter(
        (g) => g.status === 'COMPLETED',
      ).map((g) => ({
        id: g.id,
        name: g.name,
        thumbnail: g.thumbnail,
        gatheringDateTime: g.gatheringDateTime,
        place: g.place,
        totalRecruit: g.totalRecruit,
        totalCurrent: g.totalCurrent,
        status: g.status,
        hostNickname: g.creator.nickname,
      }));

      return HttpResponse.json(completedGatherings);
    },
  ),

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
