import type { CSSProperties, ReactNode } from 'react';

interface TagListProps {
  tags: string[];
  getAccentColor: (index: number) => string;
  className?: string;
  tagClassName?: string;
  startIndex?: number;
}

export default function TagList({
  tags,
  getAccentColor,
  className = '',
  tagClassName = '',
  startIndex = 0,
}: TagListProps) {
  if (!tags.length) return null;

  return (
    <div className={`tags flex items-start gap-1 ${className}`.trim()}>
      <div className="flex flex-wrap items-center gap-2">
        {tags.map((tag, index) => (
          <p
            key={`${tag}-${index}`}
            className={`tag-pill leading-none m-0 ${tagClassName}`.trim()}
            style={{ '--tag-accent-muted': getAccentColor(startIndex + index) } as CSSProperties}
          >
            {tag}
          </p>
        ))}
      </div>
    </div>
  );
}
