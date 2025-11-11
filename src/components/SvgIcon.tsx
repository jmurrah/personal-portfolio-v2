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
  color = 'var(--text)',
  hoverColor = 'var(--primary)',
  className,
  style,
  ...rest
}: SvgIconProps) {
  const classes = ['svg-icon', `svg-icon-${size}`, className].filter(Boolean).join(' ');

  const iconSpan = (
    <span
      className={classes}
      aria-hidden="true"
      style={
        {
          '--icon-hover-color': hoverColor,
          '--icon-mask-image': `url("${src}")`,
          color,
          ...style,
        } as React.CSSProperties
      }
      {...rest}
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
