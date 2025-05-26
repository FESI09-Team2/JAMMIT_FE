'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import CheckIcon from '@/assets/icons/ic_check.svg';
import PlusIcon from '@/assets/icons/ic_plus.svg';
import { clsx } from 'clsx';

interface TagSelectorProps {
  tags: string[];
  mode: 'selectable' | 'readonly';
  readonlySelected?: string[];
  onChange?: (selected: string[]) => void;
}

export default function TagSelector({
  tags,
  mode = 'selectable',
  readonlySelected,
  onChange,
}: TagSelectorProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const selectedSet = useMemo(
    () => new Set(mode === 'readonly' ? readonlySelected || [] : selected),
    [mode, readonlySelected, selected],
  );

  const toggleTag = useCallback(
    (tag: string) => {
      if (mode === 'readonly') return;
      setSelected((prev) =>
        prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
      );
    },
    [mode],
  );

  useEffect(() => {
    if (mode === 'selectable') {
      onChange?.(selected);
    }
  }, [selected, onChange, mode]);

  return (
    <div>
      <div className="flex flex-wrap gap-[0.5rem]">
        {tags.map((tag, index) => {
          const isActive = selectedSet.has(tag);
          const baseClass =
            'box-border flex h-[2rem] items-center justify-center rounded-[0.5rem] border bg-[#34343a] pr-[0.5rem] pl-[0.75rem] text-sm font-medium text-gray-100';
          const activeClass = isActive
            ? 'border-[#9747FF] shadow-md'
            : 'border-transparent';
          const pointerClass = mode === 'selectable' ? 'cursor-pointer' : '';
          return (
            <button
              key={`${tag}-${index}`}
              onClick={() => toggleTag(tag)}
              className={clsx(baseClass, activeClass, pointerClass)}
            >
              {tag}
              {isActive ? <CheckIcon /> : <PlusIcon />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
