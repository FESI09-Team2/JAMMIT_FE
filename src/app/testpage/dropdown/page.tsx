'use client';

import { useState } from 'react';
import Dropdown from '@/components/commons/Dropdown';
import useSortedData from '@/hooks/useSortByOption';
import ArrowDown from '@/assets/icons/ic_arrowdown.svg';

const OPTION = ['최신 순', '리뷰 높은 순', '참여 인원 순'];

export default function Home() {
  const [sortOption, setSortOption] = useState(OPTION[0]);
  const sortedData = useSortedData(sortOption);

  return (
    <>
      <Dropdown
        onSelect={setSortOption}
        menuOptions={OPTION} // 여기서 정렬 옵션을 설정
        prefixIcon={<ArrowDown />} // 지정하지 않으면 기본 아이콘 사용
      />
      <div className="mt-4 space-y-2">
        {sortedData.map((item) => (
          <div key={item.id} className="rounded-lg border px-4 py-2 shadow-sm">
            <p className="font-semibold">{item.title}</p>
            <p>리뷰: {item.review}</p>
            <p>참여 인원: {item.participants}</p>
            <p>작성일: {item.createdAt}</p>
          </div>
        ))}
      </div>
    </>
  );
}
