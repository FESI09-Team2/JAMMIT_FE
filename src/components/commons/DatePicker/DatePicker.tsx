'use client';

import { format, setHours, setMinutes } from 'date-fns';

import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { TimePicker } from './TimePicker';
import { useEffect, useState } from 'react';

import CalendarIcon from '@/assets/icons/ic_calendar.svg';
import clsx from 'clsx';

const HOUR_OPTIONS = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const MINUTE_OPTIONS = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
const AM_PM_OPTIONS: ('AM' | 'PM')[] = ['PM', 'AM'];

interface DatePickerProps {
  value?: Date;
  onChange?: (val: Date) => void;
}

export function DatePicker({ value, onChange }: DatePickerProps) {
  const [date, setDate] = useState<Date | undefined>(value);
  const [hour, setHour] = useState(12);
  const [minute, setMinute] = useState(0);
  const [ampm, setAmPm] = useState<'PM' | 'AM'>('PM');
  const [isOpen, setIsOpen] = useState(false);

  const handleDateChange = (selectedDate?: Date) => {
    if (!selectedDate) return;
    const hour24 = ampm === 'PM' ? (hour % 12) + 12 : hour % 12;
    const newDate = setMinutes(setHours(selectedDate, hour24), minute);
    setDate(newDate);
    onChange?.(newDate);
  };

  useEffect(() => {
    if (!date) return;
    handleDateChange(date);
  }, [hour, minute, ampm]);

  useEffect(() => {
    if (value) {
      setDate(value);
      const h = value.getHours();
      setHour(h % 12 === 0 ? 12 : h % 12);
      setAmPm(h >= 12 ? 'PM' : 'AM');
      setMinute(value.getMinutes());
    }
  }, [value]);

  const displayValue = date
    ? format(date, 'yyyy-MM-dd hh:mm a')
    : '날짜와 시간을 선택해주세요';

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={clsx(
            'flex h-[44px] w-[209px] items-center justify-center gap-[10px] rounded-[8px] bg-[#34343a] px-[16px] text-[16px] text-gray-100',
            isOpen ? 'border border-[#505057]' : 'border-none',
            !date && 'cursor-pointer text-gray-500',
          )}
        >
          {displayValue}
          <CalendarIcon width="18px" height="20px" />
        </button>
      </PopoverTrigger>

      <PopoverContent
        sideOffset={4}
        align="start"
        className="box-shadow-lg flex h-[266px] w-auto overflow-hidden border-[1px] border-[#505057] bg-[#34343a] p-[1.5rem] pr-[2px]"
      >
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateChange}
          initialFocus
        />

        <div className="mx-[3px] h-full w-0 border-r-[1px] border-[#4a4e55]" />

        <div className="flex justify-between">
          <TimePicker items={HOUR_OPTIONS} selected={hour} onSelect={setHour} />
          <div className="mx-[3px] h-full w-0 border-r-[1px] border-[#4a4e55]" />
          <TimePicker
            items={MINUTE_OPTIONS}
            selected={minute}
            onSelect={setMinute}
          />
          <div className="mx-[3px] h-full w-0 border-r-[1px] border-[#4a4e55]" />
          <TimePicker
            items={AM_PM_OPTIONS}
            selected={ampm}
            onSelect={setAmPm}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
