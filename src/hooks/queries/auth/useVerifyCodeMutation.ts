import { postVerifyCode } from '@/lib/auth/verifycode';
import { useToastStore } from '@/stores/useToastStore';
import { handleAuthApiError } from '@/utils/authApiError';
import { useMutation } from '@tanstack/react-query';

export const useVerifyCodeMutation = () => {
  return useMutation({
    mutationFn: ({ email, code }: { email: string; code: string }) =>
      postVerifyCode({ email, code }),
    onSuccess: (data) => {
      if (data && data.success === false) {
        useToastStore.getState();
        return;
      }
      useToastStore.getState().show('인증 코드가 확인되었습니다.');
    },
    onError: (error) => {
      handleAuthApiError(error, '인증 코드 전송 중 오류가 발생했습니다.', {
        section: 'auth',
        action: 'verify_email_code',
      });
    },
  });
};
