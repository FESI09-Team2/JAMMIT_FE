import { postParticipateGatherings } from '@/lib/gatherings/gatherings';
import { BandSessionType } from '@/types/tags';
import { useMutation } from '@tanstack/react-query';

interface ParticipateGatheringParams {
  id: number;
  bandSession: BandSessionType;
  introduction: string;
}

export const useParticipateGatheringMutation = () => {
  // const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      bandSession,
      introduction,
    }: ParticipateGatheringParams) =>
      postParticipateGatherings(id, bandSession, introduction),
    // onSuccess: (data) => {

    // },
    onError: (error) => {
      console.error('모임 참여 신청 실패:', error);
      alert('모임 참여 신청 중 문제가 발생했어요.');
    },
  });
};
