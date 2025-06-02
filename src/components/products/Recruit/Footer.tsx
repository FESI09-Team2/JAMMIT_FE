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
      case '모집중':
        return (
          <div className="group relative">
            <span className="text-[var(--primary)]">{text}</span> 명{cardStatus}
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
      case '신청완료':
        return (
          <p className="rounded-lg border border-[var(--purple-500)] bg-[var(--bg-34343A)] px-3 py-1.5 text-sm font-medium text-[var(--purple-500)]">
            신청완료
          </p>
        );
      case '합주확정':
        return (
          <p className="flex items-center gap-1 rounded-lg border border-[var(--purple-500)] bg-[var(--bg-34343A)] px-3 py-1.5 text-sm font-medium text-white">
            <IcListCheck />
            합주확정
          </p>
        );
      case '합주완료':
        return (
          <p className="rounded-lg bg-[var(--bg-34343A)] px-3 py-1.5 text-sm font-medium text-[var(--gray-400)]">
            합주완료
          </p>
        );
      default:
        return null;
    }
  };
  const left = () => {
    if (status === '모집중') {
      return <span>{getDate(recruitDeadline as string)}</span>;
    }
    return (
      <div>
        <span className="text-[var(--primary)]">{text}</span> 명 {cardStatus}
      </div>
    );
  };
  return (
    <div className="mt-5 border-t border-t-[#393940] pt-[1.37rem]">
      <div className="flex items-center justify-between">
        {left()} {right()}
      </div>
      {status === '합주완료' && (
        <button
          type="button"
          className="mt-5 h-[44px] w-full rounded-lg border border-[var(--purple-500)] bg-[#242429] text-center text-[var(--purple-500)]"
        >
          리뷰쓰기
        </button>
      )}
    </div>
  );
}
