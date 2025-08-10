import { GatheringCard } from '@/types/card';
import { GenreType, BandSessionType } from '@/types/tags';
import {
  RegisterGatheringsResponse,
  ModifiedGatheringsResponse,
} from '@/types/gather';

// 기본 모임 데이터 템플릿
const baseGatherings: GatheringCard[] = [
  {
    id: 1,
    name: '락 밴드 모집합니다',
    place: '서울 강남구',
    thumbnail: '/images/card/img_card_pc_01.avif',
    gatheringDateTime: '2024-12-25T19:00:00',
    totalRecruit: 5,
    totalCurrent: 3,
    viewCount: 150,
    recruitDeadline: '2024-12-20T23:59:59',
    status: 'RECRUITING',
    genres: ['ROCK', 'METAL'],
    creator: {
      id: 1,
      nickname: '밴드리더',
    },
    sessions: [
      { bandSession: 'VOCAL', recruitCount: 1, currentCount: 1 },
      { bandSession: 'ELECTRIC_GUITAR', recruitCount: 1, currentCount: 0 },
      { bandSession: 'DRUM', recruitCount: 1, currentCount: 1 },
      { bandSession: 'BASS', recruitCount: 1, currentCount: 1 },
      { bandSession: 'KEYBOARD', recruitCount: 1, currentCount: 0 },
    ],
  },
  {
    id: 2,
    name: '재즈 세션 모집',
    place: '서울 홍대',
    thumbnail: '/images/card/img_card_pc_02.avif',
    gatheringDateTime: '2024-12-30T20:00:00',
    totalRecruit: 4,
    totalCurrent: 2,
    viewCount: 89,
    recruitDeadline: '2024-12-25T23:59:59',
    status: 'RECRUITING',
    genres: ['JAZZ', 'ACOUSTIC'],
    creator: {
      id: 2,
      nickname: '재즈맨',
    },
    sessions: [
      { bandSession: 'VOCAL', recruitCount: 1, currentCount: 1 },
      { bandSession: 'ACOUSTIC_GUITAR', recruitCount: 1, currentCount: 0 },
      { bandSession: 'DRUM', recruitCount: 1, currentCount: 1 },
      { bandSession: 'BASS', recruitCount: 1, currentCount: 0 },
    ],
  },
  {
    id: 3,
    name: '팝 밴드 공연 준비',
    place: '서울 이태원',
    thumbnail: '/images/card/img_card_pc_03.avif',
    gatheringDateTime: '2024-12-28T18:00:00',
    totalRecruit: 6,
    totalCurrent: 6,
    viewCount: 234,
    recruitDeadline: '2024-12-22T23:59:59',
    status: 'CONFIRMED',
    genres: ['POP', 'BALLAD'],
    creator: {
      id: 3,
      nickname: '팝스타',
    },
    sessions: [
      { bandSession: 'VOCAL', recruitCount: 2, currentCount: 2 },
      { bandSession: 'ELECTRIC_GUITAR', recruitCount: 1, currentCount: 1 },
      { bandSession: 'DRUM', recruitCount: 1, currentCount: 1 },
      { bandSession: 'BASS', recruitCount: 1, currentCount: 1 },
      { bandSession: 'KEYBOARD', recruitCount: 1, currentCount: 1 },
    ],
  },
  {
    id: 4,
    name: '인디 밴드 오디션',
    place: '서울 홍대',
    thumbnail: '/images/card/img_card_pc_04.avif',
    gatheringDateTime: '2024-12-31T20:00:00',
    totalRecruit: 4,
    totalCurrent: 1,
    viewCount: 67,
    recruitDeadline: '2024-12-29T23:59:59',
    status: 'RECRUITING',
    genres: ['INDIE', 'ALTERNATIVE'],
    creator: {
      id: 4,
      nickname: '인디러버',
    },
    sessions: [
      { bandSession: 'VOCAL', recruitCount: 1, currentCount: 0 },
      { bandSession: 'ELECTRIC_GUITAR', recruitCount: 1, currentCount: 1 },
      { bandSession: 'DRUM', recruitCount: 1, currentCount: 0 },
      { bandSession: 'BASS', recruitCount: 1, currentCount: 0 },
    ],
  },
  {
    id: 5,
    name: '어쿠스틱 세션',
    place: '서울 강남구',
    thumbnail: '/images/card/img_card_pc_05.avif',
    gatheringDateTime: '2024-12-26T19:30:00',
    totalRecruit: 3,
    totalCurrent: 3,
    viewCount: 156,
    recruitDeadline: '2024-12-24T23:59:59',
    status: 'COMPLETED',
    genres: ['ACOUSTIC', 'FOLK'],
    creator: {
      id: 5,
      nickname: '어쿠스틱맨',
    },
    sessions: [
      { bandSession: 'VOCAL', recruitCount: 1, currentCount: 1 },
      { bandSession: 'ACOUSTIC_GUITAR', recruitCount: 1, currentCount: 1 },
      { bandSession: 'PERCUSSION', recruitCount: 1, currentCount: 1 },
    ],
  },
  {
    id: 6,
    name: '펑크 밴드 모집',
    place: '서울 홍대',
    thumbnail: '/images/card/img_card_pc_06.avif',
    gatheringDateTime: '2024-12-27T21:00:00',
    totalRecruit: 4,
    totalCurrent: 2,
    viewCount: 98,
    recruitDeadline: '2024-12-25T23:59:59',
    status: 'RECRUITING',
    genres: ['PUNK', 'ROCK'],
    creator: {
      id: 6,
      nickname: '펑크스터',
    },
    sessions: [
      { bandSession: 'VOCAL', recruitCount: 1, currentCount: 1 },
      { bandSession: 'ELECTRIC_GUITAR', recruitCount: 1, currentCount: 0 },
      { bandSession: 'DRUM', recruitCount: 1, currentCount: 1 },
      { bandSession: 'BASS', recruitCount: 1, currentCount: 0 },
    ],
  },
  {
    id: 7,
    name: 'R&B 세션',
    place: '서울 강남구',
    thumbnail: '/images/card/img_card_pc_07.avif',
    gatheringDateTime: '2024-12-29T20:00:00',
    totalRecruit: 5,
    totalCurrent: 4,
    viewCount: 123,
    recruitDeadline: '2024-12-26T23:59:59',
    status: 'RECRUITING',
    genres: ['RNB', 'POP'],
    creator: {
      id: 7,
      nickname: '알앤비러버',
    },
    sessions: [
      { bandSession: 'VOCAL', recruitCount: 2, currentCount: 2 },
      { bandSession: 'ELECTRIC_GUITAR', recruitCount: 1, currentCount: 1 },
      { bandSession: 'DRUM', recruitCount: 1, currentCount: 1 },
      { bandSession: 'BASS', recruitCount: 1, currentCount: 0 },
    ],
  },
  {
    id: 8,
    name: '스트링 앙상블',
    place: '서울 종로구',
    thumbnail: '/images/card/img_card_pc_08.avif',
    gatheringDateTime: '2024-12-31T19:00:00',
    totalRecruit: 6,
    totalCurrent: 3,
    viewCount: 78,
    recruitDeadline: '2024-12-28T23:59:59',
    status: 'RECRUITING',
    genres: ['ACOUSTIC', 'FOLK'],
    creator: {
      id: 8,
      nickname: '클래식러버',
    },
    sessions: [
      { bandSession: 'STRING_INSTRUMENT', recruitCount: 4, currentCount: 2 },
      { bandSession: 'PERCUSSION', recruitCount: 1, currentCount: 1 },
      { bandSession: 'KEYBOARD', recruitCount: 1, currentCount: 0 },
    ],
  },
  {
    id: 9,
    name: '메탈 밴드 오디션',
    place: '서울 강남구',
    thumbnail: '/images/card/img_card_pc_09.avif',
    gatheringDateTime: '2024-12-26T22:00:00',
    totalRecruit: 5,
    totalCurrent: 1,
    viewCount: 45,
    recruitDeadline: '2024-12-23T23:59:59',
    status: 'RECRUITING',
    genres: ['METAL', 'ROCK'],
    creator: {
      id: 9,
      nickname: '메탈헤드',
    },
    sessions: [
      { bandSession: 'VOCAL', recruitCount: 1, currentCount: 0 },
      { bandSession: 'ELECTRIC_GUITAR', recruitCount: 2, currentCount: 1 },
      { bandSession: 'DRUM', recruitCount: 1, currentCount: 0 },
      { bandSession: 'BASS', recruitCount: 1, currentCount: 0 },
    ],
  },
  {
    id: 10,
    name: '재즈 트리오',
    place: '서울 이태원',
    thumbnail: '/images/card/img_card_pc_10.avif',
    gatheringDateTime: '2024-12-28T20:30:00',
    totalRecruit: 3,
    totalCurrent: 3,
    viewCount: 112,
    recruitDeadline: '2024-12-25T23:59:59',
    status: 'CONFIRMED',
    genres: ['JAZZ'],
    creator: {
      id: 10,
      nickname: '재즈마스터',
    },
    sessions: [
      { bandSession: 'VOCAL', recruitCount: 1, currentCount: 1 },
      { bandSession: 'ACOUSTIC_GUITAR', recruitCount: 1, currentCount: 1 },
      { bandSession: 'BASS', recruitCount: 1, currentCount: 1 },
    ],
  },
];

