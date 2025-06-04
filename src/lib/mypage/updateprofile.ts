import { UpdateProfileRequest, UpdateProfileResponse } from '@/types/user';

export async function putUpdateProfile({
  email,
  username,
  password,
  preferredGenres,
  preferredBandSessions,
}: UpdateProfileRequest): Promise<UpdateProfileResponse> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      username,
      password,
      preferredGenres,
      preferredBandSessions,
    }),
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message || '프로필 정보 수정에 실패했습니다');
  }

  return data.result;
}
