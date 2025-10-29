import Card from '@/components/Card';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import type { CSSProperties } from 'react';
import './ExpandableCard.css';

const MotionCard = motion(Card);

const OPEN_TRANSITION = { type: 'spring', stiffness: 220, damping: 30 } as const;

type ExpandableVariant = 'compact' | 'expanded';

interface ExpandableCardProps {
  renderTabs: (variant: ExpandableVariant) => React.ReactNode;
  expanded: boolean;
  className?: string;
  tabContent: React.ReactNode;
  initialWidth?: string;
  initialHeight?: string;
}

export default function ExpandableCard({
  renderTabs,
  expanded,
  className = '',
  tabContent,
  initialWidth = '256px',
  initialHeight = '320px',
}: ExpandableCardProps) {
  const wrapperClass = ['expandable-card-wrapper', className].filter(Boolean).join(' ');

  const baseStyle = {
    '--initial-width': initialWidth,
    '--initial-height': initialHeight,
  } as CSSProperties;

  return (
    <LayoutGroup id="expandable-card">
      {!expanded && (
        <div className={wrapperClass} style={baseStyle}>
          <MotionCard
            layoutId="expandable-card-container"
            className="expandable-card-base"
            transition={OPEN_TRANSITION}
          >
            <div className="tabs-container">{renderTabs('compact')}</div>
          </MotionCard>
        </div>
      )}
      <AnimatePresence>
        {expanded && (
          <>
            <motion.div
              className="expandable-card-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.65 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              aria-hidden
            />
            <motion.div
              className="expandable-card-portal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <MotionCard
                layoutId="expandable-card-container"
                className="expandable-card-expanded"
                transition={OPEN_TRANSITION}
              >
                <div className="tabs-container expanded">{renderTabs('expanded')}</div>
                <motion.div
                  layout
                  className="card-content"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  transition={{ duration: 0.3, delay: 0.05 }}
                >
                  <div className="tab-content-inner p-3 mt-1">{tabContent}</div>
                </motion.div>
              </MotionCard>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </LayoutGroup>
  );
}
