import { postSignup } from '@/lib/auth/signup';
import { useMutation } from '@tanstack/react-query';

export const useSignupMutation = () =>
  useMutation({
    mutationFn: postSignup,

    onSuccess: () => {
      alert('회원가입이 완료되었습니다!');
    },

    onError: (error: unknown) => {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('회원가입에 실패했습니다.');
      }
    },
  });
