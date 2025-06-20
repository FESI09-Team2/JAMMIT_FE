'use client';
import { VideoCard } from '@/components/products/video/VideoCard';
import { getVideoList } from '@/lib/video/video';
import VideoListBanner from './VideoListBanner';
import { useEffect, useState } from 'react';
import VideoListControlBar from './VideoListControBar';
import { VideoItem } from '@/types/video';

export default function VideoList() {
  // const data = await getVideoList({ page: 2, take: 12, order: 'latest' });
  const [sort, setSort] = useState<'latest' | 'popular'>('latest');
  const [videos, setVideos] = useState<VideoItem[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getVideoList({
        page: 2,
        take: 12,
        order: sort,
      });
      setVideos(data.data);
    }

    fetchData();
  }, [sort]);

  console.log(videos);

  return (
    <div className="pc:max-w-[84rem] pc:mt-8 pc:pb-[5rem] mx-auto max-w-full pb-[1.375rem]">
      <VideoListBanner />
      <VideoListControlBar setSort={setSort} sort={sort} />
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}
