import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface HeartRatingProps {
  /** 하트 개수 */
  rating?: number;
  /** 콜백 함수 */
  onChange?: (rating: number) => void;
  /** 크기 */
  size?: number;
}

export default function HeartRating({
  rating = 0,
  onChange,
  size = 24,
}: HeartRatingProps) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const hearts = Array(5).fill(0);

  return (
    <div className="flex space-x-1" role="radiogroup" aria-label="하트 평가">
      {hearts.map((_, i) => {
        const index = i + 1;
        const isSelected = rating >= index;

        return (
          <button
            key={index}
            type="button"
            aria-checked={isSelected}
            role="radio"
            onClick={() => onChange && onChange(index)}
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
            className="cursor-pointer border-0 bg-transparent p-0"
            style={{ width: size, height: size }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              width={size}
              height={size}
            >
              {/* 하트 외곽선 */}
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
                   2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09
                   C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5
                   c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                fill="#E5E7EB"
              />

              {/* 채워지는 부분: AnimatePresence와 motion.path로 점점 채워지는 애니메이션 */}
              <AnimatePresence>
                {(isSelected ||
                  (hoverIndex !== null && hoverIndex >= index)) && (
                  <motion.path
                    key="fill"
                    fill="#0057CF"
                    stroke="none"
                    initial={{ pathLength: 0, opacity: 0.5 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    exit={{ pathLength: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
                    2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09
                    C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5
                    c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  />
                )}
              </AnimatePresence>
            </svg>
          </button>
        );
      })}
    </div>
  );
}
