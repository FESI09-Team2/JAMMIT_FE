'use client';
import IcLove from '@/assets/icons/ic_love.svg';
import IcShare from '@/assets/icons/ic_share.svg';
import { useVideoDetailQuery } from '@/hooks/queries/video/useVideoDetail';
import { getDate } from '@/utils/date';

interface prop {
  videoId: string;
}

export default function VideoDetailClient({ videoId }: prop) {
  const { data, isError, isLoading } = useVideoDetailQuery({ videoId });
  if (isLoading || isError) return null;
  console.log(data);
  return (
    <div className="pc:max-w-[84rem] pc:mt-6 pc:mb-36 tab:mb-11 mx-auto mb-6">
      <div className="flex items-start justify-between">
        <div>
          <em className="block flex-[1] truncate pr-4 text-2xl leading-none font-bold">
            {data?.title}
          </em>
          <span className="mt-4 mb-3.5 block leading-none opacity-60">
            {data?.nickname}
          </span>
          <p className="leading-none opacity-60">
            조회수 {data?.viewCount}회
            <span className="mx-2 inline-flex">|</span>
            {getDate(data?.createdAt as string)}
          </p>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <button className="text-[#6b7280]">
              <IcLove />
            </button>
            <p className="opacity-60">{data?.likeCount}</p>
          </div>
          <button>
            <IcShare />
          </button>
        </div>
      </div>
      <p className="pc:mt-11 pc:mb-[3.125rem] mt-8 mb-8 leading-[160%]">
        {data?.description}
      </p>
    </div>
  );
}
