'use client';

import clsx from 'clsx';
import { useMemo, useEffect, useState } from 'react';
import { useQueryTab } from '@/hooks/useQueryTab';
import UserCard from '@/components/products/mypage/UserCard';
import Participating from '@/components/products/mypage/gather/Participating';
import Created from '@/components/products/mypage/gather/Created';
import ReviewsReceived from '@/components/products/mypage/review/ReviewsReceived';
import ReviewsToWrite from '@/components/products/mypage/towrite/ReviewsToWrite';
import { useGatherMeCreate } from '@/hooks/queries/gather/useGatherMeCreate';
import { useGatherMeParticipants } from '@/hooks/queries/gather/useGatherMeParticipants';
import { useReviewToWriteInfiniteQuery } from '@/hooks/queries/review/useReviewInfiniteQuery';
import { useReviewInfiniteQuery } from '@/hooks/queries/review/useSuspenseReview';
import { GatheringCard } from '@/types/card';

type TabKey =
  | 'participating'
  | 'created'
  | 'reviews_received'
  | 'reviews_towrite';

export default function MyPage() {
  const { activeTab, setTab } = useQueryTab<TabKey>('tab', 'participating', [
    'participating',
    'created',
    'reviews_received',
    'reviews_towrite',
  ]);

  // 참가한 모임
  const [participatingPage, setParticipatingPage] = useState(0);
  const [participatingList, setParticipatingList] = useState<GatheringCard[]>(
    [],
  );
  const { data: participatingData } = useGatherMeParticipants({
    page: participatingPage,
    size: 8,
    includeCanceled: true,
  });

  useEffect(() => {
    if (participatingData) {
      setParticipatingList((prev) =>
        participatingPage === 0
          ? participatingData.gatherings
          : [...prev, ...participatingData.gatherings],
      );
    }
  }, [participatingPage, participatingData]);

  // 만든 모임
  const [createdPage, setCreatedPage] = useState(0);
  const [createdList, setCreatedList] = useState<GatheringCard[]>([]);
  const { data: createdData, isSuccess: createdSuccess } = useGatherMeCreate({
    page: createdPage,
    size: 8,
    includeCanceled: true,
  });

  useEffect(() => {
    if (createdSuccess && createdData) {
      setCreatedList((prev) =>
        createdPage === 0
          ? createdData.gatherings
          : [...prev, ...createdData.gatherings],
      );
    }
  }, [createdPage, createdData, createdSuccess]);

  const { data: write } = useReviewToWriteInfiniteQuery({
    size: 8,
    includeCanceled: true,
  });
  const writeCount = write?.pages[0].totalElements ?? 0;

  const { data: review } = useReviewInfiniteQuery({ size: 8 });
  const reviewCount = review?.pages[0].totalElements ?? 0;

  const tabList = useMemo(
    () => [
      {
        key: 'participating',
        label: '참여 모임',
        count: participatingData?.totalElements ?? 0,
        component: (
          <Participating
            gatherings={participatingList}
            currentPage={participatingPage}
            totalPage={participatingData?.totalPage ?? 1}
            onLoadMore={() => {
              if (participatingPage + 1 < (participatingData?.totalPage ?? 1)) {
                setParticipatingPage((prev) => prev + 1);
              }
            }}
          />
        ),
      },
      {
        key: 'created',
        label: '내가 만든 모임',
        count: createdData?.totalElements ?? 0,
        component: (
          <Created
            gatherings={createdList}
            currentPage={createdPage}
            totalPage={createdData?.totalPage ?? 1}
            onLoadMore={() => {
              if (createdPage + 1 < (createdData?.totalPage ?? 1)) {
                setCreatedPage((prev) => prev + 1);
              }
            }}
          />
        ),
      },
      {
        key: 'reviews_received',
        label: '내가 받은 리뷰',
        count: reviewCount,
        component: <ReviewsReceived />,
      },
      {
        key: 'reviews_towrite',
        label: '작성 가능한 리뷰',
        count: writeCount,
        component: <ReviewsToWrite />,
      },
    ],
    [
      participatingList,
      participatingPage,
      participatingData,
      createdList,
      createdPage,
      createdData,
      reviewCount,
      writeCount,
    ],
  );

  const tabClass = (isActive: boolean) =>
    clsx(
      'text-[1rem]',
      isActive
        ? 'text-gray-100 underline decoration-purple-700 decoration-[3px] underline-offset-[6px]'
        : 'text-gray-400 cursor-pointer',
    );

  const renderTabButton = (
    key: TabKey,
    label: string,
    count: number,
    isActive: boolean,
  ) => (
    <div key={key} className="flex items-center gap-[0.2rem]">
      <button
        onClick={() => setTab(key)}
        className={clsx(
          'flex items-center gap-[0.25rem]',
          tabClass(isActive),
          isActive ? 'text-purple-500' : 'text-gray-400',
        )}
      >{`${label} ${count}`}</button>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#212121] pb-[3.75rem]">
      <UserCard />
      <div className="mx-auto flex h-[4.625rem] w-[84rem] gap-[1.25rem]">
        {tabList.map(({ key, label, count }) =>
          renderTabButton(key as TabKey, label, count, activeTab === key),
        )}
      </div>
      <div className="mx-auto h-auto w-[84rem]">
        {tabList.find((tab) => tab.key === activeTab)?.component}
      </div>
    </main>
  );
}
