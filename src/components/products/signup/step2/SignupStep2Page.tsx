'use client';

import AuthCard from '@/components/commons/AuthCard';
import Button from '@/components/commons/Button';
import Input from '@/components/commons/Input';
import TagSelector from '@/components/commons/TagSelector';
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';

const SESSION_TAGS = [
  '보컬',
  '일렉 기타',
  '통기타',
  '베이스',
  '건반',
  '드럼',
  '타악기',
  '현악기',
];

const GENRE_TAGS = [
  '락',
  '메탈',
  '팝',
  '발라드',
  'R&B',
  '인디',
  '얼터너티브',
  '재즈',
  '펑크',
  '어쿠스틱',
  '포크',
];

interface FormValues {
  nickname: string;
  session: string[];
  genre: string[];
}

export default function SignupStep2Page() {
  const methods = useForm<FormValues>({
    mode: 'all',
    defaultValues: { nickname: '', session: [], genre: [] },
    shouldUnregister: false,
  });

  const {
    formState: { isValid },
    reset,
    control,
  } = methods;

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    alert('회원가입' + JSON.stringify(data));
    reset();
  };

  return (
    <AuthCard title="프로필 만들기">
      <div className="flex w-[25.125rem] flex-col items-center">
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            noValidate
            className="flex w-full flex-col gap-[1.5rem]"
          >
            <Input
              name="nickname"
              type="text"
              label="닉네임"
              placeholder="닉네임을 입력해주세요."
              rules={{
                required: '닉네임은 필수 입력입니다.',
              }}
            />

            <div>
              <label className="mb-[0.5rem] block text-sm font-semibold text-gray-50">
                담당 세션
              </label>
              <Controller
                name="session"
                control={control}
                render={({ field }) => (
                  <TagSelector
                    tags={SESSION_TAGS}
                    mode="selectable"
                    initialSelected={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>

            <div>
              <label className="mb-[0.5rem] block text-sm font-semibold text-gray-50">
                선호 장르
              </label>
              <Controller
                name="genre"
                control={control}
                render={({ field }) => (
                  <TagSelector
                    tags={GENRE_TAGS}
                    mode="selectable"
                    initialSelected={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>

            <Button
              variant="solid"
              size="large"
              className="w-full"
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
