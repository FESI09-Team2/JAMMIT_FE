'use client';

import { useState } from 'react';
import ModalReview from '@/components/commons/Modal/ModalReview';

export default function ModalReviewTestPage() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ padding: 40 }}>
      <button
        onClick={() => setOpen(true)}
        style={{
          padding: 12,
          background: '#9900FF',
          color: 'white',
          borderRadius: 8,
        }}
      >
        리뷰 모달 열기
      </button>
      {open && (
        <ModalReview
          revieweeNickname="테스터"
          onCancel={() => {
            setOpen(false);
            alert('취소됨');
          }}
          onSubmit={(data) => {
            setOpen(false);
            alert('리뷰 등록: ' + JSON.stringify(data, null, 2));
          }}
        />
      )}
    </div>
  );
}
