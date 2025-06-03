import { Genre, BandSession, UserResponse } from '@/types/user';

export interface SignupRequest {
  email: string;
  username: string;
  password: string;
  nickname: string;
  preferredGenres: Genre[];
  preferredBandSessions: BandSession[];
}

export interface SignupResponse {
  success: boolean;
  code: number;
  message: string;
  result: UserResponse;
}
