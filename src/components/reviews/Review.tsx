'use client'
import React from 'react'

import { faker } from '@faker-js/faker'
import CommonImage from '../commons/CommonImage';

export default function Review() {
    const data = [
      {
        image: 'https://picsum.photos/250/250',
        name: faker.company.name(),
        location: faker.location.city(),
        date: faker.date.anytime().toTimeString(),
      },
      {
        image: 'https://picsum.photos/250/250',
        name: faker.company.name(),
        location: faker.location.city(),
        date: faker.date.anytime().getDate(),
      },
    ];
  return (
    <>
      {data.map((item, i: number) => (
        <div key={i} className="flex gap-4">
          <CommonImage image={item.image} name={item.name}/>
          <div className="flex flex-col justify-between">
            <div>
              <strong className="text-lg font-semibold w-full">
                {item.name} | <span className='font-medium text-sm'>{item.location}</span>
              </strong>
              <p>{item.date}</p>
            </div>
            <p>버튼</p>
          </div>
        </div>
      ))}
    </>
  );
}
