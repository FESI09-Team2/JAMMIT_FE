'use client';

import { format, setHours, setMinutes } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { TimePicker } from './TimePicker';
import { useState } from 'react';

const HOUR_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const MINUTE_OPTIONS = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
const AM_PM_OPTIONS = ['AM', 'PM'];

export function DatePicker() {
  const [date, setDate] = useState<Date>();
  const [hour, setHour] = useState(12);
  const [minute, setMinute] = useState(0);
  const [ampm, setAmPm] = useState<'AM' | 'PM'>('AM');

  const handleDateChange = (selectedDate?: Date) => {
    if (!selectedDate) return;
    const hour24 = ampm === 'PM' ? (hour % 12) + 12 : hour % 12;
    const newDate = setMinutes(setHours(selectedDate, hour24), minute);
    setDate(newDate);
  };

  const displayValue = date
    ? format(date, 'yyyy-MM-dd hh:mm a')
    : 'Pick a date and time';

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[280px] justify-start text-left font-normal',
            !date && 'text-muted-foreground',
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {displayValue}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex h-[290px] w-auto overflow-hidden border-[#505057] bg-[#34343a] p-[1.5rem] pr-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />

        <div className="flex justify-between gap-4">
          <TimePicker
            items={HOUR_OPTIONS}
            selected={hour}
            onSelect={(h) => {
              setHour(h);
              if (date) handleDateChange(date);
            }}
          />
          <TimePicker
            items={MINUTE_OPTIONS}
            selected={minute}
            onSelect={(m) => {
              setMinute(m);
              if (date) handleDateChange(date);
            }}
          />
          <TimePicker
            items={AM_PM_OPTIONS}
            selected={ampm}
            onSelect={(val) => {
              setAmPm(val as 'AM' | 'PM');
              if (date) handleDateChange(date);
            }}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
