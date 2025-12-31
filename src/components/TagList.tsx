interface TagListProps {
  tags: string[];
  className?: string;
  tagClassName?: string;
}

export default function TagList({ tags, className = '', tagClassName = '' }: TagListProps) {
  if (!tags.length) return null;

  const containerClasses = `tags flex items-start gap-1 ${className}`.trim();
  const tagClasses = `tag-pill leading-none m-0 ${tagClassName}`.trim();

  return (
    <div className={containerClasses}>
      <div className="flex flex-wrap items-center gap-1">
        {tags.map((tag, index) => (
          <p key={`${tag}-${index}`} className={tagClasses}>
            {tag}
          </p>
        ))}
      </div>
    </div>
  );
}
