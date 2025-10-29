import { useRef, useState, useEffect } from 'react';
import Card from '@/components/Card';
import './ExpandableCard.css';

interface ExpandableCardProps {
  children: React.ReactNode;
  expanded: boolean;
  className?: string;
  tabContent: React.ReactNode;
  onAnimationComplete?: () => void;
  initialWidth?: string;
  initialHeight?: string;
}

const ANIMATION_DURATION = 600;

export default function ExpandableCard({
  children,
  expanded,
  className = '',
  tabContent,
  onAnimationComplete,
  initialWidth = '256px',
  initialHeight = '320px',
}: ExpandableCardProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);
  const [cardHeight, setCardHeight] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (cardRef.current && !expanded) {
      setCardHeight(cardRef.current.offsetHeight);
    }
  }, []);

  useEffect(() => {
    const updateContentHeight = () => {
      if (contentRef.current && cardRef.current) {
        if (expanded) {
          const tabsHeight = cardRef.current.querySelector('.tabs-container')?.clientHeight || 0;
          setContentHeight(contentRef.current.scrollHeight);

          const newCardHeight = tabsHeight + contentRef.current.scrollHeight;
          setCardHeight(Math.max(newCardHeight, parseFloat(initialHeight)));
        } else {
          setContentHeight(0);
          setCardHeight(parseFloat(initialHeight));
        }
      }
    };

    updateContentHeight();

    window.addEventListener('resize', updateContentHeight);
    return () => window.removeEventListener('resize', updateContentHeight);
  }, [expanded, tabContent, initialHeight]);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => {
      setIsAnimating(false);
      if (expanded && onAnimationComplete) onAnimationComplete();
    }, ANIMATION_DURATION);
    return () => clearTimeout(timer);
  }, [expanded, onAnimationComplete]);

  const cardClasses = [
    'expandable-card',
    expanded ? 'expanded' : '',
    isAnimating ? 'animating' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Card
      ref={cardRef}
      className={cardClasses}
      style={
        {
          '--animation-duration': `${ANIMATION_DURATION}ms`,
          '--content-height': `${contentHeight}px`,
          '--initial-width': initialWidth,
          '--initial-height': initialHeight,
        } as React.CSSProperties
      }
    >
      <div className="tabs-container">{children}</div>
      <div ref={contentRef} className="card-content" aria-hidden={!expanded}>
        {expanded && <div className="tab-content-inner p-3 mt-3">{tabContent}</div>}
      </div>
    </Card>
  );
}
