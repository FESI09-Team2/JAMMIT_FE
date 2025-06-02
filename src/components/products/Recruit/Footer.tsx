import React from 'react';
import IcListCheck from '@/assets/icons/ic_list_check.svg';
import { getRecruitStatus } from '@/utils/getRecruitStatus';
import { getDate } from '@/utils/date';

interface FooterProps {
  status: '신청완료' | '모집중' | '합주확정' | '합주완료';
  totalCurrent: number;
  totalRecruit: number;
  member: { name: string; Personnel: number; total: number }[];
  recruitDeadline?: string;
  onButtonClick?: () => void;
}

export default function Footer({
  status,
  totalCurrent,
  totalRecruit,
  recruitDeadline,
  member,
  //   onButtonClick,
}: FooterProps) {
  const text = `${totalCurrent}/${totalRecruit}`;
  const cardStatus = getRecruitStatus(
    recruitDeadline as string,
    totalCurrent,
    totalRecruit,
  );
  const right = () => {
    switch (status) {
      case '신청완료':
        return (
          <p className="text-[color:var(--purple-500) rounded-lg border border-[color:var(--purple-500)] bg-[color:var(--bg-34343A)] px-3 py-1.5 text-sm font-medium">
            신청완료
          </p>
        );
      case '합주완료':
        return (
          <p className="rounded-lg border border-[color:var(--purple-500)] bg-[color:var(--bg-34343A)] px-3 py-1.5 text-sm font-medium text-white">
            <IcListCheck />
            합주확정
          </p>
        );
      case '합주확정':
        return (
          <p className="text-[color:var(--gray-400) rounded-lg border bg-[color:var(--bg-34343A)] px-3 py-1.5 text-sm font-medium">
            합주확정
          </p>
        );
      default:
        return (
          <div className="group relative">
            <span className="text-[color:var(--primary)]">{text}</span> 명
            {cardStatus}
            <ul className="absolute right-[-2px] bottom-[39px] hidden rounded-xl bg-[#29292C] group-hover:block">
              {member.map((item) => (
                <li
                  key={item.name}
                  className="flex w-[142px] items-center border-b border-b-[#3B3B40] px-4 py-2.5 last:border-none"
                >
                  <p className="w-1/2">{item.name}</p>
                  <span className="w-1/2">
                    {item.Personnel}/{item.total}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        );
    }
  };
  const left = () => {
    if (status === '모집중') {
      return <span>{getDate(recruitDeadline as string)}</span>;
    }
    return (
      <span>
        {text} 명 {cardStatus}
      </span>
    );
  };
  return (
    <div className="mt-5 border-t border-t-[#393940] pt-[1.37rem]">
      <div className="flex items-center justify-between">
        {left()} {right()}
      </div>
      {status === '합주확정' && <button type="button">리뷰쓰기</button>}
    </div>
  );
}
