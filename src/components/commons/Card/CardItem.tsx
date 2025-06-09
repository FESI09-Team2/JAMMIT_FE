import React from 'react';
import Link from 'next/link';
import { Card } from '.';
import Like from '../Like';
import { RecruitCardData } from '@/types/card';
import { CARD_STATE } from '@/constants/card';

interface CardItemProps {
  item: RecruitCardData;
  isLike?: boolean;
}

export default function CardItem({ item, isLike = false }: CardItemProps) {
  return (
    <Link key={item.id} href={`/group/${item.id}`}>
      <div className="relative h-[12.5rem] overflow-hidden rounded-lg">
        {isLike && <Like item={item} />}
        <Card.Thumbnail thumbnail={item.thumbnail} alt={item.name} />
      </div>

      <Card.TagList tags={item.genres} />
      <Card.TitleBlock title={item.name} author={item.creator.nickname} />
      <Card.Footer
        status={CARD_STATE.PROGRESS}
        totalCurrent={item.totalCurrent}
        totalRecruit={item.totalRecruit}
        recruitDeadline={item.recruitDeadline}
        member={item.sessions}
      />
    </Link>
  );
}
