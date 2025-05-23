import React from 'react';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import ModalWrapper from './ModalWrapper';
import Input from './Input';
import TextArea from './Textarea';
import Button from './Button';

interface ModalZamProps {
  /** "확인" 버튼 클릭 시 실행할 콜백 */
  onSubmit: (data: ZamFormData) => void;
  /** "x"버튼 클릭 시 실행할 콜백 */
  onCancel: () => void;
}

export interface ZamFormData {
  zamName: string;
  place: string;
  day: string;
  image: File;
  people: {
    electricGuitar: number;
    acousticGuitar: number;
    bass: number;
    drum: number;
    vocal: number;
    keyboard: number;
    percussion: number;
    string: number;
  };
  end: string;
  tag: string[];
  introduction: string;
}

export default function ModalZam({ onCancel, onSubmit }: ModalZamProps) {
  const methods = useForm<ZamFormData>({
    defaultValues: {
      zamName: '',
      place: '',
      day: '',
      end: '',
      tag: [],
      introduction: '',
    },
  });

  const { handleSubmit, control, register } = methods;

  return (
    <ModalWrapper
      title="잼만들기"
      onClose={onCancel}
      className="relative mx-auto max-h-[80vh] w-full max-w-md overflow-y-auto rounded-lg bg-white p-4 text-black shadow-lg"
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/** TODO: 순서 임의 작업 디자인 나오면 변경 예정*/}
          {/** zam이름 */}
          <Input
            name="zamName"
            type="text"
            label="잼 이름"
            placeholder="잼 이름을 작성해주세요."
          />

          {/** 장소 */}
          <Input
            name="place"
            type="text"
            label="장소"
            placeholder="장소를 작성해주세요."
          />

          {/** 필요한 인원 */}
          <div className="flex flex-wrap gap-3">
            <div className="w-20">
              <Input
                name="people.electricGuitar"
                type="text"
                label="일렉기타"
                placeholder="인원"
                rules={{
                  required: '필수 입력 값',
                  min: {
                    value: 0,
                    message: '0 이상의 숫자만 입력 가능합니다.',
                  },
                  pattern: {
                    value: /^[0-9]+$/,
                    message: '숫자만 입력 가능합니다.',
                  },
                }}
              />
            </div>
            <div className="w-20">
              <Input
                name="people.acousticGuitar"
                type="text"
                label="통기타"
                placeholder="인원"
                rules={{
                  required: '필수 입력 값',
                  min: {
                    value: 0,
                    message: '0 이상의 숫자만 입력 가능합니다.',
                  },
                  pattern: {
                    value: /^[0-9]+$/,
                    message: '숫자만 입력 가능합니다.',
                  },
                }}
              />
            </div>
            <div className="w-20">
              <Input
                name="people.bass"
                type="text"
                label="베이스"
                placeholder="인원"
                rules={{
                  required: '필수 입력 값',
                  min: {
                    value: 0,
                    message: '0 이상의 숫자만 입력 가능합니다.',
                  },
                  pattern: {
                    value: /^[0-9]+$/,
                    message: '숫자만 입력 가능합니다.',
                  },
                }}
              />
            </div>
            <div className="w-20">
              <Input
                name="people.drum"
                type="text"
                label="드럼"
                placeholder="인원"
                rules={{
                  required: '필수 입력 값',
                  min: {
                    value: 0,
                    message: '0 이상의 숫자만 입력 가능합니다.',
                  },
                  pattern: {
                    value: /^[0-9]+$/,
                    message: '숫자만 입력 가능합니다.',
                  },
                }}
              />
            </div>
            <div className="w-20">
              <Input
                name="people.vocal"
                type="text"
                label="보컬"
                placeholder="인원"
                rules={{
                  required: '필수 입력 값',
                  min: {
                    value: 0,
                    message: '0 이상의 숫자만 입력 가능합니다.',
                  },
                  pattern: {
                    value: /^[0-9]+$/,
                    message: '숫자만 입력 가능합니다.',
                  },
                }}
              />
            </div>
            <div className="w-20">
              <Input
                name="people.keyboard"
                type="text"
                label="건반"
                placeholder="인원"
                rules={{
                  required: '필수 입력 값',
                  min: {
                    value: 0,
                    message: '0 이상의 숫자만 입력 가능합니다.',
                  },
                  pattern: {
                    value: /^[0-9]+$/,
                    message: '숫자만 입력 가능합니다.',
                  },
                }}
              />
            </div>
            <div className="w-20">
              <Input
                name="people.percussion"
                type="text"
                label="타악기"
                placeholder="인원"
                rules={{
                  required: '필수 입력 값',
                  min: {
                    value: 0,
                    message: '0 이상의 숫자만 입력 가능합니다.',
                  },
                  pattern: {
                    value: /^[0-9]+$/,
                    message: '숫자만 입력 가능합니다.',
                  },
                }}
              />
            </div>
            <div className="w-20">
              <Input
                name="people.string"
                type="text"
                label="현악기"
                placeholder="인원"
                rules={{
                  required: '필수 입력 값',
                  min: {
                    value: 0,
                    message: '0 이상의 숫자만 입력 가능합니다.',
                  },
                  pattern: {
                    value: /^[0-9]+$/,
                    message: '숫자만 입력 가능합니다.',
                  },
                }}
              />
            </div>
          </div>

          {/** 간단 소개 */}
          <div className="flex flex-col gap-2">
            <p className="text-lg font-semibold">세션 소개</p>
            <Controller
              name="introduction"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextArea
                  placeholder="세션에 대한 간단한 소개 남겨주세요."
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>

          {/** 모임 날짜 */}
          <div className="flex flex-col gap-2">
            <label htmlFor="day" className="font-semibold">
              모임 날짜
            </label>
            <input
              id="day"
              type="date"
              {...register('day')}
              className="rounded border p-2"
            />
          </div>

          {/** 모집 마감 날짜 */}
          <div className="flex flex-col gap-2">
            <label htmlFor="end" className="font-semibold">
              모집 마감 날짜
            </label>
            <input
              id="end"
              type="date"
              {...register('end')}
              className="rounded border p-2"
            />
          </div>

          {/** 모임 이미지 업로드 */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold">모임 이미지</label>
            <input type="file" {...register('image')} />
          </div>

          <Button variant="solid" size="large" type="submit">
            확인
          </Button>
        </form>
      </FormProvider>
    </ModalWrapper>
  );
}
