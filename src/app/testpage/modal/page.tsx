'use client';

import { useState, useCallback } from 'react';
import InteractionModal from '@/components/commons/ModalInteraction';

type ModalType = 'withCancel' | 'withoutCancel' | null;

export default function Home() {
  const [modalType, setModalType] = useState<ModalType>(null);

  const handleOpenModal = useCallback((type: ModalType) => {
    setModalType(type);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalType(null);
  }, []);

  const handleConfirm = useCallback(() => {
    alert('확인되었습니다!');
    setModalType(null);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <button onClick={() => handleOpenModal('withCancel')}>
        취소 버튼 모달 열기
      </button>

      <button onClick={() => handleOpenModal('withoutCancel')}>
        취소 버튼 없는 모달 열기
      </button>

      {modalType === 'withCancel' && (
        <InteractionModal
          message="이것은 취소 버튼이 있는 모달입니다."
          onConfirm={handleConfirm}
          onClose={handleCloseModal}
          showCancel={true}
        />
      )}

      {modalType === 'withoutCancel' && (
        <InteractionModal
          message="이것은 취소 버튼이 없는 모달입니다."
          onConfirm={handleConfirm}
          onClose={handleCloseModal}
          showCancel={false}
        />
      )}
    </main>
  );
}
