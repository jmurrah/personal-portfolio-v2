import { type HTMLAttributes } from 'react';

type CardProps = HTMLAttributes<HTMLDivElement>;

export default function Card({ style, ...rest }: CardProps) {
  return (
    <div
      {...rest}
      style={{
        border: '1px solid var(--card-border)',
        borderRadius: 12,
        padding: '1rem',
        backgroundColor: 'var(--card-bg)',
        ...style,
      }}
    />
  );
}
