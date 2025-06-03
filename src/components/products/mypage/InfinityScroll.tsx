'use clients';

import { Fragment, ReactNode, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

// 0.5: 화면에 요소의 절반이 보이면 감지
// 0: 화면에 요소의 조금이라도 보이면 감지
// 1: 화면에 요소의 완전히 보이면 감지
const INFINITY_SCROLL_THRESHOLD = 1;

interface InfinityScrollProps<T> {
  list?: T[];
  item: (itemData: T) => ReactNode;
  emptyText: string;
  onInView: () => void;
  hasMore?: boolean;
}

export default function InfinityScroll<T>({
  list,
  item,
  emptyText,
  onInView,
  hasMore = true,
}: InfinityScrollProps<T>) {
  const { ref: observerRef, inView } = useInView({
    threshold: INFINITY_SCROLL_THRESHOLD,
  });

  useEffect(() => {
    if (inView && hasMore) {
      onInView?.();
    }
  }, [inView, onInView, hasMore]);

  if (!list || list.length === 0) {
    return <div className="empty-text">{emptyText}</div>;
  }

  return (
    <div className="pc:grid-cols-4 grid grid-cols-1 gap-x-5 gap-y-10 px-[9rem] py-[1.25rem]">
      {list.map((itemData, index) => (
        <Fragment key={index}>{item(itemData)}</Fragment>
      ))}
      {/* 무한 스크롤링 감지를 위한 요소 */}
      {hasMore && <div ref={observerRef} />}
    </div>
  );
}
