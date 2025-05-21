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
      <button onClick={() => handleOpenModal('withCancel')}>나가는 모달</button>

      <button onClick={() => handleOpenModal('withoutCancel')}>
        가입 완료 모달
      </button>

      {modalType === 'withCancel' && (
        <InteractionModal
          message={`정말 나가시겠어요?\n작성된 내용이 모두 삭제됩니다.`}
          onConfirm={handleConfirm}
          onClose={handleCloseModal}
          isShowCancel={true}
        />
      )}

      {modalType === 'withoutCancel' && (
        <InteractionModal
          message="가입이 완료되었습니다!"
          onConfirm={handleConfirm}
          onClose={handleCloseModal}
          isShowCancel={false}
        />
      )}
    </main>
  );
}
