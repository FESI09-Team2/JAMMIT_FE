'use client'
import React from 'react'
import Image from 'next/image';
import { clsx } from 'clsx';

interface ImageProps {
    image:string;
    name:string;
    className?:string;
    variant?:'pc' | 'tablet' | 'mobile'
}

export default function CommonImage({ image, name, className='', variant='pc' }: ImageProps) {
  const imageClass = clsx(
    'object-cover',
    {
      // pc(기본)
      'w-[17.5rem] h-[9.75rem]': variant === 'pc',
      // mobile
      'w-full h-full': variant === 'mobile',
    },
    className,
  );
  return (
    <div className="w-[17.5rem] overflow-hidden rounded-3xl">
      <Image
        width={280}
        height={156}
        src={image}
        alt={name}
        className={imageClass}
      />
    </div>
  );
}
