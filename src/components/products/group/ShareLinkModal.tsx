'use client';

import ShareCharacterImage from '@/assets/images/img_character01.png';
import Button from '@/components/commons/Button';
import ModalWrapper from '@/components/commons/Modal/ModalWrapper';
import Image from 'next/image';
import { useState } from 'react';

interface ShareLinkModalProps {
  inviteLink: string;
  onClose: () => void;
}

export default function ShareLinkModal({
  inviteLink,
  onClose,
}: ShareLinkModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
  };

  return (
    <ModalWrapper
      onClose={onClose}
      className="relative w-[488px] rounded-[24px] bg-[#242429] p-[52px]"
    >
      <div className="flex flex-col items-center">
        <Image
          src={ShareCharacterImage}
          alt="링크 공유 캐릭터 이미지"
          width={128}
          height={128}
        />
        <div className="mt-[8px] text-center">
          <p className="text-[24px] font-semibold">이제 합주를 소문내보세요!</p>
          <p className="mt-[8px] text-sm font-semibold text-gray-400">
            아래 링크를 복사해서 합주를 알려보세요.
          </p>
        </div>

        <div className="mt-[22px] flex w-full items-center rounded-[8px] bg-[#34343a] p-[16px] pl-[24px]">
          <p className="w-[167px] flex-1 truncate bg-transparent text-[16px]">
            {inviteLink}
          </p>
          <Button
            variant="solid"
            size="small"
            className="ml-2 w-[5rem]"
            onClick={handleCopy}
          >
            {copied ? '복사됨' : '복사'}
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
}
