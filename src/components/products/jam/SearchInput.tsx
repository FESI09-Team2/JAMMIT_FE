'use client';

import { useEffect, useRef } from 'react';
import SearchIcon from '@/assets/icons/ic_search.svg';

interface SearchInputProps {
  value: string;
  onChange: (val: string) => void;
}

export default function SearchInput({ value, onChange }: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleSearchClick = () => {
    const { daum } = window;

    if (!daum?.Postcode) {
      alert('주소 검색 로딩 중입니다. 잠시만 기다려 주세요.');
      return;
    }

    const postcode = new daum.Postcode({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      oncomplete: (data: any) => {
        onChange(data.address);
        inputRef.current?.focus();
      },
    });

    postcode.open();
  };

  return (
    <div className="flex flex-col gap-[0.5rem]">
      <label className="block text-sm text-gray-100">모임 장소</label>
      <div className="relative w-[27.9375rem] text-gray-400">
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="장소명을 검색하세요."
          className="h-[2.75rem] w-full rounded-lg border-0 bg-[#34343A] px-[1rem] py-[0.625rem]"
        />
        <button
          type="button"
          className="absolute top-1/2 right-3 -translate-y-1/2"
          onClick={handleSearchClick}
        >
          <SearchIcon />
        </button>
      </div>
    </div>
  );
}
