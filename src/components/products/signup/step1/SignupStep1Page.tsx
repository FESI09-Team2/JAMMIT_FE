'use client';

import AuthCard from '@/components/commons/AuthCard';
import Button from '@/components/commons/Button';
import Input from '@/components/commons/Input';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

interface FormValues {
  email: string;
  name: string;
  password: string;
}

export default function SignUpStep1Page() {
  const methods = useForm<FormValues>({
    mode: 'all',
    defaultValues: { email: '', name: '', password: '' },
    shouldUnregister: false,
  });
  const {
    formState: { isValid },
    watch,
    reset,
  } = methods;

  const password = watch('password');

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    alert('회원가입' + JSON.stringify(data));
    reset();
  };

  return (
    <AuthCard title="회원가입" linkTo="login">
      <div className="flex w-[25.125rem] flex-col items-center">
        <FormProvider {...methods}>
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
              name="name"
              type="text"
              label="이름"
              placeholder="이름을 입력해주세요."
              rules={{
                required: '이름은 필수 입력입니다.',
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
            <Input
              name="passwordConfirm"
              type="password"
              label="비밀번호 확인"
              placeholder="비밀번호를 다시 한 번 입력해주세요."
              rules={{
                required: '비밀번호 확인은 필수 입력입니다.',
                validate: (value) =>
                  value === password || '비밀번호가 일치하지 않습니다.',
              }}
            />
            <Button
              variant="solid"
              size="large"
              className="mt-[2.5rem] w-full"
              type="submit"
              disabled={!isValid}
            >
              다음
            </Button>
          </form>
        </FormProvider>
      </div>
    </AuthCard>
  );
}
