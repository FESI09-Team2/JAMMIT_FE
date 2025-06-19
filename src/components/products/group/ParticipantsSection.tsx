'use client';

import Button from '@/components/commons/Button';
import ModalReview from '@/components/commons/Modal/ModalReview';
import ProfileImage from '@/components/commons/ProfileImage';
import { ReviewField, tagToFieldMap } from '@/constants/review';
import { SESSION_ENUM_TO_KR } from '@/constants/tagsMapping';
import { usePostReviewMutation } from '@/hooks/queries/review/usePostReviewMutation';
import { useToastStore } from '@/stores/useToastStore';
import { useUserStore } from '@/stores/useUserStore';
import { GatheringDetailResponse, Participant } from '@/types/gathering';
import { ReviewItem } from '@/types/review';
import { handleAuthApiError } from '@/utils/authApiError';
import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';

interface ParticipantsSectionProps {
  gathering: GatheringDetailResponse;
  participants: Participant[];
  writtenReviews: ReviewItem[] | undefined;
}

export default function ParticipantsSection({
  gathering,
  participants,
  writtenReviews,
}: ParticipantsSectionProps) {
  const user = useUserStore((state) => state.user);
  const isHost = user?.id === gathering.creator.id;

  const isParticipating = participants.some(
    (participant) => participant.userId === user?.id,
  );

  const isCompleted = gathering.status === 'COMPLETED';
  const [selectedParticipant, setSelectedParticipant] = useState<{
    userId: number;
    nickname: string;
  } | null>(null);
  const reviewMutation = usePostReviewMutation();

  const participantsWithHost: Participant[] = [
    {
      participantId: -1, // 임의의 숫자
      userId: gathering.creator.id,
      userNickname: gathering.creator.nickname,
      userEmail: 'host@example.com', // 임의 이메일
      bandSession: 'VOCAL', // 임의 세션
      status: 'COMPLETED',
      createdAt: new Date().toISOString(), // 임의 시간 (현재 시간)
      introduction: '',
      profileImagePath: '',
    },
    ...participants,
  ];

  const handleOpenReviewModal = (userId: number, nickname: string) => {
    setSelectedParticipant({ userId, nickname });
  };

  const handleCloseReviewModal = () => {
    setSelectedParticipant(null);
  };

  const handleSubmitReview = (formData: { review: string; tags: string[] }) => {
    if (!selectedParticipant) return;

    const tagFields = Object.entries(tagToFieldMap).reduce(
      (acc, [tag, field]) => {
        acc[field] = formData.tags.includes(tag);
        return acc;
      },
      {} as Record<ReviewField, boolean>,
    );

    const reviewData = {
      revieweeId: selectedParticipant.userId,
      gatheringId: gathering.id,
      content: formData.review,
      ...tagFields,
    };

    reviewMutation.mutate(reviewData, {
      onSuccess: () => {
        handleCloseReviewModal();
        useToastStore.getState().show('리뷰가 성공적으로 작성되었습니다.');
      },
      onError: (error) => {
        handleAuthApiError(error, '리뷰 작성 중 오류가 발생했습니다.', {
          section: 'review',
          action: 'create_review',
        });
      },
    });
    handleCloseReviewModal();
  };

  return (
    <section className="pc:w-[960px] tab:p-[40px] w-full rounded-[8px] bg-[#202024] p-[20px]">
      <div className="flex flex-col justify-between gap-[10px]">
        <h1 className="group-info-title">{gathering.name}</h1>
        <p className="group-info-subtitle">{gathering.creator.nickname}</p>
      </div>

      <div className="group-info-divider-line" />
      {participantsWithHost.map(
        (
          {
            participantId,
            userNickname,
            bandSession,
            introduction,
            userId,
            profileImagePath,
          },
          index,
        ) => {
          const hasWrittenReview = writtenReviews?.some(
            (review) =>
              review.revieweeId === userId &&
              review.gatheringId === gathering.id,
          );
          const isHostItem = index === 0;

          return (
            <div key={participantId}>
              <div className="pc:flex-row pc:items-center my-[12px] flex flex-col">
                <div className="tab:gap-[20px] mr-[20px] flex items-center gap-[12px]">
                  <ProfileImage src={profileImagePath} size={3} />

                  <div className="pc:w-[139px] flex items-center">
                    <span className="text-[16px] underline underline-offset-2">
                      {userNickname}
                    </span>
                    {isHostItem && (
                      <div className="ml-[7px] flex h-[16px] w-[46px] items-center justify-center rounded-[8.5008px] bg-purple-700 text-center text-[12px] font-semibold">
                        주최자
                      </div>
                    )}
                  </div>

                  <div className="pc:w-[167px] flex gap-[4px]">
                    {!isHostItem && (
                      <div className="rounded-[8px] bg-[#34343A] px-[12px] py-[6px] text-gray-100">
                        {SESSION_ENUM_TO_KR[bandSession]}
                      </div>
                    )}
                  </div>
                </div>

                <div
                  className={clsx(
                    'pc:mt-0 mt-[12px] flex items-center break-keep text-ellipsis whitespace-pre-line',
                    isCompleted ? 'pc:w-[326px]' : 'pc:w-[470px]',
                  )}
                >
                  {introduction}
                </div>

                {isCompleted &&
                  user?.id !== userId &&
                  (isParticipating || isHost) && (
                    <div className="pc:mt-0 mt-[12px]">
                      {hasWrittenReview ? (
                        <Button
                          disabled
                          variant="outline"
                          className="pc:w-[7.75rem] w-full"
                        >
                          리뷰 작성 완료
                        </Button>
                      ) : (
                        <Button
                          className="pc:w-[7.75rem] w-full"
                          variant="outline"
                          onClick={() =>
                            handleOpenReviewModal(userId, userNickname)
                          }
                        >
                          리뷰 쓰기
                        </Button>
                      )}
                    </div>
                  )}
              </div>
              <div className="border-b-[1px] border-[#2D3035]" />
            </div>
          );
        },
      )}
      {participants.length === 0 && (
        <div className="mt-[40px] flex w-full flex-col items-center justify-center">
          <Image
            src="/images/img_character01.png"
            alt="링크 공유 캐릭터 이미지"
            width={128}
            height={128}
          />
          <div className="h-[24px] w-full pt-[8px] text-center text-gray-400">
            아직 참여 멤버가 없어요~
          </div>
        </div>
      )}
      {selectedParticipant && (
        <ModalReview
          onCancel={handleCloseReviewModal}
          onSubmit={handleSubmitReview}
          revieweeNickname={selectedParticipant.nickname}
        />
      )}
    </section>
  );
}
