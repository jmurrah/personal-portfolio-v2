interface TagListProps {
  tags: string[];
  className?: string;
  tagClassName?: string;
}

export default function TagList({ tags, className = '', tagClassName = '' }: TagListProps) {
  if (!tags.length) return null;

  return (
    <div className={`tags flex items-start gap-1 ${className}`.trim()}>
      <div className="flex flex-wrap items-center gap-2">
        {tags.map((tag, index) => (
          <p key={`${tag}-${index}`} className={`tag-pill leading-none m-0 ${tagClassName}`.trim()}>
            {tag}
          </p>
        ))}
      </div>
    </div>
  );
}
