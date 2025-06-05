import { tokenService } from '@/utils/tokenService';
import { LoginRequest, SignupRequest } from '@/types/auth';
import { postLogin } from '@/lib/auth/login';
import { postSignup } from '@/lib/auth/signup';
import { queryClient } from '@/lib/react-query';
import { apiClient } from './apiClient';
import { ApiResponse } from '@/types/common';

export const login = async (loginRequest: LoginRequest): Promise<void> => {
  const { accessToken, refreshToken } = await postLogin(loginRequest);
  tokenService.setAccessToken(accessToken);
  tokenService.setRefreshToken(refreshToken);
};

export const signup = async (signupRequest: SignupRequest): Promise<void> => {
  await postSignup(signupRequest);
};

export const logout = async (): Promise<void> => {
  tokenService.clearAllTokens();
  queryClient.invalidateQueries({ queryKey: ['me'] });
};

export const refreshAccessToken = async (): Promise<void> => {
  const refreshToken = tokenService.getRefreshToken();
  if (!refreshToken) return;

  const response = await apiClient.post<ApiResponse<{ accessToken: string }>>(
    '/auth/refresh',
    { refreshToken },
  );

  if (!response.success) {
    throw new Error(response.message || '토큰 갱신 실패');
  }

  const { accessToken } = response.result;
  tokenService.setAccessToken(accessToken);
  queryClient.invalidateQueries({ queryKey: ['me'] });
};
