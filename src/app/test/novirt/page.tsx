'use client';

import CardItem from '@/components/commons/Card/CardItem';
import { CARD_STATE } from '@/constants/card';
import { mockRecruits } from '@/constants/checkbox';

export default function NoVirtFullPage() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>가상화 전 (1000개 map 렌더)</h1>
      <div className="pc:grid-cols-4 pc:gap-x-5 pc:px-0 tab:px-6 grid grid-cols-1 gap-y-10 px-4">
        {mockRecruits.map((item, idx) => (
          <CardItem
            key={item.id}
            item={item}
            isLike
            status={CARD_STATE.PROGRESS}
            isFirst={idx === 0}
          />
        ))}
      </div>
    </main>
  );
}
