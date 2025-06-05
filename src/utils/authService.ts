import { tokenService } from '@/utils/tokenService';
import { LoginRequest, SignupRequest } from '@/types/auth';
import { postLogin } from '@/lib/auth/login';
import { postSignup } from '@/lib/auth/signup';
import { queryClient } from '@/lib/react-query';

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
