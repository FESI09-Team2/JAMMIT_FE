'use client';

import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import ImageEdit from '@/components/products/jam/ImageEdit';
import GroupPageLayout from '@/components/commons/GroupPageLayout';
import Button from '@/components/commons/Button';
import JamFormSection from '@/components/products/jam/JamFormSection';
import { RegisterGatheringsRequest } from '@/types/gather';
import { useGatherRegister } from '@/hooks/queries/gather/useGatherRegister';
import { useGatherModify } from '@/hooks/queries/gather/useGatherModify';

interface JamPageProps {
  formType?: 'register' | 'edit';
  groupId?: number;
  initialData?: RegisterGatheringsRequest;
}

export default function JamPage({
  formType = 'register',
  groupId,
  initialData,
}: JamPageProps) {
  const router = useRouter();
  const methods = useForm<RegisterGatheringsRequest>({
    defaultValues: initialData ?? {
      name: '',
      thumbnail: '',
      place: '',
      description: '',
      gatheringDateTime: '',
      recruitDateTime: '',
      genres: [],
      gatheringSessions: [],
    },
    mode: 'onChange',
  });

  const {
    handleSubmit,
    control,
    watch,
    reset,
    setValue,
    formState: { isValid },
  } = methods;

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const { mutate: registerGathering } = useGatherRegister();
  const { mutate: modifyGathering } = useGatherModify();

  const onSubmit = (data: RegisterGatheringsRequest) => {
    if (formType === 'edit' && groupId) {
      modifyGathering({
        id: groupId,
        name: data.name,
        thumbnail: data.thumbnail,
        place: data.place,
        gatheringDateTime: data.gatheringDateTime,
        totalRecruitCount: data.gatheringSessions.reduce(
          (sum, session) => sum + session.recruitCount,
          0,
        ),
        recruitDeadline: data.recruitDateTime,
        genres: data.genres,
        description: data.description,
        gatheringSessions: data.gatheringSessions,
      });
      // 지워!!
      console.log('이건 수정했을때', data);
      router.push(`/group/${groupId}`);
    } else {
      registerGathering(data);
      // 지워!!
      console.log('이건 등록했을때', data);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <GroupPageLayout
          banner={<ImageEdit />}
          actionButtons={
            <Button
              variant="solid"
              className="mt-[2.5rem] w-[22.75rem]"
              type="submit"
              disabled={!isValid}
            >
              {formType === 'edit' ? '모임 수정하기' : '모임 만들기'}
            </Button>
          }
          isTab={false}
        >
          <JamFormSection
            control={control}
            watch={watch}
            setValue={setValue}
            initialData={initialData}
          />
        </GroupPageLayout>
      </form>
    </FormProvider>
  );
}
