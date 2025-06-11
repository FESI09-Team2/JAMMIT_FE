import InfinityScroll from '@/components/commons/InfinityScroll';
import CardItem from '@/components/commons/Card/CardItem';
import { CARD_STATE } from '@/constants/card';
import { GatheringCard } from '@/types/card';

interface CreatedProps {
  gatherings: GatheringCard[];
  currentPage: number;
  totalPage: number;
  onLoadMore: () => void;
}

export default function Created({
  gatherings,
  currentPage,
  totalPage,
  onLoadMore,
}: CreatedProps) {
  const hasMore = currentPage + 1 < totalPage;

  return (
    <InfinityScroll<GatheringCard>
      list={gatherings}
      item={(item) => <CardItem item={item} status={CARD_STATE.COMPLETED} />}
      emptyText="참여 중인 모집이 없습니다."
      onInView={onLoadMore}
      hasMore={hasMore}
    />
  );
}
