'use client';

import { ReactNode, useRef, useState } from 'react';
import SurfixIcon from '@/assets/icons/ic_sort.svg';
import { useClickOutside } from '@/hooks/useClickOutside';

interface DropdownProps {
  onSelect: (selectedDropdownMenu: string) => void;
  menuOptions: string[];
  prefixIcon?: ReactNode;
}

export default function Dropdown({
  onSelect,
  menuOptions,
  prefixIcon,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDropdownMenu, setSelectedDropdownMenu] = useState('최신 순');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  const handleDropdownMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (DropdownMenu: string) => {
    setSelectedDropdownMenu(DropdownMenu);
    setIsOpen(false);
    onSelect(DropdownMenu);
  };

  return (
    // TODO: 글자나 시안 확정됨에 따라 w-auto랑 h-auto 수정
    <div className="h-auto w-auto" ref={dropdownRef}>
      <div className="relative">
        <button
          onClick={handleDropdownMenu}
          className="flex items-center justify-between gap-[0.625rem] rounded-xl border border-gray-100 px-[0.75rem] py-[0.5rem] text-gray-800"
        >
          {prefixIcon ? (
            <>
              {prefixIcon}
              <span>{selectedDropdownMenu}</span>
            </>
          ) : (
            <>
              <span className="hidden sm:inline">{selectedDropdownMenu}</span>
              <SurfixIcon />
            </>
          )}
        </button>

        {isOpen && (
          <div className="absolute gap-[0.625rem] rounded-xl border border-gray-100 text-gray-800">
            {menuOptions.map((option) => (
              <div
                key={option}
                onClick={() => handleSelect(option)}
                className="cursor-pointer rounded-xl px-[0.75rem] py-[0.5rem] hover:bg-orange-100"
              >
                <span>{option}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
