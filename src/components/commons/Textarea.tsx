import React from 'react';
import clsx from 'clsx';

export interface TextAreaProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  error?: boolean;
  width?: string;
}

export default function TextArea({
  placeholder,
  value,
  onChange,
  className,
  error,
  width = 'w-full',
}: TextAreaProps) {
  return (
    <textarea
      className={clsx(
        'h-[11rem] w-[471px] resize-none rounded-xl border border-gray-300 px-4 py-2.5 text-base font-medium outline-none',
        error && 'border-errorBorder',
        width,
        className,
      )}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}