// 추가 데이터 생성 함수
const generateAdditionalGatherings = (): GatheringCard[] => {
  const additionalGatherings: GatheringCard[] = [];
  const places = [
    '서울 강남구',
    '서울 홍대',
    '서울 이태원',
    '서울 종로구',
    '서울 마포구',
    '서울 용산구',
  ];
  const genres: GenreType[] = [
    'ROCK',
    'METAL',
    'POP',
    'BALLAD',
    'INDIE',
    'ALTERNATIVE',
    'JAZZ',
    'PUNK',
    'ACOUSTIC',
    'FOLK',
    'RNB',
  ];
  const statuses = ['RECRUITING', 'CONFIRMED', 'COMPLETED'] as const;
  const bandSessions: BandSessionType[] = [
    'VOCAL',
    'ELECTRIC_GUITAR',
    'DRUM',
    'ACOUSTIC_GUITAR',
    'BASS',
    'STRING_INSTRUMENT',
    'PERCUSSION',
    'KEYBOARD',
  ];
  const nicknames = [
    '밴드리더',
    '재즈맨',
    '팝스타',
    '인디러버',
    '어쿠스틱맨',
    '펑크스터',
    '알앤비러버',
    '클래식러버',
    '메탈헤드',
    '재즈마스터',
  ];
  const thumbnails = [
    '/images/card/img_card_pc_01.avif',
    '/images/card/img_card_pc_02.avif',
    '/images/card/img_card_pc_03.avif',
    '/images/card/img_card_pc_04.avif',
    '/images/card/img_card_pc_05.avif',
    '/images/card/img_card_pc_06.avif',
    '/images/card/img_card_pc_07.avif',
    '/images/card/img_card_pc_08.avif',
    '/images/card/img_card_pc_09.avif',
    '/images/card/img_card_pc_10.avif',
  ];

  for (let i = 11; i <= 300; i++) {
    const randomGenre1 = genres[Math.floor(Math.random() * genres.length)];
    const randomGenre2 = genres[Math.floor(Math.random() * genres.length)];
    const uniqueGenres =
      randomGenre1 === randomGenre2
        ? [randomGenre1]
        : [randomGenre1, randomGenre2];

    const totalRecruit = Math.floor(Math.random() * 6) + 3; // 3-8명
    const totalCurrent = Math.floor(Math.random() * (totalRecruit + 1)); // 0-totalRecruit명
    const status =
      totalCurrent === totalRecruit
        ? 'CONFIRMED'
        : totalCurrent === 0
          ? 'RECRUITING'
          : statuses[Math.floor(Math.random() * statuses.length)];

    const sessionsCount = Math.floor(Math.random() * 4) + 2; // 2-5개 세션
    const sessions = [];
    const usedSessions = new Set<string>();

    for (let j = 0; j < sessionsCount; j++) {
      let session;
      do {
        session = bandSessions[Math.floor(Math.random() * bandSessions.length)];
      } while (usedSessions.has(session));

      usedSessions.add(session);
      const recruitCount = Math.floor(Math.random() * 2) + 1; // 1-2명
      const currentCount = Math.floor(Math.random() * (recruitCount + 1)); // 0-recruitCount명

      sessions.push({
        bandSession: session,
        recruitCount,
        currentCount,
      });
    }

    const daysOffset = Math.floor(Math.random() * 30); // 0-29일 후
    const hoursOffset = Math.floor(Math.random() * 24); // 0-23시간 후
    const gatheringDate = new Date();
    gatheringDate.setDate(gatheringDate.getDate() + daysOffset);
    gatheringDate.setHours(18 + (hoursOffset % 6), 0, 0, 0); // 18-23시

    const deadlineDate = new Date(gatheringDate);
    deadlineDate.setDate(
      deadlineDate.getDate() - Math.floor(Math.random() * 7) - 1,
    ); // 모임 1-7일 전

    additionalGatherings.push({
      id: i,
      name: `${uniqueGenres[0]} 밴드 모집 #${i}`,
      place: places[Math.floor(Math.random() * places.length)],
      thumbnail: thumbnails[Math.floor(Math.random() * thumbnails.length)],
      gatheringDateTime: gatheringDate.toISOString(),
      totalRecruit,
      totalCurrent,
      viewCount: Math.floor(Math.random() * 500) + 50,
      recruitDeadline: deadlineDate.toISOString(),
      status,
      genres: uniqueGenres,
      creator: {
        id: Math.floor(Math.random() * 100) + 1,
        nickname: nicknames[Math.floor(Math.random() * nicknames.length)],
      },
      sessions,
    });
  }

  return additionalGatherings;
};

