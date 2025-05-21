import React from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'solid' | 'outline';
  size?: 'large' | 'small';
  className?: string;
}

export default function Button({
  children,
  variant = 'solid',
  size = 'large',
  disabled = false,
  className,
  ...props
}: ButtonProps) {
  const baseClasses =
    'h-[2.75rem] rounded-[0.75rem] flex items-center justify-center text-[1rem] font-semibold cursor-pointer disabled:cursor-not-allowed';

  const variantClasses = {
    solid: disabled
      ? 'bg-gray-400  text-white'
      : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800  text-white',
    outline: disabled
      ? 'bg-white border border-solid border-gray-400 text-gray-400'
      : 'bg-white border border-solid border-blue-600 text-blue-600 hover:border-blue-500 hover:text-blue-500 active:border-blue-700 active:text-blue-700',
  };

  const sizeClasses = {
    large: 'w-[20.7rem]',
    small: 'w-[7.5rem]',
  };

  const buttonClasses = clsx(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  return (
    <button
      type="button"
      className={buttonClasses}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
