import React from 'react';
import clsx from 'clsx';

interface TimePickerProps<T extends string | number> {
  items: T[];
  selected: T;
  onSelect: (val: T) => void;
}

export function TimePicker<T extends string | number>({
  items,
  selected,
  onSelect,
}: TimePickerProps<T>) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex w-[4.75rem] flex-col items-center gap-[0.625rem] overflow-y-auto">
        {items.map((item) => (
          <button
            key={item}
            className={clsx(
              'h-[2.0625rem] w-[2.625rem] shrink-0 rounded-[0.5rem] text-center text-[0.875rem]',
              selected === item && 'bg-[#9900FF]',
            )}
            onClick={() => onSelect(item)}
          >
            {String(item).padStart(2, '0')}
          </button>
        ))}
      </div>
    </div>
  );
}
