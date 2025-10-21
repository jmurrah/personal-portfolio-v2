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
    <a href={href} target="_blank" rel="noopener noreferrer" className="svg-icon-link">
      <div
        className="svg-icon"
        style={
          {
            '--icon-color': color,
            '--icon-hover-color': hoverColor,
          } as React.CSSProperties
        }
      >
        <img src={src} alt={alt} width="24" height="24" />
      </div>
    </a>
  );
}
