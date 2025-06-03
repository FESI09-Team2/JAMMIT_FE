import Link from 'next/link';
import { Card } from '@/components/commons/Card';
import { CARD_STATE } from '@/constants/card';
import { RecruitCardData } from '@/types/card';
import { mockCard } from './mockCard';

export default function Created() {
  return (
    <div className="pc:grid-cols-4 grid grid-cols-1 gap-x-5 gap-y-10 px-[9rem] py-[1.25rem]">
      {mockCard.map((item: RecruitCardData) => (
        <Link key={item.id} href={`de/${item.id}`}>
          <Card.Thumbnail
            thumbnail={item.thumbnail}
            liked={item.liked}
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
      ))}
    </div>
  );
}
