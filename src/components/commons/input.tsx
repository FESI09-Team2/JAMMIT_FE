'use client';

import { UseFormRegisterReturn } from 'react-hook-form';

interface InputProps {
  type: 'text' | 'password';
  placeholder: string;
  register: UseFormRegisterReturn;
}

export default function Input({
  type,
  placeholder = '',
  register,
}: InputProps) {
  const renderInput = () => {
    switch (type) {
      case 'text':
        return (
          <input
            type="text"
            placeholder={placeholder}
            {...register}
            className="w-full rounded-md border px-3 py-2"
          />
        );
      case 'password':
        return <div>패스워드</div>;
      default:
        return null;
    }
  };

  return <div>{renderInput()}</div>;
}
