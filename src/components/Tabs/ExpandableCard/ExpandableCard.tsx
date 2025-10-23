import { useRef, useState, useEffect } from 'react';
import Card from '@/components/Card';
import './ExpandableCard.css';

interface ExpandableCardProps {
  children: React.ReactNode;
  expanded: boolean;
  className?: string;
  tabContent?: React.ReactNode; // Add support for tab content
  onAnimationComplete?: () => void;
  initialWidth?: string; // Add support for initial width
}

const ANIMATION_DURATION = 600;

export default function ExpandableCard({
  children,
  expanded,
  className = '',
  tabContent,
  onAnimationComplete,
  initialWidth = '256px', // Default width for tabs
}: ExpandableCardProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Measure content height for smooth transitions
  useEffect(() => {
    const updateContentHeight = () => {
      if (contentRef.current) {
        if (expanded) {
          // Get actual content height
          setContentHeight(contentRef.current.scrollHeight);
        } else {
          // Close content area
          setContentHeight(0);
        }
      }
    };

    // Update on expansion changes
    updateContentHeight();

    // Also update on window resize for responsive layouts
    window.addEventListener('resize', updateContentHeight);
    return () => window.removeEventListener('resize', updateContentHeight);
  }, [expanded, tabContent]);

  // Handle animation states
// Update this useEffect to have consistent dependency array
useEffect(() => {
  setIsAnimating(true);
  const timer = setTimeout(() => {
    setIsAnimating(false);
    if (expanded && onAnimationComplete) onAnimationComplete();
  }, ANIMATION_DURATION);
  return () => clearTimeout(timer);
}, [expanded, onAnimationComplete]); // This is the problematic array

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
      className={cardClasses}
      style={
        {
          '--animation-duration': `${ANIMATION_DURATION}ms`,
          '--content-height': `${contentHeight}px`,
          '--initial-width': initialWidth,
        } as React.CSSProperties
      }
    >
      <div className="tabs-container">
        {children}
      </div>

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