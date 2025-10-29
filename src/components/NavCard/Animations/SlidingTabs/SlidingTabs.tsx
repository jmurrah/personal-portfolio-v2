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
}

const highlightTransition = { type: 'spring', stiffness: 500, damping: 45 } as const;

export default function SlidingTabs({
  tabs,
  selectedTab,
  onSelectTab,
  variant = 'compact',
  showSelection = true,
}: SlidingTabsProps) {
  return (
    <div className={`tabs-list tabs-list-${variant}`}>
      {tabs.map((tab) => {
        const isSelected = tab.id === selectedTab;

        return (
          <motion.button
            key={tab.id}
            type="button"
            layout="position"
            className={`tab-item tab-item-${variant} ${isSelected ? 'selected' : ''}`}
            onClick={() => onSelectTab(tab.id)}
            whileTap={{ scale: 0.97 }}
          >
            {showSelection && isSelected ? (
              <motion.span
                className="tab-highlight"
                layoutId="tab-highlight"
                transition={highlightTransition}
              />
            ) : null}
            <span className="tab-content">
              <SvgIcon
                src={tab.icon}
                alt={tab.label}
                hoverColor="var(--primary)"
                size={variant === 'compact' ? 'small' : 'medium'}
              />
              <span className="tab-label">{tab.label}</span>
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
