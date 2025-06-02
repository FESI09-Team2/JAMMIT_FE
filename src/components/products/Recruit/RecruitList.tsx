'use client';
import React from 'react';
import { ImgCard01, ImgCard02, ImgCard03, ImgCard04 } from '@/assets/images';
import { RecruitCardData } from '@/types/card.types';
import Link from 'next/link';
import { RecruitCard } from '.';

export default function RecruitList() {
  const mockRecruits = [
    {
      id: '1',
      name: '그린데이 좋아하시는 분 계세요?',
      author: '잼잼러',
      genres: ['얼터너티브', '락', '포크', '어쿠스틱', '하드락', '모던락'],
      thumbnail: ImgCard01,
      totalRecruit: 5,
      totalCurrent: 3,
      recruitDeadline: '2024-06-01T23:59:59.000Z',
      liked: false,
      member: [
        { name: '드럼', Personnel: 1, total: 1 },
        { name: '보컬', Personnel: 1, total: 1 },
        { name: '기타', Personnel: 1, total: 2 },
      ],
    },
    {
      id: '2',
      name: '재즈 밴드 드러머 구해요!',
      author: '몽글몽글',
      genres: ['재즈', '드럼'],
      thumbnail: ImgCard02,
      totalRecruit: 4,
      totalCurrent: 2,
      recruitDeadline: '2024-06-01T23:59:59.000Z',
      liked: true,
      member: [
        { name: '드럼', Personnel: 1, total: 1 },
        { name: '보컬', Personnel: 1, total: 1 },
        { name: '기타', Personnel: 1, total: 2 },
      ],
    },
    {
      id: '3',
      name: '여성 보컬 모집합니다 🎤',
      author: '하이텐션',
      genres: ['팝', '보컬'],
      thumbnail: ImgCard03,
      totalRecruit: 3,
      totalCurrent: 1,
      recruitDeadline: '2024-06-01T23:59:59.000Z',
      liked: false,
      member: [
        { name: '드럼', Personnel: 1, total: 1 },
        { name: '보컬', Personnel: 1, total: 1 },
        { name: '기타', Personnel: 1, total: 2 },
      ],
    },
    {
      id: '4',
      name: '홍대에서 매주 합주하실 분!',
      author: '루프탑',
      genres: ['인디', '홍대'],
      thumbnail: ImgCard04,
      totalRecruit: 5,
      totalCurrent: 4,
      recruitDeadline: '2024-06-01T23:59:59.000Z',
      liked: true,
      member: [
        { name: '드럼', Personnel: 1, total: 1 },
        { name: '보컬', Personnel: 1, total: 1 },
        { name: '기타', Personnel: 1, total: 2 },
      ],
    },
  ];

  return (
    <div className="pc:max-w-[62.5rem] mx-auto mt-8">
      <div className="relative mb-[65px] h-[240px] overflow-hidden rounded-lg bg-[#2B2B30]">
        <div className="absolute top-[77px] left-[62px]">
          <span className="text-sm">함께 연주할 사함이 없나요?</span>
          <p className="mt-2 text-2xl font-semibold text-[#D5E9FF]">
            지금 모임에 참여해보세요
          </p>
        </div>
      </div>
      <div className="mt-[65px] mb-[29px] flex gap-2">ㅇ</div>
      <div className="pc:grid-cols-3 grid grid-cols-1 gap-x-5 gap-y-10">
        {mockRecruits.map((item: RecruitCardData) => (
          <Link key={item.id} href={`de/${item.id}`}>
            <RecruitCard.Thumbnail
              thumbnail={item.thumbnail}
              liked={item.liked}
              alt={item.name}
            />
            <RecruitCard.TagList tags={item.genres} />
            <RecruitCard.TitleBlock title={item.name} author={item.author} />
            <RecruitCard.Footer
              status="합주확정"
              totalCurrent={item.totalCurrent}
              totalRecruit={item.totalRecruit}
              recruitDeadline={item.recruitDeadline}
              member={item.member}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
