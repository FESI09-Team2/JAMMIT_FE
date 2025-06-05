import { tokenService } from '@/utils/tokenService';
import { LoginRequest } from '@/types/auth';
import { postLogin } from '@/lib/auth/login';

export const login = async (loginRequest: LoginRequest): Promise<void> => {
  const { accessToken, refreshToken } = await postLogin(loginRequest);
  tokenService.setAccessToken(accessToken);
  tokenService.setRefreshToken(refreshToken);
};
