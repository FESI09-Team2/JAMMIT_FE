'use client';
import { faker } from '@faker-js/faker';

export const data = [
  {
    image: 'https://picsum.photos/250/250',
    name: faker.company.name(),
    location: faker.location.city(),
    date: faker.date.anytime().toISOString(),
  },
  {
    image: 'https://picsum.photos/250/250',
    name: faker.company.name(),
    location: faker.location.city(),
    date: faker.date.anytime().toISOString(),
  },
];