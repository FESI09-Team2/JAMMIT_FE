import { login } from '@/utils/authService';
import { useMutation } from '@tanstack/react-query';

export const useLoginMutation = () =>
  useMutation({
    mutationFn: login,
    meta: {
      successMessage: '로그인 성공!',
    },
  });
