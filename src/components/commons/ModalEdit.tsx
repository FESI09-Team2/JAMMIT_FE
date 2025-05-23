import React from 'react';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import ModalWrapper from './ModalWrapper';
import ProfileImageUpload from './ProfileImageUpload';
import TextArea from './Textarea';
import Button from './Button';

interface ModalEditProps {
  onSubmit: (data: EditFormData) => void;
  onCancel: () => void;
}

export interface EditFormData {
  image: File;
  session: string[];
  genre: string[];
  introduction: string;
}

export default function ModalZam({ onCancel, onSubmit }: ModalEditProps) {
  const methods = useForm<EditFormData>({
    defaultValues: {},
  });

  const { handleSubmit, control, setValue, watch } = methods;

  const imageFile = watch('image');

  const handleFileChange = (file: File) => {
    setValue('image', file);
  };

  return (
    <ModalWrapper
      title="프로필 수정하기"
      onClose={onCancel}
      className="relative mx-auto max-h-[80vh] w-full max-w-md overflow-y-auto rounded-lg bg-white p-4 text-black shadow-lg"
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ProfileImageUpload
            imageFile={imageFile}
            onFileChange={handleFileChange}
          />

          <p className="pt-2 text-lg font-semibold">선호장르</p>
          <p className="pt-2 text-lg font-semibold">세션</p>

          <div className="flex flex-col gap-2 pt-2 pb-2">
            <p className="text-lg font-semibold">자기소개(선택)</p>
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

          <Button variant="solid" size="large" type="submit">
            확인
          </Button>
        </form>
      </FormProvider>
    </ModalWrapper>
  );
}
