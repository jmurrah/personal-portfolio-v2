interface TechnologyBadgeProps {
  name: string;
  logoSrc: string;
  accent: string;
}

export default function TechnologyBadge({ name, logoSrc, accent }: TechnologyBadgeProps) {
  return (
    <div
      className="inline-flex items-center gap-1.5 rounded-sm border p-1.5"
      style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
      onMouseEnter={(event) => {
        const target = event.currentTarget;
        target.style.backgroundColor = 'color-mix(in srgb, var(--surface) 88%, var(--primary) 12%)';
        target.style.borderColor = 'color-mix(in srgb, var(--border) 75%, var(--primary) 25%)';
      }}
      onMouseLeave={(event) => {
        const target = event.currentTarget;
        target.style.backgroundColor = 'var(--surface)';
        target.style.borderColor = 'var(--border)';
      }}
    >
      <span
        className="tech-badge__icon flex h-6 w-6 items-center justify-center rounded-sm"
        style={{ '--tech-accent': accent } as React.CSSProperties}
      >
        <img src={logoSrc} alt={`${name} logo`} className="h-4 w-4 object-contain" />
      </span>
      <h3 className="text-base">{name}</h3>
    </div>
  );
}
