'use client';

import { useState, useCallback } from 'react';
import ModalInteraction from '@/components/commons/ModalInteraction';
import ModalReview from '@/components/commons/ModalReview';
import ModalZam from '@/components/commons/ModalZam';

type ModalType = 'withCancel' | 'withoutCancel' | 'review' | 'zam' | null;

export default function Home() {
  const [modalType, setModalType] = useState<ModalType>(null);

  const handleOpenModal = useCallback((type: ModalType) => {
    setModalType(type);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalType(null);
  }, []);

  /** API 연결부 */
  const handleConfirm = useCallback(() => {
    alert('확인되었습니다!');
    setModalType(null);
  }, []);

  /** API 연결부 */
  const handleSubmitReview = useCallback(
    (data: { rating: number; tags: string[]; review: string }) => {
      alert(JSON.stringify(data, null, 2));
      setModalType(null);
    },
    [],
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <button onClick={() => handleOpenModal('withCancel')}>
        나가는 모달 테스트
      </button>

      <button onClick={() => handleOpenModal('withoutCancel')}>
        가입 완료 모달 테스트
      </button>

      <button onClick={() => handleOpenModal('review')}>
        리뷰 모달 테스트
      </button>

      <button onClick={() => handleOpenModal('zam')}>
        잼 만들기 모달 테스트
      </button>

      {modalType === 'withCancel' && (
        <ModalInteraction
          message={`정말 나가시겠어요?\n작성된 내용이 모두 삭제됩니다.`}
          onConfirm={handleConfirm}
          onClose={handleCloseModal}
          isShowCancel={true}
        />
      )}

      {modalType === 'withoutCancel' && (
        <ModalInteraction
          message="가입이 완료되었습니다!"
          onConfirm={handleConfirm}
          onClose={handleCloseModal}
          isShowCancel={false}
        />
      )}

      {modalType === 'review' && (
        <ModalReview
          onCancel={handleCloseModal}
          onSubmit={handleSubmitReview}
        />
      )}

      {modalType === 'zam' && (
        <ModalZam onCancel={handleCloseModal} onSubmit={handleCloseModal} />
      )}
    </main>
  );
}
