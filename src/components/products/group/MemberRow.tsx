import Checkbox from '@/assets/icons/ic_checkbox.svg';
import CheckboxEmpty from '@/assets/icons/ic_checkbox_empty.svg';
import ProfileImage from '@/components/commons/ProfileImage';
import { SESSION_ENUM_TO_KR } from '@/constants/tagsMapping';
import Link from 'next/link';

interface MemberRowProps {
  id: number;
  selected: boolean;
  onSelectChange: (id: number) => void;
  nickname: string;
  session: string;
  introduction: string;
  profileImage?: string | null;
  isSelectable?: boolean;
  gatheringId?: number;
}

export default function MemberRow({
  id,
  selected,
  onSelectChange,
  nickname,
  session,
  introduction,
  profileImage = null,
  isSelectable = true,
  gatheringId: gatheringId,
}: MemberRowProps) {
  return (
    <div>
      <div className="my-[12px] flex items-center gap-[20px] px-[17px]">
        {isSelectable ? (
          <div onClick={() => onSelectChange(id)} className="cursor-pointer">
            {selected ? <Checkbox /> : <CheckboxEmpty />}
          </div>
        ) : (
          <div className="w-[16px]" />
        )}

        <div className="pc:flex-row flex w-full flex-col">
          <div className="tab:gap-[20px] mr-[20px] flex items-center gap-[12px]">
            <ProfileImage src={profileImage} size={3} />

            <div className="pc:w-[139px] underline underline-offset-2">
              <Link href={`/group/${gatheringId}/reviews/${id}`}>
                {nickname}
              </Link>
            </div>

            <div className="pc:w-[167px] flex gap-[4px]">
              <div className="rounded-[8px] bg-[#34343A] px-[12px] py-[6px] text-gray-100">
                {SESSION_ENUM_TO_KR[session]}
              </div>
            </div>
          </div>

          <div className="pc:w-[366px] pc:mt-0 mt-[12px] break-keep whitespace-pre-line">
            {introduction}
          </div>
        </div>
      </div>

      <div className="border-b-[1px] border-[#2D3035]" />
    </div>
  );
}
