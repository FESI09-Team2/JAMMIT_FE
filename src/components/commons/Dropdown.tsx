'use client';

import { ReactNode, useRef, useState } from 'react';
import { useClickOutside } from '@/hooks/useClickOutside';
import DropdownMenuList from './DropdownMenuList';

interface DropdownProps {
  /** 사용자가 드롭다운 항목을 선택했을 때 호출되는 콜백 함수 */
  onSelect: (selectedDropdownMenu: string) => void;
  /** 드롭다운에 표시할 메뉴 항목 목록 */
  menuOptions: string[];
  /** 단일 아이콘(네비바 프로필) */
  singleIcon?: ReactNode;
  /** 텍스트 뒤 아이콘 */
  surfixIcon?: ReactNode;
  /** 텍스트 앞 아이콘 */
  prefixIcon?: ReactNode;
  isProfile?: boolean;
  /** Dropdown의 너비 */
  size?: 'sm' | 'md' | 'lg';
  value?: string;
}

export default function Dropdown({
  onSelect,
  menuOptions,
  singleIcon,
  surfixIcon,
  prefixIcon,
  isProfile = false,
  size,
  value,
}: DropdownProps) {
  const sizeClass = {
    sm: 'w-[6.875rem]',
    md: 'w-[24rem]',
    lg: 'w-auto',
  }[size || 'lg'];

  const [isOpen, setIsOpen] = useState(false);
  const [selectedDropdownMenu, setSelectedDropdownMenu] = useState(
    value || menuOptions[0] || '',
  );
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
    <div className="h-[2.75rem] w-auto" ref={dropdownRef}>
      <div className="relative">
        <button
          onClick={handleDropdownMenu}
          className={`flex ${sizeClass} items-center justify-between gap-[0.625rem] rounded-lg border-0 bg-[#34343A] px-[1rem] py-[0.625rem] text-gray-100 ${
            isProfile ? 'h-[5rem] w-[5rem] border-none p-0' : ''
          }`}
          type="button"
        >
          {isProfile ? (
            singleIcon
          ) : prefixIcon ? (
            <>
              {prefixIcon}
              <span>{selectedDropdownMenu}</span>
            </>
          ) : (
            <>
              <span className="hidden sm:inline">{selectedDropdownMenu}</span>
              {surfixIcon}
            </>
          )}
        </button>

        {isOpen && (
          <DropdownMenuList
            menuOptions={menuOptions}
            onSelect={handleSelect}
            size={size}
          />
        )}
      </div>
    </div>
  );
}
