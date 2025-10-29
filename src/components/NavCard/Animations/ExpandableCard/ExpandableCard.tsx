import type { CSSProperties } from 'react';
import Card from '@/components/Card';
import './ExpandableCard.css';

interface ExpandableCardProps {
  children: React.ReactNode;
  expanded: boolean;
  className?: string;
  tabContent: React.ReactNode;
  initialWidth?: string;
  initialHeight?: string;
}

const ANIMATION_DURATION = 5000;

export default function ExpandableCard({
  children,
  expanded,
  className = '',
  tabContent,
  initialWidth = '256px',
  initialHeight = '320px',
}: ExpandableCardProps) {
  const cardClasses = ['expandable-card', expanded ? 'expanded' : '', className]
    .filter(Boolean)
    .join(' ');

  const cardStyle = {
    '--animation-duration': `${ANIMATION_DURATION}ms`,
    '--initial-width': initialWidth,
    '--initial-height': initialHeight,
  } as CSSProperties;

  return (
    <Card className={cardClasses} style={cardStyle}>
      <div className="tabs-container">{children}</div>
      {expanded && (
        <div className="card-content">
          <div className="tab-content-inner p-3 mt-3">{tabContent}</div>
        </div>
      )}
    </Card>
  );
}
