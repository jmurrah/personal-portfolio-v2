import { useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import Card from '@/components/Card';
import './ExpandableCard.css';

export interface ExpandableCardProps {
  children: ReactNode;
  expanded: boolean;
  className?: string;
}

const CONTAINER_EXPAND_DURATION_MS = 520;

export default function ExpandableCard({
  children,
  expanded,
  className = '',
}: ExpandableCardProps) {
  const [cardMetrics, setCardMetrics] = useState<{
    offsetLeft: number;
    parentWidth: number;
  } | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

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
  } as CSSProperties;

  return (
    <Card ref={cardRef} className={containerClassName} style={cardStyle}>
      {children}
    </Card>
  );
}
