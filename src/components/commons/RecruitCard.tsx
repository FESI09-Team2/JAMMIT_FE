import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Like from '../commons/Like';
import { getDate } from '@/utils/date';
import { RecruitCardData } from '@/types/types';

interface RecruitCardProps {
  data: RecruitCardData;
}

export default function RecruitCard({ data }: RecruitCardProps) {
  return (
    <Link href={`de/${data.id}`}>
      <div className="relative h-[199px] overflow-hidden rounded-lg bg-[color:var(--bg-34343A)]">
        <Like initialLiked={data.liked} />
        <Image
          src={data.thumbnailUrl}
          alt={data.title}
          width={320}
          height={199}
        />
      </div>

      <div className="mt-[18px] flex flex-wrap gap-[6px]">
        {data.tags.map((tag, i) => (
          <span
            key={i}
            className="rounded-lg bg-[color:var(--bg-34343A)] px-3 py-1.5 text-sm font-medium"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-5 truncate text-lg leading-[1] font-semibold">
        {data.title}
      </div>
      <div className="mt-5 leading-[1] text-[color:var(--color-9c9dao)]">
        {data.author}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-t-[#393940] pt-[22px]">
        <span>{getDate(data.dday)}</span>
        <span>
          <span className="font-bold text-[color:var(--color-C179FF)]">
            {data.current}/{data.total}
          </span>
          <span> 명 모집중</span>
        </span>
      </div>
    </Link>
  );
}
