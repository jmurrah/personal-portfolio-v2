import type { CSSProperties } from 'react';

interface TechnologyBadgeProps {
  name: string;
  accent: string;
}

export default function TechnologyBadge({ name, accent }: TechnologyBadgeProps) {
  return (
    <div
      className="tech-badge inline-flex items-center rounded-sm border px-2.5 py-1 text-sm"
      style={{ '--tech-accent': accent } as CSSProperties}
    >
      <span>{name}</span>
    </div>
  );
}
