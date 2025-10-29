import { type CSSProperties } from 'react';
import { NAV_CARD_ANIMATION } from '@/components/NavCard/animationConfig';
import SvgIcon from '@/components/SvgIcon';
import { motion } from 'framer-motion';
import './SlidingTabs.css';

export type Tab = {
  id: string;
  icon: string;
  label: string;
};

export type SlidingTabsVariant = 'compact' | 'expanded';

export interface SlidingTabsProps {
  tabs: Tab[];
  selectedTab: string | null;
  onSelectTab: (tabId: string) => void;
  variant?: SlidingTabsVariant;
  showSelection?: boolean;
  isInteractionLocked?: boolean;
}

export default function SlidingTabs({
  tabs,
  selectedTab,
  onSelectTab,
  variant = 'compact',
  showSelection = true,
  isInteractionLocked = false,
}: SlidingTabsProps) {
  const visibleTabs =
    variant === 'expanded' && selectedTab ? tabs.filter((tab) => tab.id === selectedTab) : tabs;

  return (
    <div className={`tabs-list tabs-list-${variant}`}>
      {visibleTabs.map((tab) => {
        const isSelected = tab.id === selectedTab;
        const baseColor =
          variant === 'expanded' || isSelected ? 'var(--text)' : 'var(--text-muted)';
        const iconStyle = isSelected || variant === 'expanded' ? { color: 'var(--text)' } : undefined;

        return (
          <motion.button
            key={tab.id}
            type="button"
            layout="position"
            className={`tab-item tab-item-${variant} ${isSelected ? 'selected' : ''}`}
            onClick={() => {
              if (isInteractionLocked) return;
              onSelectTab(tab.id);
            }}
            whileTap={isInteractionLocked ? undefined : { scale: 0.97 }}
            disabled={isInteractionLocked}
            aria-disabled={isInteractionLocked}
            style={{ '--tab-color': baseColor } as CSSProperties}
          >
            {showSelection && isSelected ? (
              <motion.span
                className="tab-highlight"
                layoutId="tab-highlight"
                transition={NAV_CARD_ANIMATION.highlight}
              />
            ) : null}
            <span className="tab-content">
              <SvgIcon
                src={tab.icon}
                alt={tab.label}
                color="currentColor"
                hoverColor="currentColor"
                size={variant === 'compact' ? 'small' : 'medium'}
                style={iconStyle}
              />
              <span className="tab-label">{tab.label}</span>
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
