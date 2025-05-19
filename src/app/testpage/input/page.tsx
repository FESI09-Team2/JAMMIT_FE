'use client';

import { useForm } from 'react-hook-form';
import Input from '@/components/commons/Input';

type FormValues = {
  email: string;
};

export default function Home() {
  const { register, handleSubmit } = useForm<FormValues>();

  // TODO: 제출로 변경 예정(data가 잘 나오는지 확인을 위해 사용)
  const onSubmit = (data: FormValues) => {
    alert(data.email);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* text */}
      <Input
        type="text"
        placeholder="텍스트를 입력하세요."
        register={register('email')}
      />
      {/* password */}
      {/*<Input />;*/}
      <button type="submit">제출</button>
    </form>
  );
}
