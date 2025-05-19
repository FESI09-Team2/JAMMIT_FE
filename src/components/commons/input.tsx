'use client';

interface InputProps {
  type: 'text' | 'password'; // input의 타입을 지정
  placeholder: string; // input에 표시할 placeholder 텍스트
  value: string; // 현재 input에 들어 있는 값
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // 값이 바뀔 때 실행할 함수
  onBlur: () => void; // input이 포커스를 잃을 때 실행할 함수
  name: string; // input의 이름
  error?: string; // 에러 메시지를 보여주기 위한 optional props
}

export default function Input({
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  name,
  error,
}: InputProps) {
  const renderInput = () => {
    switch (type) {
      case 'text':
        return (
          <>
            <input
              type={type}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              name={name}
              className={`w-full rounded border px-3 py-2 ${
                error
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                  : 'focus:ring-0 focus:outline-none' // MEMO: 여기서 focus를 꺼도 포커스되면 자동으로 파란색상이 생김 문제 확인 필요
              }`}
            />
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
          </>
        );
      case 'password':
        return <div>패스워드</div>;
      default:
        return null;
    }
  };

  return <div>{renderInput()}</div>;
}
