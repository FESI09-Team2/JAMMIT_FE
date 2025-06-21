import InfinityScroll from '@/components/commons/InfinityScroll';
import { useUserVideoInfiniteQuery } from '@/hooks/queries/video/useUserVideoInfiniteQuery';
import { VideoCard } from '../../videos/VideoCard';
import CardSkeleton from '@/components/commons/Card/SkeletonItem';

export default function MyVideo() {
  const { data, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useUserVideoInfiniteQuery({ sort: 'latest', size: 12 });

  const flatVideos = data?.pages.flatMap((page) => page.data) ?? [];
  const isInitialLoading = isLoading && flatVideos.length === 0;

  if (!data) {
    return (
      <div className="pc:grid-cols-4 pc:gap-x-5 pc:px-0 tab:px-6 grid grid-cols-1 gap-y-10 px-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <CardSkeleton key={i} /> // 수정 예정
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <InfinityScroll
        isInitialLoading={isInitialLoading}
        list={flatVideos}
        item={(video) => <VideoCard key={video.id} video={video} />}
        emptyText="업로드된 영상이 없습니다."
        hasMore={!!hasNextPage && !isFetching}
        onInView={() => {
          if (hasNextPage && !isFetching) {
            fetchNextPage();
          }
        }}
      />
    </div>
  );
}
