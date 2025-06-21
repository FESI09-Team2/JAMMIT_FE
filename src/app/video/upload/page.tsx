'use client';
import IcVideo from '@/assets/icons/ic_video.svg';
import Button from '@/components/commons/Button';
import Input from '@/components/commons/Input';
import Textarea from '@/components/commons/Textarea';
import { useVideoUploadMutation } from '@/hooks/queries/video/useVideoUpload';
import { useAuthStore } from '@/stores/useAuthStore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FormProvider, useForm } from 'react-hook-form';

export default function VideoUpload() {
  const router = useRouter();
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  // 드래그앤 드랍
  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'video/*': [] },
    // 파일은 하나만
    multiple: false,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      setVideoFile(file);
      const videoURL = URL.createObjectURL(file);
      generateThumbnail(videoURL);
    },
  });
  // 썸네일 추출
  const generateThumbnail = (videoURL: string) => {
    const video = document.createElement('video');
    video.src = videoURL;
    video.crossOrigin = 'anonymous';
    video.currentTime = 1;

    // 영상 업로드후 썸네일 캡쳐
    video.addEventListener('loadeddata', () => {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageUrl = canvas.toDataURL('image/jpeg');
        setThumbnail(imageUrl);
      }
    });
  };
  const methods = useForm({
    defaultValues: {
      title: '',
      description: '',
    },
    mode: 'onChange',
  });
  const { accessToken } = useAuthStore();
  const {
    handleSubmit,
    formState: { isValid },
  } = methods;
  const { mutate: submitUpload, isPending } =
    useVideoUploadMutation(setProgress);

  const onSubmit = (data: { title: string; description: string }) => {
    if (!videoFile || !accessToken) return;
    submitUpload(
      {
        title: data.title,
        description: data.description,
        videoFile,
        accessToken,
      },
      {
        onSuccess: () => {
          router.replace('/videos');
        },
      },
    );
    methods.reset();
    setVideoFile(null);
    setThumbnail(null);
  };
  return (
    <div className="pc:max-w-[84rem] pc:mt-6 pc:mb-36 tab:mb-11 mx-auto mb-6">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div
            className="relative h-[22rem] cursor-pointer overflow-hidden rounded-lg bg-[var(--bg-34343A)]"
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            {thumbnail ? (
              <img
                src={thumbnail}
                alt="썸네일 미리보기"
                className="absolute inset-0 mx-auto my-0 h-full w-auto"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center">
                <IcVideo />
                <p className="mt-7 text-center font-medium text-[var(--gray-500)]">
                  파일을 드래그 하거나
                  <br />
                  이곳을 눌러 선택하세요.
                </p>
              </div>
            )}
          </div>
          <div className="pc:mt-[2.5rem] flex justify-between gap-5">
            <div className="pc:px-10 pc:py-10 flex-[1] rounded-lg bg-[#202024]">
              <Input
                name="title"
                type="text"
                label="영상 제목"
                placeholder="영상 제목을 작성하세요."
                rules={{
                  required: '영상 제목을 입력하세요.',
                  maxLength: {
                    value: 50,
                    message: '영상 제목은 50자 이하로 입력해주세요.',
                  },
                }}
              />
              <p className="mt-10 mb-[0.5rem] text-sm font-semibold">내용</p>
              <Textarea
                name="description"
                placeholder="어떤 영상인가요?"
                rules={{
                  required: '영상 소개를 입력하세요.',
                  maxLength: {
                    value: 300,
                    message: '소개글은 300자 이내로 입력해주세요.',
                  },
                }}
              />
            </div>
            <Button
              variant="solid"
              className="pc:w-[22.75rem] w-full rounded-lg"
              type="submit"
              disabled={!isValid || !videoFile}
              aria-label="영상 저장 버튼"
            >
              {isPending ? `${progress}% 업로드 중...` : '작성완료'}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
