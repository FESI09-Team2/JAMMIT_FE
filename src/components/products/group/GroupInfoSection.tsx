import TagSelector from '@/components/commons/TagSelector';
import { GENRE_TAGS } from '@/constants/tags';
import Button from '@/components/commons/Button';

interface GroupInfoSectionProps {
  title: string;
  hostName: string;
  location: string;
  meetingDate: string;
  closingDate: string;
  sessions: {
    name: string;
    current: number;
    max: number;
  }[];
  genres: string[];
  description: string;
}

export default function GroupInfoSection({
  title,
  hostName,
  location,
  meetingDate,
  closingDate,
  sessions,
  genres,
  description,
}: GroupInfoSectionProps) {
  const actionButtons = [
    {
      label: '수정하기',
      variant: 'solid',
      onClick: () => {
        // TODO: 수정하기 로직
        console.log('수정하기 클릭');
      },
    },
    {
      label: '삭제하기',
      variant: 'outline',
      onClick: () => {
        // TODO: 삭제하기 로직
        console.log('삭제하기 클릭');
      },
    },
  ];

  return (
    <>
      <section className="w-[60rem] rounded-[0.5rem] bg-[#202024] p-[2.5rem]">
        {/* TODO: 하트 컴포넌트 추가 */}

        {/* 모임 제목, 주최자 */}
        <div className="flex h-[4.375rem] flex-col justify-between">
          <h1 className="group-info-title">{title}</h1>
          <p className="group-info-subtitle">{hostName}</p>
        </div>

        <div className="group-info-divider-line" />

        {/* 모임 장소, 날짜, 모집 종료일 */}
        <div className="flex flex-col gap-2 text-sm">
          <div className="group-info-text">
            <span className="group-info-subtitle mr-[0.5rem]">모임 장소 </span>
            {location}
          </div>
          <div className="mt-[1.25rem] flex gap-[2.5rem]">
            {[
              { label: '모임 날짜', value: meetingDate },
              { label: '모집 종료', value: closingDate },
            ].map(({ label, value }) => (
              <div key={label} className="group-info-text">
                <span className="group-info-subtitle mr-[0.5rem]">{label}</span>
                {value}
              </div>
            ))}
          </div>
        </div>

        <div className="group-info-divider-line" />

        {/* 모집 현황 */}
        <div className="flex gap-[1.25rem]">
          <div>
            <p className="group-info-subtitle mb-[1.25rem]">모집 현황</p>
            <div className="grid w-[18.813rem] grid-cols-2 gap-x-[2rem] gap-y-[0.5rem]">
              {sessions.map(({ name, current, max }) => (
                <div
                  key={name}
                  className="flex w-[8.875rem] items-center justify-between"
                >
                  <span className="rounded-[0.5rem] bg-[#34343a] px-[0.75rem] py-[0.375rem] text-sm text-[0.875rem] text-white">
                    {name}
                  </span>
                  <span className="group-info-text w-[2.875rem]">
                    {current}/{max}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 모임 장르 */}
          <div className="w-[32.438rem]">
            <p className="group-info-subtitle mb-[1.25rem]">모임 장르</p>
            <TagSelector
              tags={GENRE_TAGS}
              mode="readonly"
              initialSelected={genres}
            />
          </div>
        </div>

        <div className="group-info-divider-line" />

        {/* 모임 소개글 */}
        <p className="group-info-subtitle mb-[1.25rem]">모임 소개글</p>
        <div className="group-info-text whitespace-pre-line">{description}</div>
      </section>

      <div className="flex flex-col gap-[1.25rem]">
        {/* TODO: 주최자가 아니면 신청 UI 보이게 */}
        {actionButtons.map(({ label, variant, onClick }) => (
          <Button
            key={label}
            variant={variant as 'solid' | 'outline'}
            className="w-[22.75rem]"
            onClick={onClick}
          >
            {label}
          </Button>
        ))}
      </div>
    </>
  );
}
