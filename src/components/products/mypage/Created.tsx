'use clients';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/commons/Card';
import { CARD_STATE } from '@/constants/card';
import { GatheringCard } from '@/types/card';
import InfinityScroll from '@/components/commons/InfinityScroll';
import { StaticImageData } from 'next/image';

type CreatedProps = {
  initialData?: {
    gatherings: GatheringCard[];
    currentPage: number;
    totalPage: number;
    totalElements: number;
  };
};

// TODO: Recruit interface 변경필요
export default function Created({ initialData }: CreatedProps) {
  const [page, setPage] = useState(initialData?.currentPage ?? 0);
  const [items, setItems] = useState<GatheringCard[]>(
    initialData?.gatherings ?? [],
  );
  const [hasMore, setHasMore] = useState(
    (initialData?.currentPage ?? 0) + 1 < (initialData?.totalPage ?? 1),
  );

  useEffect(() => {
    if (page !== 0 && initialData?.gatherings) {
      // interface교체 후 아래 코드로 반영 필요
      // setItems((prev) => [...prev, ...data.gatherings]);
      setItems((prev) => prev);
      const isLastPage = initialData.currentPage + 1 >= initialData.totalPage;
      setHasMore(!isLastPage);
    }
  }, [initialData, page]);

  const handleInView = () => {
    if (hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  const renderCard = (item: GatheringCard) => (
    <Link key={item.id} href={`de/${item.id}`}>
      <Card.Thumbnail
        // 임시 추가
        thumbnail={item.thumbnail as unknown as StaticImageData}
        alt={item.name}
        isLike={false}
      />
      <Card.TagList tags={item.genres} />
      <Card.TitleBlock title={item.name} author={item.creator.nickname} />
      <Card.Footer
        status={CARD_STATE.COMPLETED}
        totalCurrent={item.totalCurrent}
        totalRecruit={item.totalRecruit}
        recruitDeadline={item.recruitDeadline}
        //member={item.member}
      />
    </Link>
  );

  return (
    <InfinityScroll<GatheringCard>
      list={items}
      item={renderCard}
      emptyText="참여 중인 모집이 없습니다."
      onInView={handleInView}
      hasMore={hasMore}
    />
  );
}
