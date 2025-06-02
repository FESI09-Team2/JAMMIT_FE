import DefaultProfileImage from '@/assets/icons/ic_default_profile.svg';
import EditIcon from '@/assets/icons/ic_edit.svg';

export default function UserCard() {
  const handleProfileEdit = () => {
    alert('프로필수정버튼클릭');
  };

  return (
    <div className="flex h-[250px] w-[full] items-center justify-center gap-[53px] bg-[#36114E]">
      <div>
        <DefaultProfileImage width={128} height={128} />
      </div>
      <div className="flex flex-col text-gray-100">
        <div className="flex items-center gap-[10px]">
          <p className="text-[24px] leading-[38.4px] font-bold">사용자닉네임</p>
          <button type="submit" onClick={handleProfileEdit}>
            <EditIcon width={18} height={18} />
          </button>
        </div>
        <div className="flex items-center gap-[16px] text-sm font-medium">
          <p>담당 세션</p>
          <div className="h-[32px] w-[76px] rounded-lg bg-[#34343A] px-[12px] py-[6px]">
            일렉 기타
          </div>
          <div className="h-[20px] w-[1.5px] bg-gray-500" />
          <p>선호 장르</p>
          <div className="h-[32px] w-[76px] rounded-lg bg-[#34343A] px-[12px] py-[6px]">
            일렉 기타
          </div>
          <div className="h-[20px] w-[1.5px] bg-gray-500" />
          <p>개설모임수</p>
          <p>8</p>
          <div className="h-[20px] w-[1.5px] bg-gray-500" />
          <p>작성글수</p>
          <p>20</p>
        </div>
      </div>
    </div>
  );
}
