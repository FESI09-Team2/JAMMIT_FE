import { apiClient } from '@/utils/apiClient';
import { GatheringsResponse } from '@/types/gather';

export const getUserCreatedGatherings =
  async (): Promise<GatheringsResponse> => {
    const result = await apiClient.get<GatheringsResponse>(
      '/gatherings/my/created',
    );
    return result;
  };
