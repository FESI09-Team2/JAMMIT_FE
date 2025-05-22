import React, { useState, useCallback } from 'react';
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

const SCALE_MAP: Record<number, number> = { 1: 0.92, 2: 1.08, 3: 1 };
const TOTAL_HEARTS = 5;

export default function HeartRating({
  value = 0,
  onChange,
  readOnly = false,
}: HeartRatingProps) {
  const [animStage, setAnimStage] = useState<null | number>(null);
  const [animIndex, setAnimIndex] = useState<null | number>(null);

  const handleClick = useCallback(
    (index: number) => {
      if (readOnly) {
        return;
      }

      if (onChange) {
        onChange(index + 1);
      }

      setAnimIndex(index);
      setAnimStage(1);
    },
    [readOnly, onChange],
  );

  const onAnimComplete = useCallback(() => {
    if (animStage === 1) {
      setAnimStage(2);
    } else if (animStage === 2) {
      setAnimStage(3);
    } else if (animStage === 3) {
      setAnimStage(null);
      setAnimIndex(null);
    }
  }, [animStage]);

  return (
    <div className="flex items-center space-x-1">
      {Array.from({ length: TOTAL_HEARTS }).map((_, i) => {
        const HeartIcon = i < value ? FilledHeart : EmptyHeart;
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
              animate={{ scale: isAnimating ? SCALE_MAP[animStage] : 1 }}
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
