import { useState } from 'react';
import Dropdown from '@/components/commons/Dropdown';
import NumberInput from './NumberInput';
import { SESSION_TAGS, SESSION_KEY_MAP } from '@/constants/tags';
import ArrowDown from '@/assets/icons/ic_arrowdown.svg';

interface SessionSelectorProps {
  session: Record<string, number>;
  sortOption: string;
  setSortOption: (val: string) => void;
  onChange: (value: number) => void;
  /** 이미 선택된 옵션 */
  selectedOptions?: string[];
}

export default function SessionSelector({
  session,
  sortOption,
  setSortOption,
  onChange,
  selectedOptions = [],
}: SessionSelectorProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const availableOptions = SESSION_TAGS.filter(
    (tag) => !selectedOptions.includes(tag) || tag === sortOption,
  );

  return (
    <div className="flex gap-[0.75rem]">
      <Dropdown
        onSelect={setSortOption}
        menuOptions={availableOptions}
        surfixIcon={<ArrowDown />}
        size="md"
        value={sortOption}
        isOpen={isDropdownOpen}
        setIsOpen={setIsDropdownOpen}
        placeholder="세션을 선택하세요."
      />
      <NumberInput
        count={session[SESSION_KEY_MAP[sortOption]] || 0}
        onChange={onChange}
      />
    </div>
  );
}
