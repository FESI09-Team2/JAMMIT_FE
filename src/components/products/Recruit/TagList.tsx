import React, { useLayoutEffect, useRef, useState } from 'react';

interface TagListProps {
  tags: string[];
}

export default function TagList({ tags }: TagListProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [visibleTags, setVisibleTags] = useState<string[]>([]);
  const [hiddenTags, setHiddenTags] = useState<string[]>([]);
  useLayoutEffect(() => {
    if (!wrapperRef.current || !tags.length) {
      return;
    }
    const tagEls = Array.from(wrapperRef.current!.children) as HTMLElement[];
    const containerWidth = wrapperRef.current!.offsetWidth;
    let total = 0;
    const visible: string[] = [];
    const hidden: string[] = [];

    for (let i = 0; i < tags.length; i++) {
      const el = tagEls[i];
      if (!el) {
        break;
      }
      total += el.offsetWidth + 8;
      if (total < containerWidth - 40) {
        visible.push(tags[i]);
      } else {
        hidden.push(tags[i]);
      }
    }

    setVisibleTags(visible);
    setHiddenTags(hidden);
  }, [tags]);
  return (
    <div className="mt-[1.12rem] flex flex-wrap gap-[0.37rem]" ref={wrapperRef}>
      {(visibleTags.length ? visibleTags : tags).map((tag) => (
        <span
          key={tag}
          className="rounded-lg bg-[color:var(--bg-34343A)] px-3 py-1.5 text-sm font-medium"
        >
          {tag}
        </span>
      ))}
      {visibleTags.length > 0 && hiddenTags.length > 0 && (
        <span className="rounded-lg bg-[color:var(--bg-34343A)] px-3 py-1.5 text-sm font-medium">
          ...
        </span>
      )}
    </div>
  );
}
