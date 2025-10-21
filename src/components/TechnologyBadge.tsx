interface TechnologyBadgeProps {
  name: string;
  logoSrc: string;
  accent: string;
}

export default function TechnologyBadge({ name, logoSrc, accent }: TechnologyBadgeProps) {
  return (
    <div
      className="inline-flex items-center gap-1.5 rounded-sm border p-1.5"
      style={{ backgroundColor: 'var(--bg-light)', borderColor: 'var(--card-border)' }}
      onMouseEnter={(event) => {
        const target = event.currentTarget;
        target.style.backgroundColor = 'color-mix(in srgb, var(--bg-light) 92%, var(--primary) 8%)';
        target.style.borderColor = 'color-mix(in srgb, var(--card-border) 85%, var(--primary) 15%)';
      }}
      onMouseLeave={(event) => {
        const target = event.currentTarget;
        target.style.backgroundColor = 'var(--bg-light)';
        target.style.borderColor = 'var(--card-border)';
      }}
    >
      <span
        className="flex h-6 w-6 items-center justify-center rounded-sm"
        style={{ backgroundColor: accent }}
      >
        <img src={logoSrc} alt={`${name} logo`} className="h-4 w-4 object-contain" />
      </span>
      <h3 className="text-sm font-medium" style={{ color: 'var(--text)' }}>
        {name}
      </h3>
    </div>
  );
}
