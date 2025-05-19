import React from 'react';
import Link from 'next/link';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-4">
      <h1>마이페이지</h1>
      <div className="mt-4 flex gap-2.5">
        <Link href="/mypage/my-meetings">나의 모임</Link>
        <Link href="/mypage/my-reviews">나의 리뷰</Link>
        <Link href="/mypage/created-meetings">내가 만든 모임</Link>
      </div>
      <div className='mt-4'>
        {children}
      </div>
    </div>
  );
}
