'use client';

import DefaultProfileImage from '@/assets/icons/ic_default_profile.svg';
import Image from 'next/image';
import { useState } from 'react';

interface ProfileImageProps {
  src?: string | null;
  alt?: string;
  size?: number;
  className?: string;
}

export default function ProfileImage({
  src,
  alt = '프로필 이미지',
  size = 40,
  className,
}: ProfileImageProps) {
  const [hasError, setHasError] = useState(false);
  const commonStyle = `rounded-full object-cover ${className ?? ''}`;

  if (!src || hasError) {
    return (
      <DefaultProfileImage width={size} height={size} className={commonStyle} />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={commonStyle}
      onError={() => setHasError(true)}
    />
  );
}
