'use client';

import Image from 'next/image';
import { memo, useRef } from 'react';
//import { useClickOutside } from '@/hooks/useClickOutside';
import Button from '@/components/commons/Button';
import bannerImages from '@/constants/bannerImages';

const FIRST_RENDERING = 12;

interface ModalImgEditProps {
  /** "확인" 버튼 클릭 시 실행할 콜백 */
  onSubmit: () => void;
}

function ModalImgEdit({ onSubmit }: ModalImgEditProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  //useClickOutside(modalRef);

  return (
    <div className="fixed top-1/2 left-1/2 z-50 h-[410px] w-[924px] -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-[#242429] px-[52px] py-[44px]">
      <div className="flex flex-col items-center gap-[32px]">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-semibold">이미지 선택</h1>
          <h2 className="text-sm font-semibold text-gray-400">
            모임을 대표할 이미지를 선택해주세요!(필수)
          </h2>
        </div>

        <div className="grid grid-cols-6 gap-[20px]">
          {[...Array(FIRST_RENDERING)].map((_, idx) => (
            <Image
              key={idx}
              src={bannerImages[idx]}
              alt={`모임 배너 ${idx + 1}`}
              priority
              width={120}
              height={75}
            />
          ))}
        </div>

        <button className="text-sm font-semibold text-purple-600">
          더보기
        </button>
      </div>
      <div ref={modalRef} className="absolute top-[52px] right-[44px]">
        <Button variant="solid" size="small" onClick={onSubmit}>
          완료
        </Button>
      </div>
    </div>
  );
}

export default memo(ModalImgEdit);
