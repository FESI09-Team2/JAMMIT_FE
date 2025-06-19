'use client';
import TagSelector from '@/components/commons/TagSelector';
import { GENRE_TAGS } from '@/constants/tags';
import Button from '@/components/commons/Button';
import { GatheringDetailResponse } from '@/types/gathering';
import { GENRE_ENUM_TO_KR, SESSION_ENUM_TO_KR } from '@/constants/tagsMapping';
import { formatDateToKoreanStyle } from '@/utils/formatDate';
import { useDeleteGatheringMutation } from '@/hooks/queries/gatherings/useDeleteGatheringMutation';
import { useRouter } from 'next/navigation';
import { GatheringCard } from '@/types/card';
import Like from '@/components/commons/Card/Like';
import ShareIcon from '@/assets/icons/ic_share.svg';
import ShareLinkModal from './ShareLinkModal';
import { useState } from 'react';
import ModalInteraction from '@/components/commons/Modal/ModalInteraction';

interface GroupInfoSectionProps {
  gathering: GatheringDetailResponse;
  isHost: boolean;
}

export default function GroupInfoSection({
  gathering,
  isHost,
}: GroupInfoSectionProps) {
  const router = useRouter();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const {
    name,
    place,
    gatheringDateTime,
    recruitDeadline,
    genres,
    sessions,
    description,
    creator,
    status,
    id,
  } = gathering;

  const isRecruiting = status == 'RECRUITING';

  const deleteMutation = useDeleteGatheringMutation();

  const handleDelete = () => {
    deleteMutation.mutate(id);
    setIsDeleteModalOpen(false);
  };

  const actionButtons = [
    {
      label: '수정하기',
      variant: 'solid',
      onClick: () => {
        router.push(`/group/${id}/edit`);
      },
    },
    {
      label: '삭제하기',
      variant: 'outline',
      onClick: () => {
        setIsDeleteModalOpen(true);
      },
    },
  ];

  return (
    <>
      <section className="pc:max-w-[960px] tab:p-[40px] w-full rounded-[8px] bg-[#202024] p-[20px]">
        {/* 모임 제목, 주최자 */}
        <div className="relative flex flex-col gap-[10px]">
          <div className="flex w-full justify-between">
            <h1 className="group-info-title">{name}</h1>
          </div>
          <p className="group-info-subtitle">{creator.nickname}</p>
          <ShareIcon
            className="pc:top-0 absolute right-10 bottom-0 w-7 cursor-pointer"
            onClick={() => setIsShareModalOpen(true)}
          />
          <div className="pc:top-[-4] absolute right-0 bottom-7">
            <Like item={convertToCardItem(gathering)} />
          </div>
        </div>

        <div className="group-info-divider-line" />

        {/* 모임 장소, 날짜, 모집 종료일 */}
        <div className="pc:gap-2 flex flex-col text-sm">
          <div className="group-info-text">
            <span className="group-info-subtitle mr-[8px]">모임 장소 </span>
            {place}
          </div>
          <div className="pc:flex-row pc:gap-[40px] mt-[20px] flex flex-col gap-[20px]">
            {[
              {
                label: '모임 날짜',
                value: formatDateToKoreanStyle(gatheringDateTime),
              },
              {
                label: '모집 종료',
                value: formatDateToKoreanStyle(recruitDeadline),
              },
            ].map(({ label, value }) => (
              <div key={label} className="group-info-text">
                <span className="group-info-subtitle mr-[8px]">{label}</span>
                {value}
              </div>
            ))}
          </div>
        </div>

        <div className="group-info-divider-line" />

        {/* 모집 현황 */}
        <div className="pc:flex-row flex flex-col gap-[20px]">
          <div>
            <p className="group-info-subtitle mb-[20px]">모집 현황</p>
            <div className="grid w-[301.008px] grid-cols-2 gap-x-[32px] gap-y-[8px]">
              {sessions.map(({ bandSession, currentCount, recruitCount }) => (
                <div
                  key={bandSession}
                  className="flex w-[142px] items-center justify-between"
                >
                  <span className="rounded-[8px] bg-[#34343a] px-[12px] py-[6px] text-sm text-[14px] text-white">
                    {SESSION_ENUM_TO_KR[bandSession]}
                  </span>
                  <span className="group-info-text w-[46px]">
                    {currentCount}/{recruitCount}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 모임 장르 */}
          <div className="pc:w-[519.008px] w-full">
            <p className="group-info-subtitle mb-[20px]">모임 장르</p>
            <TagSelector
              tags={GENRE_TAGS}
              mode="readonly"
              initialSelected={genres.map((genre) => GENRE_ENUM_TO_KR[genre])}
            />
          </div>
        </div>

        <div className="group-info-divider-line" />

        {/* 모임 소개글 */}
        <p className="group-info-subtitle mb-[20px]">모임 소개글</p>
        <div className="group-info-text break-keep whitespace-pre-line">
          {description}
        </div>
      </section>

      <div className="ml-[20px]">
        {isRecruiting && isHost && (
          <div className="flex flex-col gap-[20px]">
            {actionButtons.map(({ label, variant, onClick }) => (
              <Button
                key={label}
                variant={variant as 'solid' | 'outline'}
                className="pc:w-[364px] w-full"
                onClick={onClick}
              >
                {label}
              </Button>
            ))}
          </div>
        )}
      </div>
      {isShareModalOpen && (
        <ShareLinkModal
          inviteLink={`https://jammit-fe-six.vercel.app/group/${id}`}
          onClose={() => setIsShareModalOpen(false)}
        />
      )}
      {isDeleteModalOpen && (
        <ModalInteraction
          message={'정말로 이 모임을\n취소하시겠습니까?'}
          onConfirm={handleDelete}
          onClose={() => setIsDeleteModalOpen(false)}
          isShowCancel
        />
      )}
    </>
  );
}

function convertToCardItem(detail: GatheringDetailResponse): GatheringCard {
  return {
    id: detail.id,
    name: detail.name,
    place: detail.place,
    thumbnail: detail.thumbnail,
    gatheringDateTime: detail.gatheringDateTime,
    totalRecruit: detail.sessions.reduce((sum, s) => sum + s.recruitCount, 0),
    totalCurrent: detail.sessions.reduce((sum, s) => sum + s.currentCount, 0),
    viewCount: 0,
    recruitDeadline: detail.recruitDeadline,
    status: detail.status,
    genres: detail.genres,
    creator: detail.creator,
    sessions: detail.sessions,
  };
}
