import React from 'react';

type SvgIconSize = 'xsmall' | 'small' | 'medium' | 'large';

interface SvgIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  href?: string;
  src: string;
  alt: string;
  size?: SvgIconSize;
  color?: string;
  hoverColor?: string;
}

export default function SvgIcon({
  href,
  src,
  alt,
  size = 'medium',
  color = 'var(--text-muted)',
  hoverColor = 'var(--primary)',
}: SvgIconProps) {
  const classes = ['svg-icon', `svg-icon-${size}`].filter(Boolean).join(' ');

  const iconSpan = (
    <span
      className={classes}
      aria-hidden="true"
      style={
        {
          WebkitMaskImage: `url(${src})`,
          maskImage: `url(${src})`,
          color,
          '--icon-hover-color': hoverColor,
        } as React.CSSProperties
      }
    />
  );

  if (!href) return iconSpan;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="svg-icon-link"
      aria-label={alt}
    >
      {iconSpan}
    </a>
  );
}
