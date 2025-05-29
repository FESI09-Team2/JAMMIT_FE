'use client';
import Image from 'next/image';

import Checkbox from '@/assets/icons/ic_checkbox.svg';
import CheckboxEmpty from '@/assets/icons/ic_checkbox_empty.svg';
import DefaultProfile from '@/assets/icons/ic_default_profile.svg';
import { useMemo } from 'react';

interface MemberRowProps {
  id: string;
  selected: boolean;
  onSelectChange: (id: string) => void;

  nickname: string;
  sessions: string[];
  introduction: string;
  profileImage?: File | null;
}

export default function MemberRow({
  id,
  selected,
  onSelectChange,
  nickname,
  sessions,
  introduction,
  profileImage = null,
}: MemberRowProps) {
  const profileImageUrl = useMemo(() => {
    return profileImage ? URL.createObjectURL(profileImage) : null;
  }, [profileImage]);

  return (
    <div>
      <div className="my-[12px] flex items-center gap-[20px] px-[17px]">
        <div onClick={() => onSelectChange(id)} className="cursor-pointer">
          {selected ? <Checkbox /> : <CheckboxEmpty />}
        </div>
        {profileImageUrl ? (
          <Image
            src={profileImageUrl}
            alt="프로필 사진"
            width={48}
            height={48}
          />
        ) : (
          <DefaultProfile alt="기본 프로필 사진" width="48px" height="48px" />
        )}

        <div className="w-[139px] underline underline-offset-2">{nickname}</div>

        <div className="flex w-[167px] gap-[4px]">
          {sessions.map((session) => (
            <div
              key={session}
              className="rounded-[8px] bg-[#34343A] px-[12px] py-[6px] text-gray-100"
            >
              {session}
            </div>
          ))}
        </div>
        <div className="line-clamp-2 w-[366px] overflow-hidden text-ellipsis">
          {introduction}
        </div>
      </div>
      <div className="border-b-[1px] border-[#2D3035]" />
    </div>
  );
}
