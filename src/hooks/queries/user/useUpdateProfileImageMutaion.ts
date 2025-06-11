import { useMutation } from '@tanstack/react-query';
import { updateProfileImage, UpdateProfileImageRequest } from '@/lib/user/user';

export const useUpdateProfileImageMutation = () => {
  return useMutation({
    mutationFn: (data: UpdateProfileImageRequest) => updateProfileImage(data),
  });
};
