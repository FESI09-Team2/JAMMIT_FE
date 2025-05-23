'use client';
import TagSelector from '@/components/commons/TagSelector';

export default function TagSelectorTestPage() {
  const handleSessionChange = (selected: string[]) => {
    console.log('선호 장르:', selected);
  };
  const handleGenreChange = (selected: string[]) => {
    console.log('선호 장르:', selected);
  };
  return (
    <div className="flex h-full w-full flex-col gap-10 bg-[#242429] p-10">
      <div className="w-100">
        <TagSelector
          tags={[
            '보컬',
            '일렉 기타',
            '드럼',
            '통기타',
            '베이스',
            '현악기',
            '타악기',
          ]}
          onChange={handleSessionChange}
        />
      </div>
      <div className="w-70">
        <TagSelector
          tags={[
            '락/메탈',
            '팝',
            '발라드',
            '인디',
            '얼터너티브',
            '재즈',
            '펑크',
            '어쿠스틱',
            '포크',
            'R&B',
          ]}
          onChange={handleGenreChange}
        />
      </div>
    </div>
  );
}
