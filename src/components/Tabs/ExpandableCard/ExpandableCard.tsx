import {
  useLayoutEffect,
  useRef,
  useState,
  useEffect,
  type CSSProperties,
  type ReactNode,
} from 'react';
import Card from '@/components/Card';
import './ExpandableCard.css';

export interface ExpandableCardProps {
  children: ReactNode;
  expanded: boolean;
  className?: string;
  contentId?: string; // Optional ID for the content section
}

const CONTAINER_EXPAND_DURATION_MS = 520;

export default function ExpandableCard({
  children,
  expanded,
  className = '',
  contentId = 'tab-content',
}: ExpandableCardProps) {
  const [cardMetrics, setCardMetrics] = useState<{
    offsetLeft: number;
    parentWidth: number;
  } | null>(null);
  const [contentHeight, setContentHeight] = useState<number | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  // Measure the layout for positioning
  useLayoutEffect(() => {
    const measureLayout = () => {
      const cardNode = cardRef.current;
      if (cardNode) {
        const parentElement = cardNode.parentElement;
        const cardRect = cardNode.getBoundingClientRect();
        const parentRect = parentElement?.getBoundingClientRect();
        const nextOffsetLeft = parentRect ? cardRect.left - parentRect.left : cardNode.offsetLeft;
        const nextParentWidth = parentRect?.width ?? cardRect.width;

        setCardMetrics((previous) => {
          if (
            previous &&
            previous.offsetLeft === nextOffsetLeft &&
            previous.parentWidth === nextParentWidth
          ) {
            return previous;
          }

          return {
            offsetLeft: nextOffsetLeft,
            parentWidth: nextParentWidth,
          };
        });
      }
    };

    measureLayout();
    window.addEventListener('resize', measureLayout);

    return () => {
      window.removeEventListener('resize', measureLayout);
    };
  }, [expanded]);

  // Measure content height for smooth height transition
  useEffect(() => {
    const content = document.getElementById(contentId);
    if (content && expanded) {
      // Small delay to ensure content is rendered
      setTimeout(() => {
        setContentHeight(content.scrollHeight);
      }, 10);
    } else {
      setContentHeight(0);
    }
  }, [expanded, contentId]);

  const expandDurationValue = `${CONTAINER_EXPAND_DURATION_MS}ms`;
  const containerClassName = [
    'expandable-card',
    expanded ? 'expandable-card--expanded' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const cardStyle = {
    '--container-expand-duration': expandDurationValue,
    '--card-offset-left': cardMetrics ? `${cardMetrics.offsetLeft}px` : undefined,
    '--card-parent-width': cardMetrics ? `${cardMetrics.parentWidth}px` : undefined,
    '--content-height': contentHeight ? `${contentHeight}px` : '0px',
  } as CSSProperties;

  return (
    <Card ref={cardRef} className={containerClassName} style={cardStyle}>
      {children}
      <div
        id={contentId}
        ref={contentRef}
        className={`content-wrapper ${expanded ? 'expanded' : ''}`}
      >
        {/* Tab content goes here */}
        {expanded && (
          <div className="tab-content">
            <h2>Tab Content for Selected Tab</h2>
            <p>This area will show content for the selected tab.</p>
            <p>You can put any content here and it will automatically expand.</p>
          </div>
        )}
      </div>
    </Card>
  );
}
