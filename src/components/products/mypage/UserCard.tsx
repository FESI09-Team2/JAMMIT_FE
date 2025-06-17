'use client';

import ModalEdit from '@/components/commons/Modal/ModalEdit';

import { useUpdateProfile } from '@/hooks/queries/user/useUpdateProfile';
import { useUpdateProfileImage } from '@/hooks/queries/user/useUpdateProfileImage';
import { useUserMeQuery } from '@/hooks/queries/user/useUserMeQuery';
import { useUserStore } from '@/stores/useUserStore';
import { EditFormData } from '@/types/modal';
import { handleAuthApiError } from '@/utils/authApiError';
import { useState } from 'react';
import UserCardItem from './UserCardItem';

export default function UserCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const updateProfile = useUpdateProfile();
  const updateProfileImage = useUpdateProfileImage();
  const { data: user, isLoading } = useUserMeQuery();
  const { setUser } = useUserStore();

  if (isLoading || !user) {
    return (
      <div className="flex h-[15.625rem] w-[full] items-center justify-center gap-[3.3125rem] bg-[#36114E]">
        Loading...
      </div>
    );
  }

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  const handleModalSubmit = async (data: EditFormData) => {
    try {
      const imageUrl =
        typeof data.image === 'string' ? data.image : user.profileImagePath;
      // 프로필 업데이트
      await updateProfile.mutateAsync(data);

      // 이미지 업데이트
      if (imageUrl !== user.profileImagePath) {
        await updateProfileImage.mutateAsync({
          orgFileName: 'profile.jpg',
          profileImagePath: imageUrl,
        });
      }

      const updatedUser = {
        ...user,
        username: data.username,
        preferredGenres: data.preferredGenres,
        preferredBandSessions: data.preferredBandSessions,
      };
      setUser(updatedUser);
      setIsModalOpen(false);
    } catch (error) {
      handleAuthApiError(error, '프로필 수정에 실패했습니다.', {
        section: 'profile',
        action: 'update',
      });
    }
  };

  return (
    <>
      <UserCardItem user={user} setIsModalOpen={setIsModalOpen} />
      {isModalOpen && (
        <ModalEdit
          onCancel={handleModalCancel}
          onSubmit={handleModalSubmit}
          initialData={{
            email: user.email,
            password: null,
            username: user.username,
            image: user.profileImagePath,
            preferredBandSessions: user.preferredBandSessions,
            preferredGenres: user.preferredGenres,
          }}
          userId={user.id}
        />
      )}
    </>
  );
}
