import { SignupRequest } from '@/types/auth';
import { ApiResponse } from '@/types/common';
import { UserResponse } from '@/types/user';
import { apiClient } from '@/utils/apiClient';

export const postSignup = async (
  data: SignupRequest,
): Promise<UserResponse> => {
  const response = await apiClient.post<ApiResponse<UserResponse>>(
    '/user',
    data,
  );

  if (!response.success) {
    throw new Error(response.message || '회원가입에 실패했습니다.');
  }

  return response.result;
};

export const checkEmailDuplicate = async (email: string): Promise<boolean> => {
  const response = await apiClient.get<ApiResponse<{ exists: boolean }>>(
    `/user/exists?email=${encodeURIComponent(email)}`,
  );

  if (!response.success) {
    throw new Error(response.message || '이메일 중복 확인에 실패했습니다.');
  }

  return response.result.exists;
};
