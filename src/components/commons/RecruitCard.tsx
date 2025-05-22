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
      <div className="relative h-[12.43rem] overflow-hidden rounded-lg bg-[color:var(--bg-34343A)]">
        <Like initialLiked={data.liked} />
        <Image
          src={data.thumbnailUrl}
          alt={data.title}
          width={320}
          height={199}
        />
      </div>

      <div className="mt-[1.12rem] flex flex-wrap gap-[0.37rem]">
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

      <div className="mt-5 flex items-center justify-between border-t border-t-[#393940] pt-[1.37rem]">
        <span>{getDate(data.dday)}</span>
        <p>
          <span className="font-bold text-[color:var(--color-C179FF)]">
            {data.current}/{data.total}
          </span>{' '}
          명 모집중
        </p>
      </div>
    </Link>
  );
}
