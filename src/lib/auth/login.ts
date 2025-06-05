import { LoginRequest, LoginResponse } from '@/types/auth';
import { apiClient } from '@/utils/apiClient';

export async function postLogin({
  email,
  password,
}: LoginRequest): Promise<LoginResponse> {
  return await apiClient.post<LoginResponse>('/auth/login', {
    email,
    password,
  });
}
