'use client';
// import CardSkeleton from '@/components/commons/Card/SkeletonItem';
// import { useUserMeQuery } from '@/hooks/queries/user/useUserMeQuery';
// import { getReviewWrite } from '@/lib/review/towrite';
// import { useSentryErrorLogger } from '@/utils/useSentryErrorLogger';
// import { useQuery } from '@tanstack/react-query';

export default function ReviewsToWrite() {
  // const { data: user } = useUserMeQuery();
  // const { data,isLoading,isError } = useQuery({
  //   queryKey: ['write_reviews', user?.id],
  //   queryFn: getReviewWrite,
  // });
  // useSentryErrorLogger({
  //   isError: !!isError,
  //   error: isError,
  //   tags: { section: 'review', action: 'write_reviews' },
  //   extra: { userId: user?.id },
  // });

  // if (isLoading) {
  //   return (
  //     <div className="pc:grid-cols-4 pc:gap-x-5 pc:px-0 tab:px-6 grid grid-cols-1 gap-y-10 px-4">
  //       {Array.from({ length: 8 }).map((_, i) => (
  //         <CardSkeleton key={i} />
  //       ))}
  //     </div>
  //   );
  // }

  // const reviewToCard = (info: GatheringReviewInfo):GatheringCard => {
  //   const participants = info.unwrittenParticipants;
  //   return{
  //     id:info.gatheringId,
  //     name:info.gatheringName,
  //     thumbnail:info.gatheringThumbnail,
  //     place:'성수동 어딘가',
  //     gatheringDateTime: '',
  //     totalRecruit: 0,
  //     totalCurrent: 0,
  //     viewCount: 0,
  //     recruitDeadline: '',
  //     status: participants,
  //     genres: [info.unwrittenParticipants],
  //     creator: { id: participants[0].userId, nickname: participants[0].userNickname },
  //     sessions: participants.map(p => ({
  //       bandSession: p.bandSession as BandSessionType,
  //       recruitCount: 1,
  //       currentCount: 1,
  //     })),
  //   }

  // }
  return (
    // <VirtualGrid
    //   list={(data?.result ?? []).map(reviewToCard)}
    //   item={(item) => (
    //     <CardItem
    //       key={item.id}
    //       item={item}
    //       status={CARD_STATE.ENSEMBLE}
    //     />
    //   )}/>
    <div>d</div>
  );
}