// 300개의 모임 데이터 생성
export const MOCK_GATHERINGS: GatheringCard[] = [
  ...baseGatherings,
  ...generateAdditionalGatherings(),
];

// 내가 생성한 모임 목록 (테스트용)
export const MOCK_MY_CREATED_GATHERINGS: GatheringCard[] = [
  {
    id: 101,
    name: '내가 만든 락 밴드',
    place: '서울 강남구',
    thumbnail: '/images/card/img_card_pc_01.avif',
    gatheringDateTime: '2024-12-25T19:00:00',
    totalRecruit: 5,
    totalCurrent: 3,
    viewCount: 150,
    recruitDeadline: '2024-12-20T23:59:59',
    status: 'RECRUITING',
    genres: ['ROCK', 'METAL'],
    creator: {
      id: 1, // 현재 로그인한 사용자 ID
      nickname: '테스트유저',
    },
    sessions: [
      { bandSession: 'VOCAL', recruitCount: 1, currentCount: 1 },
      { bandSession: 'ELECTRIC_GUITAR', recruitCount: 1, currentCount: 0 },
      { bandSession: 'DRUM', recruitCount: 1, currentCount: 1 },
      { bandSession: 'BASS', recruitCount: 1, currentCount: 1 },
      { bandSession: 'KEYBOARD', recruitCount: 1, currentCount: 0 },
    ],
  },
  {
    id: 102,
    name: '내가 만든 재즈 세션',
    place: '서울 홍대',
    thumbnail: '/images/card/img_card_pc_02.avif',
    gatheringDateTime: '2024-12-30T20:00:00',
    totalRecruit: 4,
    totalCurrent: 4,
    viewCount: 89,
    recruitDeadline: '2024-12-25T23:59:59',
    status: 'CONFIRMED',
    genres: ['JAZZ', 'ACOUSTIC'],
    creator: {
      id: 1, // 현재 로그인한 사용자 ID
      nickname: '테스트유저',
    },
    sessions: [
      { bandSession: 'VOCAL', recruitCount: 1, currentCount: 1 },
      { bandSession: 'ACOUSTIC_GUITAR', recruitCount: 1, currentCount: 1 },
      { bandSession: 'DRUM', recruitCount: 1, currentCount: 1 },
      { bandSession: 'BASS', recruitCount: 1, currentCount: 1 },
    ],
  },
];

