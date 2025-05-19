'use client';

import { useForm, Controller } from 'react-hook-form';
import Input from '@/components/commons/Input';

type FormValues = {
  email: string;
  name: string;
};

export default function Home() {
  const { control, handleSubmit } = useForm<FormValues>({
    mode: 'onChange',
  });

  // TODO: 제출로 변경 예정(data가 잘 나오는지 확인을 위해 사용)
  const onSubmit = (data: FormValues) => {
    alert(`${data.email} / ${data.name}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* 이메일 */}
      <Controller
        name="email"
        control={control}
        defaultValue=""
        rules={{
          required: '이메일은 필수 입력입니다.',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: '잘못된 이메일 형식입니다.',
          },
        }}
        render={({ field, fieldState }) => (
          <Input
            type="text"
            placeholder="이메일을 입력하세요."
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            name={field.name}
            error={fieldState.error?.message}
          />
        )}
      />
      {/* 이름 */}
      <Controller
        name="name"
        control={control}
        defaultValue=""
        rules={{
          required: '이름은 필수 입력입니다.',
          minLength: {
            value: 2,
            message: '이름은 두 글자 이상이어야 합니다.',
          },
        }}
        render={({ field, fieldState }) => (
          <Input
            type="text"
            placeholder="이름을 입력하세요."
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            name={field.name}
            error={fieldState.error?.message}
          />
        )}
      />
      {/* password */}
      {/*<Input />;*/}
      {/* TODO: button 컴포넌트로 교체예정 */}
      <button type="submit">제출</button>
    </form>
  );
}
