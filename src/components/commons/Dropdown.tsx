'use client';

import { ReactNode, useRef, useState } from 'react';
import { useClickOutside } from '@/hooks/useClickOutside';
import DropdownMenuList from './DropdownMenuList';

interface DropdownProps {
  onSelect: (selectedDropdownMenu: string) => void;
  menuOptions: string[];
  singleIcon?: ReactNode;
  surfixIcon?: ReactNode;
  prefixIcon?: ReactNode;
  isProfile?: boolean;
  width?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Dropdown({
  onSelect,
  menuOptions,
  singleIcon,
  surfixIcon,
  prefixIcon,
  isProfile = false,
  size,
}: DropdownProps) {
  const sizeClass = {
    sm: 'w-[6.875rem]',
    md: 'w-[24rem]',
    lg: 'w-auto',
  }[size || 'lg'];
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDropdownMenu, setSelectedDropdownMenu] = useState(
    menuOptions[0] ?? '',
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
          className={`flex ${sizeClass} items-center justify-between gap-[0.625rem] rounded-lg border-0 bg-[#34343A] px-[1rem] py-[0.625rem] text-gray-100 ${isProfile ? 'h-[5rem] w-[5rem] border-none p-0' : ''} `}
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
