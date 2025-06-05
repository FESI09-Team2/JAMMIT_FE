import { LoginRequest, LoginResult } from '@/types/auth';
import { ApiResponse } from '@/types/common';
import { apiClient } from '@/utils/apiClient';

export async function postLogin({
  email,
  password,
}: LoginRequest): Promise<LoginResult> {
  const data = await apiClient.post<ApiResponse<LoginResult>>('/auth/login', {
    email,
    password,
  });
  if (!data.success) {
    throw new Error(data.message || '로그인에 실패했습니다');
  }

  return data.result;
}
