import { getUserMe } from '@/lib/user/user';
import { useQuery } from '@tanstack/react-query';

export const useUserMeQuery = () =>
  useQuery({
    queryKey: ['me'], // Query Key Factory 사용 고민 필요
    queryFn: getUserMe,
    retry: true,
  });
