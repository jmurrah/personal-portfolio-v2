import type { CSSProperties, HTMLAttributes } from 'react';

type SvgIconSize = '3xsmall' | '2xsmall' | 'xsmall' | 'small' | 'medium' | 'large';

interface SvgIconProps extends HTMLAttributes<HTMLSpanElement> {
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
  color = 'currentColor',
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
        } as CSSProperties
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
