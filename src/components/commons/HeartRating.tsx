import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FilledHeart from '@/assets/icons/ic_fillheart.svg';
import EmptyHeart from '@/assets/icons/ic_emptyheart.svg';

interface HeartRatingProps {
  /** 하트 개수 */
  value?: number;
  /** 동적 렌더링을 위한 콜백 함수 */
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
  const [animStage, setAnimStage] = useState<null | number>(null);
  const [animIndex, setAnimIndex] = useState<null | number>(null);

  useEffect(() => {
    setRating(value);
  }, [value]);

  const handleClick = (index: number) => {
    if (readOnly) {
      return;
    }

    setRating(index + 1);
    if (onChange) {
      onChange(index + 1);
    }

    setAnimIndex(index);
    setAnimStage(1);
  };

  const scaleMap: Record<number, number> = { 1: 0.92, 2: 1.08, 3: 1 };

  const onAnimComplete = () => {
    if (animStage === 1) {
      setAnimStage(2);
    } else if (animStage === 2) {
      setAnimStage(3);
    } else if (animStage === 3) {
      setAnimStage(null);
      setAnimIndex(null);
    }
  };

  return (
    <div className="flex items-center space-x-1">
      {Array.from({ length: 5 }).map((_, i) => {
        const HeartIcon = i < rating ? FilledHeart : EmptyHeart;
        const isAnimating = animIndex === i && animStage !== null;

        return (
          <button
            key={i}
            type="button"
            onClick={() => handleClick(i)}
            disabled={readOnly}
            style={{
              cursor: readOnly ? 'default' : 'pointer',
              background: 'none',
              border: 'none',
              padding: 0,
            }}
            aria-label={`${i + 1}점`}
          >
            <motion.div
              style={{ width: 24, height: 24, display: 'flex' }}
              animate={{ scale: isAnimating ? scaleMap[animStage] : 1 }}
              transition={{ duration: 0.15 }}
              onAnimationComplete={onAnimComplete}
            >
              <HeartIcon />
            </motion.div>
          </button>
        );
      })}
    </div>
  );
}
