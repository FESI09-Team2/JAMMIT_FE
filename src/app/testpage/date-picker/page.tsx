'use client';
import { DatePicker } from '@/components/commons/DatePicker';
import { Calendar } from '@/components/ui/calendar';
import React, { useState } from 'react';

export default function DatePickerTestPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
      <DatePicker />
    </div>
  );
}
