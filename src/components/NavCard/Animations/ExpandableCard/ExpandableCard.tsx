import Card from '@/components/Card';
import { NAV_CARD_ANIMATION } from '@/components/NavCard/animationConfig';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import './ExpandableCard.css';

const MotionCard = motion(Card);

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
  const expandedCardRef = useRef<HTMLDivElement | null>(null);
  const [expandedHeight, setExpandedHeight] = useState<number | null>(null);

  const baseStyle = {
    '--initial-width': initialWidth,
    '--initial-height': initialHeight,
  } as CSSProperties;

  useLayoutEffect(() => {
    if (!expanded) {
      setExpandedHeight(null);
      return;
    }

    const element = expandedCardRef.current;
    if (!element) return;

    const updateHeight = () => {
      const nextHeight = element.getBoundingClientRect().height;
      setExpandedHeight((current) => (current === nextHeight ? current : nextHeight));
    };

    updateHeight();

    if (typeof ResizeObserver !== 'undefined') {
      const observer = new ResizeObserver(updateHeight);
      observer.observe(element);
      return () => observer.disconnect();
    }

    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, [expanded, tabContent]);

  return (
    <LayoutGroup id="expandable-card">
      <div className={wrapperClass} style={baseStyle}>
        <MotionCard
          layoutId="expandable-card-container"
          className={`expandable-card-base ${expanded ? 'is-hidden' : ''}`}
          transition={NAV_CARD_ANIMATION.layout}
          aria-hidden={expanded}
          style={
            expanded
              ? {
                  height: expandedHeight ? `${expandedHeight}px` : 'auto',
                  opacity: 0,
                  pointerEvents: 'none',
                }
              : undefined
          }
        >
          <div className="tabs-container">{renderTabs('compact')}</div>
        </MotionCard>
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
                ref={expandedCardRef}
              >
                <motion.div
                  layout
                  className="tabs-container expanded"
                  initial={false}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  transition={{
                    layout: NAV_CARD_ANIMATION.layout,
                    opacity: NAV_CARD_ANIMATION.content,
                    y: NAV_CARD_ANIMATION.content,
                  }}
                >
                  {renderTabs('expanded')}
                </motion.div>
                <motion.div
                  layout
                  className="card-content"
                  initial={false}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  transition={{
                    layout: NAV_CARD_ANIMATION.layout,
                    opacity: NAV_CARD_ANIMATION.content,
                    y: NAV_CARD_ANIMATION.content,
                  }}
                >
                  <div className="card-content-viewport">
                    <div className="card-content-body tab-content-inner p-3 mt-1">{tabContent}</div>
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
