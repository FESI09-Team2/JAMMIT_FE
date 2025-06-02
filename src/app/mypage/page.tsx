'use client';

import clsx from 'clsx';
import { useQueryTab } from '@/hooks/useQueryTab';
import UserCard from '@/components/products/mypage/UserCard';
import Participating from '@/components/products/mypage/Participating';
import Created from '@/components/products/mypage/Created';
import ReviewsReceived from '@/components/products/mypage/ReviewsReceived';
import ReviewsToWrite from '@/components/products/mypage/ReviewsToWrite';

export default function MyPage() {
  const { activeTab, setTab } = useQueryTab<
    'participating' | 'created' | 'reviews_received' | 'reviews_towrite'
  >('tab', 'participating', [
    'participating',
    'created',
    'reviews_received',
    'reviews_towrite',
  ]);

  const tabClass = (isActive: boolean) =>
    clsx(
      'text-[1rem]',
      isActive
        ? 'text-gray-100 underline decoration-purple-700 decoration-[3px] underline-offset-[6px]'
        : 'text-gray-400 cursor-pointer',
    );

  return (
    <>
      <UserCard />
      <div className="flex w-full gap-[1.25rem] px-[9rem] py-[1.25rem]">
        <div className="flex items-center gap-[0.2rem]">
          <button
            onClick={() => setTab('participating')}
            className={clsx(
              'flex items-center gap-[0.25rem]',
              tabClass(activeTab === 'participating'),
              activeTab === 'participating'
                ? 'text-purple-500'
                : 'text-gray-400',
            )}
          >
            {/** API 데이터 교체 필요 */}
            {`참여 모임 ${2}`}
          </button>
        </div>
        <div className="flex items-center gap-[0.2rem]">
          <button
            onClick={() => setTab('created')}
            className={clsx(
              'flex items-center gap-[0.25rem]',
              tabClass(activeTab === 'created'),
              activeTab === 'created' ? 'text-purple-500' : 'text-gray-400',
            )}
          >
            {/** API 데이터 교체 필요 */}
            {`내가 만든 모임 ${2}`}
          </button>
        </div>
        <div className="flex items-center gap-[0.2rem]">
          <button
            onClick={() => setTab('reviews_received')}
            className={clsx(
              'flex items-center gap-[0.25rem]',
              tabClass(activeTab === 'reviews_received'),
              activeTab === 'reviews_received'
                ? 'text-purple-500'
                : 'text-gray-400',
            )}
          >
            {/** API 데이터 교체 필요 */}
            {`내가 받은 리뷰 ${2}`}
          </button>
        </div>
        <div className="flex items-center gap-[0.2rem]">
          <button
            onClick={() => setTab('reviews_towrite')}
            className={clsx(
              'flex items-center gap-[0.25rem]',
              tabClass(activeTab === 'reviews_towrite'),
              activeTab === 'reviews_towrite'
                ? 'text-purple-500'
                : 'text-gray-400',
            )}
          >
            {/** API 데이터 교체 필요 */}
            {`작성 가능한 리뷰 ${2}`}
          </button>
        </div>
      </div>

      {activeTab === 'participating' && <Participating />}
      {activeTab === 'created' && <Created />}
      {activeTab === 'reviews_received' && <ReviewsReceived />}
      {activeTab === 'reviews_towrite' && <ReviewsToWrite />}
    </>
  );
}
