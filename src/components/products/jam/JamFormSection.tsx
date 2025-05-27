'use client';

import Input from '@/components/commons/Input';
import TextArea from '@/components/commons/Textarea';
import { Controller } from 'react-hook-form';
import { useEffect } from 'react';
import {
  Control,
  UseFormRegister,
  UseFormWatch,
  UseFormSetValue,
} from 'react-hook-form';
import { JamFormData } from '@/types/modal';

interface JamFormSectionProps {
  control: Control<JamFormData>;
  register: UseFormRegister<JamFormData>;
  watch: UseFormWatch<JamFormData>;
  setValue: UseFormSetValue<JamFormData>;
  isValid: boolean;
}

export default function JamFormSection({
  control,
  register,
  watch,
  setValue,
}: JamFormSectionProps) {
  const endDate = watch('end');
  const dayDate = watch('day');

  useEffect(() => {
    if (endDate && dayDate && dayDate < endDate) {
      setValue('day', '');
    }
  }, [endDate, dayDate, setValue]);

  return (
    <div className="flex h-[57.5rem] w-[61rem] flex-col bg-[rgba(32,32,36,1)] p-[2.5rem]">
      <div className="flex flex-col gap-[1.5rem]">
        <Input
          name="jamName"
          type="text"
          label="모임 제목"
          placeholder="모임 제목을 작성하세요."
          rules={{ required: '모임 제목을 입력하세요.' }}
        />

        <Input
          name="place"
          type="text"
          label="장소"
          placeholder="장소를 작성해주세요."
          rules={{
            required: '장소를 입력해주세요.',
            pattern: {
              value: /^[가-힣\s]+$/,
              message: '한글만 입력 가능합니다.',
            },
          }}
        />

        {/** TODO: input과 캘린더 커스텀해야됨 */}
        <div className="flex gap-[1.25rem]">
          <div className="flex flex-col gap-[0.5rem]">
            <label htmlFor="day" className="font-semibold">
              모임 날짜
            </label>
            <input
              id="day"
              type="date"
              min={endDate || undefined}
              {...register('day', {
                validate: (value) => {
                  if (!endDate || !value) return true;
                  return (
                    value >= endDate ||
                    '모임 날짜는 모집 마감 날짜 이후여야 합니다.'
                  );
                },
              })}
              className="h-[2.75rem] w-[13.125rem] rounded border px-[1rem] py-[0.625rem]"
            />
          </div>
          <div className="flex flex-1 flex-col gap-[0.5rem]">
            <label htmlFor="end" className="font-semibold">
              모집 마감일
            </label>
            <input
              id="end"
              type="date"
              {...register('end')}
              className="h-[2.75rem] w-[13.125rem] rounded border px-[1rem] py-[0.625rem]"
            />
          </div>
        </div>
      </div>
      <hr className="mx-auto my-[2.5rem] w-[56rem] bg-gray-800" />

      <div className="flex flex-col gap-[0.5rem]">
        <p className="text-lg font-semibold">모집 세션</p>
        <div>
          {/** 드롭다운자리 */}
          {/** 인원 input자리 */}
          {/** 버튼 자리 */}
        </div>
      </div>
      <hr className="mx-auto my-[2.5rem] w-[56rem] bg-gray-800" />

      <div className="flex flex-col gap-[0.5rem]">
        <p className="text-lg font-semibold">모임 장르</p>
      </div>
      <hr className="mx-auto my-[2.5rem] w-[56rem] bg-gray-800" />

      <div className="flex flex-col gap-[0.5rem]">
        <p className="text-lg font-semibold">세션 소개</p>
        <Controller
          name="introduction"
          control={control}
          render={({ field }) => (
            <TextArea
              placeholder="세션에 대한 간단한 소개 남겨주세요."
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </div>
    </div>
  );
}
