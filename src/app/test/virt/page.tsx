'use client';

import CardItem from '@/components/commons/Card/CardItem';
import { CARD_STATE } from '@/constants/card';
import { mockRecruits } from '@/constants/checkbox';
import { VirtuosoGrid } from 'react-virtuoso';

export default function VirtFullPage() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>가상화 후 (VirtuosoGrid, 1000개)</h1>
      <VirtuosoGrid
        useWindowScroll={false}
        totalCount={mockRecruits.length}
        components={{
          List: ({ children, ...props }) => (
            <div
              {...props}
              className="pc:grid-cols-4 pc:gap-x-5 pc:px-0 tab:px-6 grid grid-cols-1 gap-y-10 px-4"
            >
              {children}
            </div>
          ),
          Item: ({ children, ...props }) => <div {...props}>{children}</div>,
        }}
        itemContent={(index) => (
          <CardItem
            key={mockRecruits[index].id}
            item={mockRecruits[index]}
            isLike
            status={CARD_STATE.PROGRESS}
            isFirst={index === 0}
          />
        )}
      />
    </main>
  );
}
