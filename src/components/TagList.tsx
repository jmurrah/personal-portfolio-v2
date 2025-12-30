import type { CSSProperties, ReactNode } from 'react';

interface TagListProps {
  tags: string[];
  getAccentColor: (index: number) => string;
  className?: string;
  icon?: ReactNode;
  tagClassName?: string;
  separator?: string;
}

export default function TagList({
  tags,
  getAccentColor,
  className = '',
  icon,
  tagClassName = '',
  separator = '/',
}: TagListProps) {
  if (!tags.length) return null;

  return (
    <div className={`tags flex flex-wrap items-start gap-1 ${className}`.trim()}>
      {icon ? <p className="shrink-0 flex items-center m-0 leading-none">{icon}</p> : null}
      {tags.map((tag, index) => (
        <div key={`${tag}-${index}`} className="flex items-center gap-1">
          {index > 0 && <p className="text-[var(--text-muted)] m-0 leading-none">{separator}</p>}
          <p
            className={`tag-pill leading-none m-0 ${tagClassName}`.trim()}
            style={{ '--tag-accent': getAccentColor(index) } as CSSProperties}
          >
            {tag}
          </p>
        </div>
      ))}
    </div>
  );
}
