import { useMemo } from 'react';
import bannerImages from '@/constants/bannerImages';

export const useBannerImage = (fileName: string | null) => {
  const imageSrc = useMemo(() => {
    if (!fileName) return null;
    return bannerImages.find((img) => img.fileName === fileName)?.src || null;
  }, [fileName]);

  return imageSrc;
};
