import React, { useState, useEffect } from 'react';
import FilledHeart from '@/assets/icons/ic_fillheart.svg';
import EmptyHeart from '@/assets/icons/ic_emptyheart.svg';

interface HeartRatingProps {
  /** 하트 개수 */
  value?: number;
  /** 콜백 함수 */
  onChange?: (value: number) => void;
  /** 읽기전용 */
  readOnly?: boolean;
}

export default function HeartRating({
  value = 0,
  onChange,
  readOnly = false,
}: HeartRatingProps) {
  const [rating, setRating] = useState(value);

  useEffect(() => {
    setRating(value);
  }, [value]);

  const handleClick = (index: number) => {
    if (readOnly) {
      return;
    }

    const newRating = index + 1;

    setRating(newRating);
    if (onChange) onChange(newRating);
  };

  return (
    <div className="flex items-center space-x-1">
      {Array.from({ length: 5 }).map((_, i) => {
        const HeartIcon = i < rating ? FilledHeart : EmptyHeart;
        return <HeartIcon key={i} onClick={() => handleClick(i)} />;
      })}
    </div>
  );
}
