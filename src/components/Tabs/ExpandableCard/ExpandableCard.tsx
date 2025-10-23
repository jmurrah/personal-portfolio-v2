import { useRef, useState, useEffect } from 'react';
import Card from '@/components/Card';
import './ExpandableCard.css';

interface ExpandableCardProps {
  children: React.ReactNode;
  expanded: boolean;
  className?: string;
  tabContent?: React.ReactNode;
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

  // Capture initial card height
  useEffect(() => {
    if (cardRef.current && !expanded) {
      setCardHeight(cardRef.current.offsetHeight);
    }
  }, []);

  // Measure content height for smooth transitions
  useEffect(() => {
    const updateContentHeight = () => {
      if (contentRef.current && cardRef.current) {
        if (expanded) {
          // Get actual content height + tab height
          const tabsHeight = cardRef.current.querySelector('.tabs-container')?.clientHeight || 0;

          // Set content height exactly to its scroll height
          setContentHeight(contentRef.current.scrollHeight);

          // Use explicit calculation instead of using offsetHeight
          const newCardHeight = tabsHeight + contentRef.current.scrollHeight;

          // Use this calculation but ensure we don't go smaller than initial
          setCardHeight(Math.max(newCardHeight, parseFloat(initialHeight)));
        } else {
          // Closing - reset to initial height
          setContentHeight(0);
          setCardHeight(parseFloat(initialHeight));
        }
      }
    };

    // Update on expansion changes
    updateContentHeight();

    // Also update on window resize for responsive layouts
    window.addEventListener('resize', updateContentHeight);
    return () => window.removeEventListener('resize', updateContentHeight);
  }, [expanded, tabContent, initialHeight]);

  // Handle animation states
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => {
      setIsAnimating(false);
      if (expanded && onAnimationComplete) onAnimationComplete();
    }, ANIMATION_DURATION);
    return () => clearTimeout(timer);
  }, [expanded, onAnimationComplete]);

  // Combine classes
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
        } as React.CSSProperties
      }
    >
      <div className="tabs-container">{children}</div>
      <div ref={contentRef} className="card-content" aria-hidden={!expanded}>
        {expanded && (
          <div className="tab-content-inner">
            {tabContent || (
              <div>
                <h2>Tab Content</h2>
                <p>This is the expandable content area.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
