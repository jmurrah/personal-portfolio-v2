import { type ReactNode } from 'react';
import './HomeShowcase.css';

type HomeShowcaseProps = {
  state: 'idle' | 'slide-in' | 'slide-out';
  hideCards: boolean;
  children: ReactNode;
};

export default function HomeShowcase({ state, hideCards, children }: HomeShowcaseProps) {
  const className = [
    'home-showcase',
    `home-showcase--${state}`,
    hideCards ? 'home-showcase--hidden' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={className}>{children}</div>;
}
