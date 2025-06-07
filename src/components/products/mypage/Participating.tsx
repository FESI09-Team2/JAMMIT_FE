'use clients';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/commons/Card';
import { CARD_STATE } from '@/constants/card';
import { RecruitCardData } from '@/types/card';
import InfinityScroll from '@/components/commons/InfinityScroll';
import { useGatherMeParticipants } from '@/hooks/queries/gather/useGatherMeParticipants';

const LOAD_SIZE = 8;

export default function Participating() {
  const [page, setPage] = useState(0);
  const [items, setItems] = useState<RecruitCardData[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const { data, isLoading } = useGatherMeParticipants({
    page,
    size: LOAD_SIZE,
    includeCanceled: false,
  });

  useEffect(() => {
    if (data?.result?.gatherings) {
      // Card interface 수정되면 다음 코드로 변경
      // setItems((prev) => [...prev, ...data.result.gatherings]);
      setItems((prev) => prev);

      const isLastPage = data.result.currentPage + 1 >= data.result.totalPage;
      setHasMore(!isLastPage);
    }
  }, [data]);

  const handleInView = () => {
    if (!isLoading && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  const renderCard = (item: RecruitCardData) => (
    <Link key={item.id} href={`de/${item.id}`}>
      <Card.Thumbnail
        thumbnail={item.thumbnail}
        alt={item.name}
        isLike={false}
      />
      <Card.TagList tags={item.genres} />
      <Card.TitleBlock title={item.name} author={item.author} />
      <Card.Footer
        status={CARD_STATE.COMPLETED}
        totalCurrent={item.totalCurrent}
        totalRecruit={item.totalRecruit}
        recruitDeadline={item.recruitDeadline}
        member={item.member}
      />
    </Link>
  );

  return (
    <InfinityScroll<RecruitCardData>
      list={items}
      item={renderCard}
      emptyText="참여 중인 모집이 없습니다."
      onInView={handleInView}
      hasMore={hasMore}
    />
  );
}
