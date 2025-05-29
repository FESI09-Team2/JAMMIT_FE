'use client';

import { useCallback, useState } from 'react';
import {
  Control,
  UseFormWatch,
  UseFormSetValue,
  Controller,
} from 'react-hook-form';
import Input from '@/components/commons/Input';
import TextArea from '@/components/commons/Textarea';
import Button from '@/components/commons/Button';
import Dropdown from '@/components/commons/Dropdown';
import TagSelector from '@/components/commons/TagSelector';
import SearchInput from './SearchInput';
import NumberInput from './NumberInput';
import { GENRE_TAGS, SESSION_TAGS, SESSION_KEY_MAP } from '@/constants/tags';
import ArrowDown from '@/assets/icons/ic_arrowdown.svg';
import { JamFormData } from '@/types/jam';

const DIVIDER = 'mx-auto my-[2.5rem] w-[56rem] border-gray-800';

interface JamFormSectionProps {
  control: Control<JamFormData>;
  watch: UseFormWatch<JamFormData>;
  setValue: UseFormSetValue<JamFormData>;
  isValid: boolean;
}

export default function JamFormSection({
  control,
  watch,
  setValue,
}: JamFormSectionProps) {
  const [sortOption, setSortOption] = useState(SESSION_TAGS[0]);
  const place = watch('place') || '';
  const session = watch('session') || {};

  // 장르 태그 선택 시
  const handleTagChange = useCallback(
    (selectedTags: string[]) => {
      setValue('genre', selectedTags);
    },
    [setValue],
  );

  // 모집 세션 수 입력 변경 시
  const handleNumberChange = (value: number) => {
    const sessionKey = SESSION_KEY_MAP[sortOption];
    setValue(
      `session.${sessionKey}` as `session.${keyof JamFormData['session']}`,
      value,
    );
  };

  return (
    <div className="flex h-[60.75rem] w-[61rem] flex-col bg-[#202024] p-[2.5rem]">
      <div className="flex flex-col gap-[1.5rem]">
        {/* 모임 제목 입력 */}
        <Input
          name="jamName"
          type="text"
          label="모임 제목"
          placeholder="모임 제목을 작성하세요."
          rules={{ required: '모임 제목을 입력하세요.' }}
        />

        {/* 장소 검색 입력 */}
        <SearchInput value={place} onChange={(val) => setValue('place', val)} />

        {/* 모집 마감일 / 모임 날짜 입력 */}
        <div className="flex gap-[1.25rem]">
          <div className="flex flex-col gap-[0.5rem]">
            <label htmlFor="end" className="font-semibold">
              모집 마감일
            </label>
            <input
              id="end"
              type="datetime-local"
              className="h-[2.75rem] w-[13.125rem] rounded-lg border-0 bg-[#34343A] px-[1rem] py-[0.625rem]"
            />
          </div>
          <div className="flex flex-col gap-[0.5rem]">
            <label htmlFor="day" className="font-semibold">
              모임 날짜
            </label>
            <input
              id="day"
              type="datetime-local"
              className="h-[2.75rem] w-[13.125rem] rounded-lg border-0 bg-[#34343A] px-[1rem] py-[0.625rem]"
            />
          </div>
        </div>
      </div>

      <hr className={DIVIDER} />

      {/* 모집 세션 드롭다운 및 인원 수 */}
      <div className="flex flex-col gap-[0.5rem]">
        <p className="text-lg font-semibold">모집 세션</p>
        <div className="flex justify-between">
          <div className="flex gap-[0.75rem]">
            <Dropdown
              onSelect={setSortOption}
              menuOptions={SESSION_TAGS}
              surfixIcon={<ArrowDown />}
              size="md"
              value={sortOption}
            />
            <NumberInput
              count={session[SESSION_KEY_MAP[sortOption]] || 0}
              onChange={handleNumberChange}
            />
          </div>
          <div className="flex gap-[0.75rem]">
            <Button variant="outline" size="small">
              추가
            </Button>
            <Button variant="outline" size="small">
              삭제
            </Button>
          </div>
        </div>
      </div>

      <hr className={DIVIDER} />

      {/* 장르 태그 선택 */}
      <div className="flex flex-col gap-[0.5rem]">
        <p className="text-lg font-semibold">모임 장르</p>
        <TagSelector
          mode="selectable"
          tags={GENRE_TAGS}
          onChange={handleTagChange}
        />
      </div>

      <hr className={DIVIDER} />

      {/* 소개글 작성 */}
      <div className="flex flex-col gap-[0.5rem]">
        <p className="text-lg font-semibold">소개글</p>
        <Controller
          name="introduction"
          control={control}
          render={({ field }) => (
            <TextArea
              placeholder="어떤 일이 일어날까요?"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </div>
    </div>
  );
}
