import { http, HttpResponse } from 'msw';
import {
  MOCK_REVIEW_STATISTICS,
  MOCK_RECEIVED_REVIEWS,
  MOCK_WRITTEN_REVIEWS,
  MOCK_REVIEWS_TO_WRITE,
} from '@/mocks/data/review';
import { PostReviewRequest } from '@/types/review';

export const reviewHandlers = [
  // 받은 리뷰 통계
  http.get('*/review/received/statistics', ({ request }) => {
    const authHeader = request.headers.get('Authorization');

    // 인증 토큰 확인
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new HttpResponse(null, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    if (!token.includes('mock')) {
      return new HttpResponse(null, { status: 401 });
    }

    return HttpResponse.json(MOCK_REVIEW_STATISTICS);
  }),

  // 받은 리뷰 목록
  http.get('*/review/received', ({ request }) => {
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

    // 페이지네이션
    const totalElements = MOCK_RECEIVED_REVIEWS.length;
    const totalPage = Math.ceil(totalElements / size);
    const startIndex = page * size;
    const endIndex = startIndex + size;
    const paginatedReviews = MOCK_RECEIVED_REVIEWS.slice(startIndex, endIndex);

    return HttpResponse.json({
      content: paginatedReviews,
      page,
      size,
      totalElements,
      totalPages: totalPage,
      last: page >= totalPage - 1,
    });
  }),

  // 작성한 리뷰 목록
  http.get('*/review/written', ({ request }) => {
    const authHeader = request.headers.get('Authorization');

    // 인증 토큰 확인
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new HttpResponse(null, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    if (!token.includes('mock')) {
      return new HttpResponse(null, { status: 401 });
    }

    return HttpResponse.json(MOCK_WRITTEN_REVIEWS);
  }),

  // 작성할 리뷰 목록
  http.get('*/review/unwritten', ({ request }) => {
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

    // 페이지네이션
    const startIndex = page * size;
    const endIndex = startIndex + size;
    const paginatedGatherings = MOCK_REVIEWS_TO_WRITE.result.slice(
      startIndex,
      endIndex,
    );

    return HttpResponse.json({
      ...MOCK_REVIEWS_TO_WRITE,
      result: paginatedGatherings,
    });
  }),

  // 리뷰 작성
  http.post('*/review', async ({ request }) => {
    const authHeader = request.headers.get('Authorization');

    // 인증 토큰 확인
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new HttpResponse(null, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    if (!token.includes('mock')) {
      return new HttpResponse(null, { status: 401 });
    }

    const body = (await request.json()) as PostReviewRequest;

    // 필수 필드 검증
    if (!body?.gatheringId || !body?.revieweeId || !body?.content) {
      return new HttpResponse(null, { status: 400 });
    }

    // 리뷰 작성 성공
    return HttpResponse.json({
      success: true,
      result: {
        id: Math.floor(Math.random() * 1000) + 100,
        ...body,
        createdAt: new Date().toISOString(),
      },
    });
  }),

  // 리뷰 상세 조회
  http.get('*/review/:id', ({ request, params }) => {
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
    const reviewId = parseInt(id as string);

    // 리뷰 찾기
    const review = [...MOCK_RECEIVED_REVIEWS, ...MOCK_WRITTEN_REVIEWS].find(
      (r) => r.id === reviewId,
    );

    if (!review) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json({
      success: true,
      result: review,
    });
  }),
];
