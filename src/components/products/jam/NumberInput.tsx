import React, { useState } from 'react';
import MinusIcon from '@/assets/icons/ic_minus.svg';
import PlusIcon from '@/assets/icons/ic_plus.svg';

export default function NumberInput() {
  const [count, setCount] = useState(1);

  const decrease = () => setCount((prev) => Math.max(prev - 1, 1));
  const increase = () => setCount((prev) => prev + 1);

  return (
    <div className="flex h-[2.75rem] w-[6.6875rem] items-center gap-[1.125rem] rounded-lg bg-[#34343A] px-[1rem] py-[0.75rem]">
      <button onClick={decrease}>
        <MinusIcon />
      </button>
      <span className="w-4 text-center text-sm text-white">{count}</span>
      <button onClick={increase}>
        <PlusIcon />
      </button>
    </div>
  );
}
