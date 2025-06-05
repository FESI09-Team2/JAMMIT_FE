import React, { useCallback } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import ModalWrapper from './ModalWrapper';
import ProfileImageUpload from '../ProfileImageUpload';
import Input from '../Input';
import Button from '../Button';
import { EditFormData } from '@/types/modal';
import TagSection from '../TagSection';
import { BandSession, Genre } from '@/types/tags';

const BAND_SESSION_TAGS = Object.values(BandSession);
const GENRE_TAGS = Object.values(Genre);

interface ModalEditProps {
  /** "확인" 버튼 클릭 시 실행할 콜백 */
  onSubmit: (data: EditFormData) => void;
  /** "x"버튼 클릭 시 실행할 콜백 */
  onCancel: () => void;
  /** 기존 프로필 정보를 가져오기 위한 초기값 */
  initialData: EditFormData;
}

export default function ModalEdit({
  onCancel,
  onSubmit,
  initialData,
}: ModalEditProps) {
  const methods = useForm<EditFormData>({
    defaultValues: {
      email: initialData.email,
      username: initialData.username,
      password: initialData.password,
      image: initialData.image,
      preferredBandSessions: initialData.preferredBandSessions,
      preferredGenres: initialData.preferredGenres,
    },
    mode: 'onChange',
  });
  const { handleSubmit, setValue, watch } = methods;
  const imageFile = watch('image');
  const password = watch('password');

  // TODO: PROFILEI_MAGE PUT API 연동 필요
  const handleFileChange = (file: File) => {
    setValue('image', file);
  };

  const handleSesionTagChange = useCallback(
    (selected: string[]) => {
      setValue('preferredBandSessions', selected as BandSession[]);
    },
    [setValue],
  );

  const handleGenreTagChange = useCallback(
    (selected: string[]) => {
      setValue('preferredGenres', selected as Genre[]);
    },
    [setValue],
  );

  const tagSections = [
    {
      key: 'session',
      label: '세션',
      tags: BAND_SESSION_TAGS,
      initialSelected: initialData.preferredBandSessions,
      onChange: handleSesionTagChange,
    },
    {
      key: 'genre',
      label: '세션',
      tags: GENRE_TAGS,
      initialSelected: initialData.preferredGenres,
      onChange: handleGenreTagChange,
    },
  ];

  return (
    <ModalWrapper
      title="프로필 수정하기"
      onClose={onCancel}
      className="relative h-auto w-[32.5rem] max-w-md overflow-y-auto rounded-lg bg-[#242429] p-[1.5rem]"
    >
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-[1.5rem]"
        >
          <ProfileImageUpload
            imageFile={imageFile}
            onFileChange={handleFileChange}
          />

          <div className="flex flex-col gap-[1.5rem]">
            <Input name="username" type="text" label="이름" />
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
          </div>

          <div className="flex flex-col gap-[1.5rem]">
            {tagSections.map(
              ({ key, label, tags, initialSelected, onChange }) => (
                <TagSection
                  key={key}
                  label={label}
                  tags={tags}
                  initialSelected={initialSelected}
                  onChange={onChange}
                />
              ),
            )}
          </div>

          <Button variant="solid" size="large" type="submit">
            확인
          </Button>
        </form>
      </FormProvider>
    </ModalWrapper>
  );
}
