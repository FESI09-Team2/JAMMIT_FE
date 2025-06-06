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
import Button from '@/components/commons/Button';
import { DatePicker } from '@/components/commons/DatePicker/DatePicker';
import SearchInput from './SearchInput';
import SessionSelector from './SessionSelector';
import { GENRE_TAGS, SESSION_KEY_MAP } from '@/constants/tags';
import { JamFormData } from '@/types/jam';

const DIVIDER = 'mx-auto my-[2.5rem] w-[56rem] border-gray-800';

interface JamFormSectionProps {
  /** 폼 필드 제어 */
  control: Control<JamFormData>;
  /** 필드 값 관찰 */
  watch: UseFormWatch<JamFormData>;
  /** 필드 값을 외부에서 설정 */
  setValue: UseFormSetValue<JamFormData>;
}

export default function JamFormSection({
  control,
  watch,
  setValue,
}: JamFormSectionProps) {
  const [sessionList, setSessionList] = useState([
    { sortOption: '', count: 0 },
  ]);
  const place = watch('place') || '';
  // 빈 문자열 제외 이미 선택된 세션 옵션들을 계산
  const selectedSessions = sessionList
    .map((session) => session.sortOption)
    .filter((option) => option !== '');

  // 장소 선택
  const handlePlaceChange = useCallback(
    (val: string) => {
      setValue('place', val);
    },
    [setValue],
  );

  // 세션 추가
  const handleAddSession = useCallback(() => {
    setSessionList((prev) => [...prev, { sortOption: '', count: 0 }]);
  }, []);

  // 세션 삭제
  const handleDeleteSession = useCallback((index: number) => {
    setSessionList((prev) => prev.filter((_, i) => i !== index));
  }, []);

  // 세션 드롭다운 변경
  const handleSortOptionChange = useCallback(
    (index: number, newSortOption: string) => {
      setSessionList((prev) =>
        prev.map((sess, i) =>
          i === index ? { ...sess, sortOption: newSortOption } : sess,
        ),
      );
    },
    [],
  );

  // 모집 세션 수 입력 변경 시
  const handleCountChange = useCallback(
    (index: number, newCount: number) => {
      setSessionList((prev) => {
        const newList = prev.map((sess, i) =>
          i === index ? { ...sess, count: newCount } : sess,
        );
        const sessionKey = SESSION_KEY_MAP[newList[index].sortOption];
        setValue(`session.${sessionKey}`, newCount);
        return newList;
      });
    },
    [setValue],
  );

  // 장르 태그 선택 시
  const handleTagChange = useCallback(
    (selectedTags: string[]) => {
      setValue('genre', selectedTags);
    },
    [setValue],
  );

  return (
    <div className="mt-[2.5rem] flex h-auto w-[61rem] flex-col bg-[#202024] p-[2.5rem]">
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

        {/** TODO: 이 부분은 나중에 시간을 어떤 시간으로 받을지 정한 후 결정 */}
        {/** 모집 마감일 / 모임 날짜 */}
        <div className="flex gap-[1.25rem]">
          <div className="flex flex-col gap-[0.5rem]">
            <label htmlFor="end" className="font-semibold">
              모집 마감일
            </label>
            <Controller
              name="end"
              control={control}
              rules={{ required: '모집 마감일을 선택하세요.' }}
              render={({ field }) => (
                <DatePicker
                  value={field.value ? new Date(field.value) : undefined}
                  onChange={(date) => field.onChange(date?.toISOString() ?? '')}
                />
              )}
            />
          </div>
          <div className="flex flex-col gap-[0.5rem]">
            <label htmlFor="day" className="font-semibold">
              모임 날짜
            </label>
            <Controller
              name="day"
              control={control}
              rules={{ required: '모집 마감일을 선택하세요.' }}
              render={({ field }) => (
                <DatePicker
                  value={field.value ? new Date(field.value) : undefined}
                  onChange={(date) => field.onChange(date?.toISOString() ?? '')}
                />
              )}
            />
          </div>
        </div>
      </div>

      <hr className={DIVIDER} />

      {/** 모집 세션 */}
      <div className="flex flex-col gap-[0.5rem]">
        <p className="text-lg font-semibold">모집 세션</p>
        <div className="flex flex-row justify-between">
          <div className="flex flex-col gap-[0.75rem]">
            {sessionList.map(({ sortOption, count }, index) => (
              <SessionSelector
                key={index}
                session={{ [SESSION_KEY_MAP[sortOption]]: count }}
                sortOption={sortOption}
                setSortOption={(val) => handleSortOptionChange(index, val)}
                onChange={(val) => handleCountChange(index, val)}
                selectedOptions={selectedSessions}
              />
            ))}
          </div>
          <div className="flex gap-[0.75rem]">
            <Button variant="outline" size="small" onClick={handleAddSession}>
              추가
            </Button>

            <Button
              variant="outline"
              size="small"
              onClick={() => handleDeleteSession(sessionList.length - 1)}
              disabled={sessionList.length === 1}
            >
              삭제
            </Button>
          </div>
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
            rules={{ required: '소개글을 입력하세요.' }}
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
    </div>
  );
}
