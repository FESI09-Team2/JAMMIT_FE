'use client';

import * as React from 'react';
import { DayPicker } from 'react-day-picker';
import ArrowRight from '@/assets/icons/ic_arrow_right.svg';
import ArrowLeft from '@/assets/icons/ic_arrow_left.svg';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

import { enUS } from 'date-fns/locale';

const customKo = {
  ...enUS,
  localize: {
    ...enUS.localize,
    day: (n: number) => ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][n],
  },
};

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      locale={customKo}
      showOutsideDays={showOutsideDays}
      className={cn('w-[250px] rounded-[0.5rem] text-gray-100', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row',
        month: 'flex flex-col',
        caption: 'flex justify-center relative items-center w-full py-[5px]',
        caption_label: 'text-sm font-medium',
        nav: 'flex items-center',
        nav_button: cn(
          'size-7 bg-transparent p-0 opacity-50 hover:opacity-100 cursor-pointer',
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-x-1',
        head_row: 'flex ',
        head_cell:
          'h-[32px] w-full font-bold text-[14px] text-center flex items-center justify-center',
        row: 'flex h-[32px] ',
        cell: cn(
          'relative w-full rounded-[8px] text-center text-[14px] focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-[#9900FF] [&:has([aria-selected].day-range-end)]:rounded-[8px] cursor-pointer',
        ),
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'size-8 p-0 font-semibold aria-selected:opacity-100',
        ),
        day_selected:
          'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
        day_today: 'text-[#9900ff]',
        day_outside: 'day-outside text-gray-500',
        day_disabled: 'text-muted-foreground opacity-50',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: () => <ArrowLeft />,
        IconRight: () => <ArrowRight />,
      }}
      {...props}
    />
  );
}

export { Calendar };
