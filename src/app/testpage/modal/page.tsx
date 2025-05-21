'use client';

import { useState } from 'react';
import ModalWrapper from '@/components/commons/ModalWarraper';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <button
        onClick={handleOpenModal}
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        모달 열기
      </button>

      {isOpen && (
        <ModalWrapper
          title="안녕하세요"
          onClose={handleCloseModal}
          className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl sm:max-w-lg"
        >
          <p>이것은 모달입니다.</p>
        </ModalWrapper>
      )}
    </main>
  );
}
