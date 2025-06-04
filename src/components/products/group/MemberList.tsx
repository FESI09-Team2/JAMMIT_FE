import { Member } from '@/types/member';
import Checkbox from '@/assets/icons/ic_checkbox.svg';
import CheckboxEmpty from '@/assets/icons/ic_checkbox_empty.svg';
import MemberRow from './MemberRow';

interface MemberListProps {
  title: string;
  members: Member[];
  isSelectable?: boolean;
  selectedIds?: string[];
  setSelectedIds?: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function MemberList({
  title,
  members,
  isSelectable = true,
  selectedIds = [],
  setSelectedIds,
}: MemberListProps) {
  const handleSelectChange = (id: string) => {
    if (!isSelectable || !setSelectedIds) return;

    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const handleSelectAll = () => {
    if (!isSelectable || !setSelectedIds) return;

    if (selectedIds.length === members.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(members.map((m) => m.id));
    }
  };

  const allSelected = selectedIds.length === members.length;

  return (
    <div>
      <div className="mb-[0.5rem] text-[1.5rem] font-bold">
        {title}{' '}
        {members.length != 0 && (
          <span className="font-medium text-[#A339FF]">{members.length}</span>
        )}
      </div>
      <div className="flex h-[3rem] items-center gap-[1.25rem] bg-[#25252a] px-[1.0625rem] text-[0.9375rem] font-bold">
        {isSelectable ? (
          <div onClick={handleSelectAll} className="cursor-pointer">
            {allSelected ? <Checkbox /> : <CheckboxEmpty />}
          </div>
        ) : (
          <div className="w-[1rem]" />
        )}
        <p className="ml-[4.25rem] w-[8.6875rem]">닉네임</p>
        <p className="w-[10.4375rem]">신청 세션</p>
        <p className="w-[22.875rem]">소개</p>
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
          isSelectable={isSelectable}
        />
      ))}
    </div>
  );
}