// 내가 참가한 모임 목록 (테스트용)
export const MOCK_MY_PARTICIPATED_GATHERINGS: GatheringCard[] = [
  {
    id: 201,
    name: '참가한 팝 밴드',
    place: '서울 이태원',
    thumbnail: '/images/card/img_card_pc_03.avif',
    gatheringDateTime: '2024-12-28T18:00:00',
    totalRecruit: 6,
    totalCurrent: 5,
    viewCount: 234,
    recruitDeadline: '2024-12-22T23:59:59',
    status: 'RECRUITING',
    genres: ['POP', 'BALLAD'],
    creator: {
      id: 2,
      nickname: '팝스타',
    },
    sessions: [
      { bandSession: 'VOCAL', recruitCount: 2, currentCount: 2 },
      { bandSession: 'ELECTRIC_GUITAR', recruitCount: 1, currentCount: 1 },
      { bandSession: 'DRUM', recruitCount: 1, currentCount: 1 },
      { bandSession: 'BASS', recruitCount: 1, currentCount: 0 },
      { bandSession: 'KEYBOARD', recruitCount: 1, currentCount: 1 },
    ],
  },
  {
    id: 202,
    name: '참가한 인디 밴드',
    place: '서울 홍대',
    thumbnail: '/images/card/img_card_pc_04.avif',
    gatheringDateTime: '2024-12-31T20:00:00',
    totalRecruit: 4,
    totalCurrent: 3,
    viewCount: 67,
    recruitDeadline: '2024-12-29T23:59:59',
    status: 'RECRUITING',
    genres: ['INDIE', 'ALTERNATIVE'],
    creator: {
      id: 3,
      nickname: '인디러버',
    },
    sessions: [
      { bandSession: 'VOCAL', recruitCount: 1, currentCount: 1 },
      { bandSession: 'ELECTRIC_GUITAR', recruitCount: 1, currentCount: 1 },
      { bandSession: 'DRUM', recruitCount: 1, currentCount: 0 },
      { bandSession: 'BASS', recruitCount: 1, currentCount: 1 },
    ],
  },
];

