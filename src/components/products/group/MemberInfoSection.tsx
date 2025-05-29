'use client';
import { useState } from 'react';
import MemberRow from './MemberRow';

interface Member {
  id: string;
  nickname: string;
  sessions: string[];
  introduction: string;
  profileImage?: File | null;
}

const members: Member[] = [
  {
    id: 'm1',
    nickname: '내가왔다',
    sessions: ['보컬', '일렉기타'],
    introduction:
      '안녕하세요, 기타치고 노래하는 내가 왔다입니다~! 저는 빠르고 경쾌한 곡에 잘 어울리는 목소리이고 프로페셔널한 마인드입니다. ',
  },
  {
    id: 'm2',
    nickname: '리버스캥거루',
    sessions: ['건반'],
    introduction: '피아노 치는 캥거루입니다!',
  },
  {
    id: 'm3',
    nickname: '코드장인',
    sessions: ['드럼'],
    introduction: '리듬은 제 전문입니다.',
  },
  {
    id: 'm4',
    nickname: '하모닉고수',
    sessions: ['베이스'],
    introduction: '화음을 받치는 베이스맨입니다.',
  },
];

export default function MemberInfoSection() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleSelectChange = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  return (
    <section className="w-[60rem] rounded-[0.5rem] bg-[#202024] p-[2.5rem]">
      {members.map((member) => (
        <MemberRow
          key={member.id}
          id={member.id}
          nickname={member.nickname}
          sessions={member.sessions}
          introduction={member.introduction}
          profileImage={member.profileImage}
          selected={selectedIds.includes(member.id)}
          onSelectChange={handleSelectChange}
        />
      ))}
    </section>
  );
}
