import { forwardRef, type HTMLAttributes } from 'react';

type CardProps = HTMLAttributes<HTMLDivElement>;

const Card = forwardRef<HTMLDivElement, CardProps>(({ style, ...rest }, ref) => (
  <div
    {...rest}
    ref={ref}
    style={{
      border: '1px solid var(--card-border)',
      borderRadius: 12,
      padding: '1rem',
      backgroundColor: 'var(--card-bg)',
      ...style,
    }}
  />
));

Card.displayName = 'Card';

export default Card;
