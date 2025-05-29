import { Member } from '@/types/member';
import Checkbox from '@/assets/icons/ic_checkbox.svg';
import CheckboxEmpty from '@/assets/icons/ic_checkbox_empty.svg';
import MemberRow from './MemberRow';
import { useState } from 'react';

interface MemberListProps {
  title: string;
  members: Member[];
}

export default function MemberList({ title, members }: MemberListProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleSelectChange = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const handleSelectAll = () => {
    if (selectedIds.length === members.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(members.map((m) => m.id));
    }
  };

  const allSelected = selectedIds.length === members.length;

  return (
    <div>
      <div className="mb-[8px] text-[24px] font-bold">
        {title}{' '}
        {members.length != 0 && (
          <span className="font-medium text-[#A339FF]">{members.length}</span>
        )}
      </div>
      <div className="flex h-[48px] items-center gap-[20px] bg-[#25252a] px-[17px] text-[15px] font-bold">
        <div onClick={handleSelectAll} className="cursor-pointer">
          {allSelected ? <Checkbox /> : <CheckboxEmpty />}
        </div>
        <p className="ml-[68px] w-[139px]">닉네임</p>
        <p className="w-[167px]">신청 세션</p>
        <p className="w-[366px]">소개</p>
      </div>
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
    </div>
  );
}
