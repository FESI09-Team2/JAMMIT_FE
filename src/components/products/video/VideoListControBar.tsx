'use client';
import IcSort from '@/assets/icons/ic_sort.svg';
import Button from '@/components/commons/Button';

interface VideoListControlBarProps {
  sort: 'latest' | 'popular';
  setSort: (sort: 'latest' | 'popular') => void;
}

export default function VideoListControlBar({
  sort,
  setSort,
}: VideoListControlBarProps) {
  const sortLabel = sort === 'latest' ? '최신순' : '인기순';

  const toggleSort = () => {
    setSort(sort === 'latest' ? 'popular' : 'latest');
  };

  return (
    <div className="mt-[60px] mb-[32px] flex w-full justify-between">
      <button
        onClick={toggleSort}
        className="pc:h-10 pc:w-[6.875rem] pc:gap-1 pc:rounded-lg pc:text-sm flex h-9 w-9 items-center justify-center gap-0 rounded-xl bg-[var(--gray-100)] text-[0px]"
      >
        <IcSort />
        {sortLabel}
      </button>
      <Button size="small" variant="solid">
        글 작성
      </Button>
    </div>
  );
}
