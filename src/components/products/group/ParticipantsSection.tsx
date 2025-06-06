'use client';
import Image from 'next/image';
import DefaultProfile from '@/assets/icons/ic_default_profile.svg';
import Button from '@/components/commons/Button';

interface ParticipantsSectionProps {
  title: string;
  hostName: string;
}

interface Participant {
  id: number;
  profileImageUrl?: string;
  nickname: string;
  sessions: string[];
  introduction: string;
}

const mockParticipants: Participant[] = [
  {
    id: 1,
    nickname: '드럼마스터',
    sessions: ['드럼'],
    introduction: '리듬을 책임지겠습니다!',
  },
  {
    id: 2,
    // profileImageUrl: '/images/user1.jpg',
    nickname: '기타왕',
    sessions: ['일렉 기타', '통기타'],
    introduction: '화려한 솔로 기대해주세요.',
  },
];

export default function ParticipantsSection({
  title,
  hostName,
}: ParticipantsSectionProps) {
  return (
    <section className="w-[60rem] rounded-[0.5rem] bg-[#202024] p-[2.5rem]">
      <div className="flex h-[4.375rem] flex-col justify-between">
        <h1 className="group-info-title">{title}</h1>
        <p className="group-info-subtitle">{hostName}</p>
      </div>

      <div className="group-info-divider-line" />

      {mockParticipants.map(
        ({ id, profileImageUrl, nickname, sessions, introduction }) => (
          <div key={id}>
            <div className="my-[0.75rem] flex items-center gap-[1.25rem]">
              {profileImageUrl ? (
                <Image
                  src={profileImageUrl}
                  alt="프로필 사진"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              ) : (
                <DefaultProfile
                  alt="기본 프로필 사진"
                  width="3rem"
                  height="3rem"
                />
              )}

              <div className="w-[8.6875rem] underline underline-offset-2">
                {nickname}
              </div>

              <div className="flex w-[10.4375rem] gap-[0.25rem]">
                {sessions.map((session) => (
                  <div
                    key={session}
                    className="rounded-[0.5rem] bg-[#34343A] px-[0.75rem] py-[0.375rem] text-gray-100"
                  >
                    {session}
                  </div>
                ))}
              </div>

              <div className="line-clamp-2 w-[20.375rem] overflow-hidden text-ellipsis">
                {introduction}
              </div>

              <Button className="w-[124px]">리뷰 쓰기</Button>
            </div>
            <div className="border-b-[0.0625rem] border-[#2D3035]" />
          </div>
        ),
      )}
    </section>
  );
}
