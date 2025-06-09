'use client';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getReview } from '@/lib/review/towrite';
import { Page } from '@/types/wish';
import InfinityScroll from '@/components/commons/InfinityScroll';
import CardItem from '@/components/commons/Card/CardItem';

export default function ReviewsToWrite() {
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: ['getReview', { includeCanceled: false }] as [
      string,
      { includeCanceled: boolean },
    ],
    queryFn: ({ queryKey, pageParam = 0 }) =>
      getReview({ queryKey, pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: Page) => {
      return lastPage.currentPage + 1 < lastPage.totalPage
        ? lastPage.currentPage + 1
        : undefined;
    },
  });
  const flatData = data?.pages.flatMap((page) => page.gatherings) ?? [];
  return (
    <InfinityScroll
      list={flatData}
      item={(item) => <CardItem item={item} />}
      emptyText=""
      hasMore={!!hasNextPage && !isFetching}
      onInView={() => {
        if (hasNextPage && !isFetching) {
          fetchNextPage();
        }
      }}
    />
  );
}
