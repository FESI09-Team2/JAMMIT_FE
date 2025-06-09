import {
  GatheringDetailResponse,
  ParticipantsResponse,
  ParticipateGatheringResponse,
} from '@/types/gathering';
import { BandSessionType } from '@/types/tags';
import { apiClient } from '@/utils/apiClient';

export const getGatheringDetail = async (
  id: number,
): Promise<GatheringDetailResponse> => {
  const result = await apiClient.get<GatheringDetailResponse>(
    `/gatherings/${id}`,
  );
  return result;
};

export const getGatheringParticipants = async (
  id: number,
): Promise<ParticipantsResponse> => {
  const result = await apiClient.get<ParticipantsResponse>(
    `/gatherings/${id}/participants`,
  );
  return result;
};

export const postParticipateGatherings = async (
  id: number,
  bandSession: BandSessionType,
  introduction: string,
): Promise<ParticipateGatheringResponse> => {
  const result = await apiClient.post<ParticipateGatheringResponse>(
    `/gatherings/${id}/participants`,
    { bandSession, introduction },
  );
  return result;
};
