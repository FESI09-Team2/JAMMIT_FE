'use client';

import clsx from 'clsx';
import { useQueryTab } from '@/hooks/useQueryTab';
import UserCard from '@/components/products/mypage/UserCard';

export default function MyPage() {
  const { activeTab, setTab } = useQueryTab<
    'participating' | 'received' | 'towrite'
  >('tab', 'participating', ['participating', 'received', 'towrite']);

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
            onClick={() => setTab('received')}
            className={clsx(
              'flex items-center gap-[0.25rem]',
              tabClass(activeTab === 'received'),
              activeTab === 'received' ? 'text-purple-500' : 'text-gray-400',
            )}
          >
            {/** API 데이터 교체 필요 */}
            {`내가 받은 리뷰 ${2}`}
          </button>
        </div>
        <div className="flex items-center gap-[0.2rem]">
          <button
            onClick={() => setTab('towrite')}
            className={clsx(
              'flex items-center gap-[0.25rem]',
              tabClass(activeTab === 'towrite'),
              activeTab === 'towrite' ? 'text-purple-500' : 'text-gray-400',
            )}
          >
            {/** API 데이터 교체 필요 */}
            {`작성 가능한 리뷰 ${2}`}
          </button>
        </div>
      </div>
    </>
  );
}
