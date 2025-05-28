'use client';

import { useState, useEffect, useRef } from 'react';
import SearchIcon from '@/assets/icons/ic_search.svg';

interface PostcodeData {
  address: string;
}

interface DaumPostcodeConstructor {
  new (options: { oncomplete: (data: PostcodeData) => void }): {
    open: () => void;
  };
}

interface Daum {
  Postcode: DaumPostcodeConstructor;
}

declare global {
  interface Window {
    daum?: Daum;
  }
}

export default function SearchInput() {
  const [address, setAddress] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleSearchClick = () => {
    if (!window.daum?.Postcode) {
      return;
    }

    const postcode = new window.daum.Postcode({
      oncomplete: (data) => {
        setAddress(data.address);
        if (inputRef.current) {
          inputRef.current.value = data.address;
          inputRef.current.focus();
        }
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
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="장소명을 검색하세요."
          readOnly
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
