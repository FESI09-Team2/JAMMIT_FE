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
import TagSelector from '@/components/commons/TagSelector';
import SearchInput from './SearchInput';
import { GENRE_TAGS, SESSION_TAGS, SESSION_KEY_MAP } from '@/constants/tags';
import { JamFormData } from '@/types/jam';
import SessionSelector from './SeesionSelector';

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
  const [sessionList, setSessionList] = useState([
    { sortOption: SESSION_TAGS[0], count: 0 },
  ]);
  const place = watch('place') || '';

  // 장소 선택
  const handlePlaceChange = useCallback(
    (val: string) => {
      setValue('place', val);
    },
    [setValue],
  );

  // 세션 추가
  const handleAddSession = () => {
    setSessionList((prev) => [
      ...prev,
      { sortOption: SESSION_TAGS[0], count: 0 },
    ]);
  };

  // 세션 삭제
  const handleDeleteSession = (index: number) => {
    setSessionList((prev) => prev.filter((_, i) => i !== index));
  };

  // 세션 드롭다운 변경
  const handleSortOptionChange = (index: number, newSortOption: string) => {
    setSessionList((prev) =>
      prev.map((sess, i) =>
        i === index ? { ...sess, sortOption: newSortOption } : sess,
      ),
    );
  };

  // 모집 세션 수 입력 변경 시
  const handleCountChange = (index: number, newCount: number) => {
    setSessionList((prev) =>
      prev.map((sess, i) =>
        i === index ? { ...sess, count: newCount } : sess,
      ),
    );
    // react-hook-form에 업데이트
    const sessionKey = SESSION_KEY_MAP[sessionList[index].sortOption];
    setValue(`session.${sessionKey}`, newCount);
  };

  // 장르 태그 선택 시
  const handleTagChange = useCallback(
    (selectedTags: string[]) => {
      setValue('genre', selectedTags);
    },
    [setValue],
  );

  return (
    <div className="flex h-[60.75rem] w-[61rem] flex-col bg-[#202024] p-[2.5rem]">
      <div className="flex flex-col gap-[1.5rem]">
        {/** 모임 제목 */}
        <Input
          name="jamName"
          type="text"
          label="모임 제목"
          placeholder="모임 제목을 작성하세요."
          rules={{ required: '모임 제목을 입력하세요.' }}
        />

        {/** 모임 장소 */}
        <SearchInput value={place} onChange={handlePlaceChange} />

        {/** TODO: 컴포넌트화시키기 */}
        {/** 모집 마감일 / 모임 날짜 */}
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

      {/** 모집 세션 */}
      <div className="flex flex-col gap-[0.5rem]">
        <p className="text-lg font-semibold">모집 세션</p>
        {sessionList.map(({ sortOption, count }, index) => (
          <SessionSelector
            key={index}
            session={{ [SESSION_KEY_MAP[sortOption]]: count }}
            sortOption={sortOption}
            setSortOption={(val) => handleSortOptionChange(index, val)}
            onChange={(val) => handleCountChange(index, val)}
            disableDelete={sessionList.length === 1}
            onDelete={() => handleDeleteSession(index)}
            onAdd={handleAddSession}
          />
        ))}
      </div>

      <hr className={DIVIDER} />

      {/* 모임 장르 */}
      <div className="flex flex-col gap-[0.5rem]">
        <p className="text-lg font-semibold">모임 장르</p>
        <TagSelector
          mode="selectable"
          tags={GENRE_TAGS}
          onChange={handleTagChange}
        />
      </div>

      <hr className={DIVIDER} />

      {/* 소개글 */}
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
