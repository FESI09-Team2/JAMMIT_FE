'use client';

import { useState } from 'react';
import DefaultProfileImage from '@/assets/icons/ic_default_profile.svg';
import EditIcon from '@/assets/icons/ic_edit.svg';
import ModalEdit from '@/components/commons/Modal/ModalEdit';
import { useUpdateProfile } from '@/hooks/queries/user/useUpdateProfile';
import { useUserMeQuery } from '@/hooks/queries/user/useUserMeQuery';
import { EditFormData } from '@/types/modal';
import { BandSession, Genre } from '@/types/tags';

export default function UserCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const updateProfile = useUpdateProfile();
  const { data: user } = useUserMeQuery();

  const handleProfileEdit = () => {
    setIsModalOpen(true);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  const handleModalSubmit = (data: EditFormData) => {
    updateProfile.mutate(data, {
      onSuccess: () => {
        console.log(data);
        setIsModalOpen(false);
      },
    });
  };

  // 중복 제거된 세션/장르
  const uniqueSessions = [
    ...new Set(user.preferredBandSessions),
  ] as BandSession[];
  const uniqueGenres = [...new Set(user.preferredGenres)] as Genre[];

  return (
    <>
      <div className="flex h-[15.625rem] w-full items-center justify-center gap-[3.3125rem] bg-[#36114E]">
        <div>
          <DefaultProfileImage width={128} height={128} />
        </div>
        <div className="flex flex-col text-gray-100">
          <div className="flex items-center gap-[0.625rem]">
            <p className="text-[1.5rem] leading-[2.4rem] font-bold">
              {user.username}
            </p>
            <button type="submit" onClick={handleProfileEdit}>
              <EditIcon width={18} height={18} />
            </button>
          </div>
          <div className="flex items-center gap-[0.5rem] text-sm font-medium">
            <p>담당 세션</p>
            {uniqueSessions.map((session: BandSession) => (
              <div
                key={session}
                className="h-[2rem] rounded-lg bg-[#34343A] px-[0.75rem] py-[0.375rem]"
              >
                {session.replace('_', ' ')}
              </div>
            ))}
            <div className="h-[1.25rem] w-[0.0938rem] bg-gray-500" />
            <p>선호 장르</p>
            {uniqueGenres.map((genre: Genre) => (
              <div
                key={genre}
                className="h-[2rem] rounded-lg bg-[#34343A] px-[0.75rem] py-[0.375rem]"
              >
                {genre}
              </div>
            ))}
            <div className="h-[1.25rem] w-[0.0938rem] bg-gray-500" />
            <p>개설모임수</p>
            <p>8</p>
            <div className="h-[1.25rem] w-[0.0938rem] bg-gray-500" />
            <p>작성글수</p>
            <p>20</p>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <ModalEdit
          onCancel={handleModalCancel}
          onSubmit={handleModalSubmit}
          initialData={{
            email: user.email,
            password: '87654321',
            username: user.username,
            image: user.profileImagePath,
            preferredBandSessions: user.preferredBandSessions,
            preferredGenres: user.preferredGenres,
          }}
        />
      )}
    </>
  );
}
