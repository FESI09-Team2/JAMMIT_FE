'use client';

import React, {
  ChangeEventHandler,
  memo,
  ReactNode,
  RefObject,
  useCallback,
} from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { RegisterOptions, useFormContext } from 'react-hook-form';

interface InputProps {
  /** RHF name속성 */
  name: string;
  /** input 타입인지 */
  type: string;
  /** register 를 호출할 때 지정하는 유효성 검사 규칙과 같은 포맷 */
  rules?: RegisterOptions;
  /** onFocus 이벤트 등록 */
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  /** onBlur 이벤트 등록 */
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  /** onChange 이벤트 등록 */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** input label 설정 */
  label?: string | ReactNode;
  placeholder?: string;
  defaultValue?: string | number;
  /** register에서 받은 ref */
  innerRef?: RefObject<HTMLInputElement | null>;
}

function Input({
  name,
  type,
  rules,
  onFocus,
  onBlur,
  onChange,
  label,
  placeholder,
  defaultValue,
  innerRef,
}: InputProps) {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();
  const IsError = errors[name];

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newValue = e.target.value;
    setValue(name, newValue);
    if (onChange) {
      onChange(e);
    }
  };

  const onInputFocus = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      if (onFocus) {
        onFocus(e);
      }
    },
    [onFocus],
  );

  const onInputBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      if (onBlur) {
        onBlur(e);
      }
    },
    [onBlur],
  );

  const { ref, ...rest } = register(name, {
    onChange: handleChange,
    onBlur: onInputBlur,
    ...rules,
    shouldUnregister: true,
  });

  return (
    <div>
      <label htmlFor={name} className="mb-2 block">
        {label}
      </label>
      <input
        type={type}
        onFocus={onInputFocus}
        placeholder={placeholder}
        defaultValue={defaultValue}
        ref={(el) => {
          ref(el);
          if (innerRef) {
            innerRef.current = el;
          }
        }}
        {...rest}
        className={`w-full rounded border px-3 py-2 ${
          IsError
            ? 'border-red-500 focus-within:border-red-500 focus-within:ring-red-500'
            : 'focus-within:ring-0 focus-within:outline-none'
        }`}
      />
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <p className="mt-1 text-sm text-red-500">{message}</p>
        )}
      />
    </div>
  );
}

export default memo(Input);
