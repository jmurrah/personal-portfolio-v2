import Card from '@/components/Card';
import { NAV_CARD_ANIMATION } from '@/components/NavCard/animationConfig';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { type CSSProperties } from 'react';
import './ExpandableCard.css';

const MotionCard = motion.create(Card);

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
      <div className={wrapperClass} style={baseStyle}>
        {!expanded ? (
          <MotionCard
            layoutId="expandable-card-container"
            className="expandable-card-base"
            transition={NAV_CARD_ANIMATION.layout}
            initial={false}
          >
            <div className="tabs-container">{renderTabs('compact')}</div>
            <motion.div
              layoutId="expandable-card-body"
              className="card-content card-content-placeholder"
              initial={false}
              aria-hidden
            />
          </MotionCard>
        ) : null}
      </div>
      <AnimatePresence>
        {expanded && (
          <>
            <motion.div
              className="expandable-card-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.65 }}
              exit={{ opacity: 0 }}
              transition={NAV_CARD_ANIMATION.overlay}
              aria-hidden
            />
            <motion.div
              className="expandable-card-portal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={NAV_CARD_ANIMATION.portal}
            >
              <MotionCard
                layoutId="expandable-card-container"
                className="expandable-card-expanded"
                transition={NAV_CARD_ANIMATION.layout}
                initial={false}
              >
                <div className="tabs-container expanded">{renderTabs('expanded')}</div>
                <motion.div
                  layoutId="expandable-card-body"
                  className="card-content"
                  initial={false}
                >
                  <div className="card-content-viewport">
                    {tabContent ? (
                      <div className="card-content-body tab-content-inner p-3 mt-1">{tabContent}</div>
                    ) : null}
                  </div>
                </motion.div>
              </MotionCard>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </LayoutGroup>
  );
}
