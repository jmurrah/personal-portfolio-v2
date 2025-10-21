import React from 'react';

interface SvgIconProps {
  href: string;
  src: string;
  alt: string;
  color?: string;
  hoverColor?: string;
}

export default function SvgIcon({
  href,
  src,
  alt,
  color = 'var(--text)',
  hoverColor = 'var(--primary)',
}: SvgIconProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="svg-icon-link"
      aria-label={alt}
      style={
        {
          '--icon-color': color,
          '--icon-hover-color': hoverColor,
        } as React.CSSProperties
      }
    >
      <span
        className="svg-icon"
        aria-hidden="true"
        style={
          {
            WebkitMaskImage: `url(${src})`,
            maskImage: `url(${src})`,
          } as React.CSSProperties
        }
      />
    </a>
  );
}