// 모임 생성 응답 데이터
export const MOCK_REGISTER_RESPONSE: RegisterGatheringsResponse = {
  id: 999,
  name: '새로 생성된 모임',
  message: '모임이 성공적으로 생성되었습니다.',
  gatheringDateTime: '2024-12-25T19:00:00',
  recruitDeadline: '2024-12-20T23:59:59',
  thumbnail: '/images/card/img_card_pc_01.avif',
  status: 'RECRUITING',
};

// 모임 수정 응답 데이터
export const MOCK_MODIFIED_RESPONSE: ModifiedGatheringsResponse = {
  id: 1,
  name: '수정된 모임',
  thumbnail: '/images/card/img_card_pc_01.avif',
  place: '서울 강남구',
  description: '수정된 모임 설명입니다.',
  gatheringDateTime: '2024-12-25T19:00:00',
  recruitDeadline: '2024-12-20T23:59:59',
  status: 'RECRUITING',
  genres: ['ROCK', 'METAL'],
  sessions: [
    { bandSession: 'VOCAL', recruitCount: 1, currentCount: 1 },
    { bandSession: 'ELECTRIC_GUITAR', recruitCount: 1, currentCount: 0 },
    { bandSession: 'DRUM', recruitCount: 1, currentCount: 1 },
    { bandSession: 'BASS', recruitCount: 1, currentCount: 1 },
    { bandSession: 'KEYBOARD', recruitCount: 1, currentCount: 0 },
  ],
  creator: {
    id: 1,
    nickname: '테스트유저',
  },
};
