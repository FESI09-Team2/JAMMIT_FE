'use client';
import HeartRating from '@/components/commons/HeartRating';
import { useState } from 'react';

export default function Home() {
  const [score, setScore] = useState(3);

  return (
    <>
      <div className="p-4">
        <h2 className="mb-2 text-lg font-bold">동적 별점</h2>
        <HeartRating value={score} onChange={setScore} />
        <p className="mt-2">선택한 별점: {score}</p>
      </div>
      <div className="p-4">
        <h2 className="mb-2 text-lg font-bold">정적 별점</h2>
        <HeartRating value={4} readOnly />
      </div>
    </>
  );
}
