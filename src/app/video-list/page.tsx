import { getVideoList, VideoItem } from '@/lib/video/video';
import Image from 'next/image';

export default async function VideoListPage() {
  console.log('NEST API BASE URL:', process.env.NEXT_PUBLIC_APP_URL_NEST);

  const data = await getVideoList({ page: 1, take: 10, order: 'latest' });

  return (
    <main className="flex flex-wrap gap-6 p-6">
      {data.data.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </main>
  );
}

interface VideoCardProps {
  video: VideoItem;
}

export function VideoCard({ video }: VideoCardProps) {
  return (
    <div className="w-[300px] rounded-lg bg-black p-4">
      <div className="relative h-[168px] w-full overflow-hidden rounded-md">
        <Image
          src={video.thumbnailUrl}
          alt={video.title}
          fill
          className="object-cover"
        />
      </div>
      <h3 className="mt-2 text-lg font-semibold text-white">{video.title}</h3>
      <p className="text-sm text-gray-400">{video.nickname}</p>
      <p className="text-xs text-gray-500">
        {new Date(video.createdAt).toLocaleString()}
      </p>
    </div>
  );
}
