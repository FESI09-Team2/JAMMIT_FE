'use client';

import Button from '@/components/commons/Button';
import Input from '@/components/commons/Input';
import Link from 'next/link';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

interface FormValues {
  email: string;
  password: string;
}

export default function LoginPage() {
  const methods = useForm<FormValues>({
    mode: 'all',
    defaultValues: { email: '', password: '' },
    shouldUnregister: false,
  });
  const {
    formState: { isValid },
    reset,
  } = methods;

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    alert('로그인' + JSON.stringify(data));
    reset();
  };

  return (
    <div className="mt-[12rem] flex items-center justify-center">
      <div className="flex h-[30.125rem] w-[31.875rem] items-center justify-center rounded-[1.5rem] bg-[#242429]">
        <div className="flex w-[25.125rem] flex-col items-center">
          <FormProvider {...methods}>
            <h1 className="mb-[2rem] text-[1.5rem] font-semibold text-gray-100">
              로그인
            </h1>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              noValidate
              className="w-full"
            >
              <Input
                name="email"
                type="text"
                label="아이디"
                placeholder="이메일을 입력해주세요."
                rules={{
                  required: '이메일은 필수 입력입니다.',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: '올바른 이메일 형식을 입력해주세요.',
                  },
                }}
              />
              <Input
                name="password"
                type="password"
                label="비밀번호"
                placeholder="비밀번호를 입력해주세요."
                rules={{
                  required: '비밀번호는 필수 입력입니다.',
                  minLength: {
                    value: 8,
                    message: '비밀번호는 최소 8자 이상이어야 합니다.',
                  },
                }}
              />
              <Button
                variant="solid"
                size="large"
                className="mt-[2.5rem] w-full"
                type="submit"
                disabled={!isValid}
              >
                로그인
              </Button>
            </form>
          </FormProvider>
          <div className="mt-[2.5rem] flex justify-center">
            <p className="mr-1 text-[0.938rem] font-medium text-gray-400">
              JAMMIT이 처음이신가요?
            </p>
            <Link
              href="/signup/step1"
              className="text-[0.938rem] font-medium text-[#BF52FF] underline underline-offset-2"
            >
              회원가입
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
