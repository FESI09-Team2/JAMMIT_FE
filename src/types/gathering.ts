export type GatheringStatus =
  | 'RECRUITING'
  | 'CONFIRMED'
  | 'COMPLETED'
  | 'CANCELED';

export type Genre =
  | 'ROCK'
  | 'METAL'
  | 'POP'
  | 'BALLAD'
  | 'INDIE'
  | 'ALTERNATIVE'
  | 'JAZZ'
  | 'PUNK'
  | 'ACOUSTIC'
  | 'FOLK'
  | 'RNB';

export type BandSession =
  | 'VOCAL'
  | 'ELECTRIC_GUITAR'
  | 'DRUM'
  | 'ACOUSTIC_GUITAR'
  | 'BASS'
  | 'STRING_INSTRUMENT'
  | 'PERCUSSION'
  | 'KEYBOARD';

export interface GatheringSessionInfo {
  bandSession: BandSession;
  recruitCount: number;
  currentCount: number;
}

export interface CreatorInfo {
  id: number;
  nickname: string;
}

export interface GatheringDetailResponse {
  id: number;
  name: string;
  thumbnail: string;
  place: string;
  description: string;
  gatheringDateTime: string;
  recruitDeadline: string;
  status: GatheringStatus;
  genres: Genre[];
  sessions: GatheringSessionInfo[];
  creator: CreatorInfo;
}

export type ParticipantStatus =
  | 'PENDING'
  | 'APPROVED'
  | 'REJECTED'
  | 'COMPLETED'
  | 'CANCELED';

export interface Participant {
  participantId: number;
  userId: number;
  userNickname: string;
  userEmail: string;
  bandSession: BandSession;
  status: ParticipantStatus;
  createdAt: string;
  introduction: string;
}

export interface ParticipantsResponse {
  participants: Participant[];
  total: number;
}
