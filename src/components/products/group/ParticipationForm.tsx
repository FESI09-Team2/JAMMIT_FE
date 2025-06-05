'use client';

import { Controller, useForm } from 'react-hook-form';
import Button from '@/components/commons/Button';
import TextArea from '@/components/commons/Textarea';
import TagSelector from '@/components/commons/TagSelector';
import { SESSION_TAGS } from '@/constants/tags';

interface ParticipationFormData {
  session: string[];
  introduction: string;
}

export default function ParticipationForm() {
  const {
    handleSubmit,
    control,
    formState: { isValid },
    setValue,
  } = useForm<ParticipationFormData>({
    mode: 'onChange',
    defaultValues: {
      session: [],
      introduction: '',
    },
  });

  const handleSessionChange = (selected: string[]) => {
    setValue('session', selected);
  };

  const onSubmit = (data: ParticipationFormData) => {
    // TODO: 신청 API
    console.log('신청 데이터:', data);
  };

  return (
    <div className="w-[362px]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-[20px]"
      >
        <div className="flex flex-col gap-[20px] rounded-[8px] bg-[#212226] p-[28px]">
          <h2 className="w-full text-center text-[16px] font-semibold text-white">
            함께하기
          </h2>

          <div>
            <p className="mb-[8px] text-[16px] font-semibold">신청 세션</p>
            <TagSelector
              mode="selectable"
              tags={SESSION_TAGS}
              onChange={handleSessionChange}
              disabledTags={['보컬', '통기타']}
            />
          </div>

          <div>
            <p className="mb-[8px] text-[16px] font-semibold">간단 소개</p>
            <Controller
              name="introduction"
              control={control}
              rules={{ required: '소개를 입력해주세요.' }}
              render={({ field }) => (
                <TextArea
                  placeholder="어떤 연주를 하고 싶나요?"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
        </div>

        <Button
          type="submit"
          variant="solid"
          disabled={!isValid}
          className="w-[364px]"
        >
          신청 완료
        </Button>
      </form>
    </div>
  );
}
