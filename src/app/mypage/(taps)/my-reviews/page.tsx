'use client';
import React from 'react';
import CommonImage from '@/components/commons/CommonImage';
import { dateUtils, timeUtils } from '@/utils/DateUtils';
import { data } from '@/mock/review.mock';

export default function page() {
  return (
    <article>
      {data?.map((item, i: number) => (
        <div
          key={i}
          className="p mb-6 flex gap-4 border-b-2 border-dashed border-gray-300 pb-6"
        >
          <CommonImage image={item.image} name={item.name} />
          <div className="flex flex-col justify-between">
            <div>
              <strong className="mb-2 block text-lg font-semibold">
                {item.name} |{' '}
                <span className="text-sm font-medium">{item.location}</span>
              </strong>
              <span className="medium mr-2 inline-flex rounded-sm bg-gray-900 px-2 py-0.5 text-sm text-white">
                {dateUtils(item.date)}
              </span>
              <span className="medium inline-flex rounded-sm bg-gray-900 px-2 py-0.5 text-sm text-[var(--primary-600)]">
                {timeUtils(item.date)}
              </span>
            </div>
            <p>버튼</p>
          </div>
        </div>
      ))}
    </article>
  );
}
