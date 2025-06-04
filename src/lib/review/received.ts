import { useAuthStore } from '@/stores/useAuthStore';
import { fetchWithAuth } from '@/utils/fetchWithAuth';

export const getStatus = async () => {
  const res = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/review/received/statistics`,
    () => useAuthStore.getState().accessToken,
    {
      method: 'GET',
    },
  );
  const data = await res.json();
  if (!res.ok) {
    throw data;
  }
  return data.result;
};
export const getReview = async () => {
  const res = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/review/received`,
    () => useAuthStore.getState().accessToken,
    {
      method: 'GET',
    },
  );
  const data = await res.json();
  if (!res.ok) {
    throw data;
  }
  return data.result;
};
