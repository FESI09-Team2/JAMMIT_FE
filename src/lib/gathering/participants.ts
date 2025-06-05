import { apiClient } from '@/utils/apiClient';
import { GatheringsResponse } from '@/types/gather';

export const getUserParticipantsGatherings =
  async (): Promise<GatheringsResponse> => {
    const result = await apiClient.get<GatheringsResponse>(
      '/gatherings/{gatheringId}/participants/my',
    );
    return result;
  };
