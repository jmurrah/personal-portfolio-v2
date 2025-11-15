import { type CSSProperties } from 'react';
import { NAV_CARD_ANIMATION } from '@/components/NavCard/animationConfig';
import SvgIcon from '@/components/SvgIcon';
import { motion } from 'framer-motion';
import './Tabs.css';

export type Tab = {
  id: string;
  icon: string;
  label: string;
  href?: string;
};

export type TabsVariant = 'compact' | 'expanded';

export interface TabsProps {
  tabs: Tab[];
  selectedTab: string | null;
  onSelectTab: (tabId: string) => void;
  variant?: TabsVariant;
  showSelection?: boolean;
  isInteractionLocked?: boolean;
}

export default function Tabs({
  tabs,
  selectedTab,
  onSelectTab,
  variant = 'compact',
  showSelection = true,
  isInteractionLocked = false,
}: TabsProps) {
  const visibleTabs =
    variant === 'expanded' && selectedTab ? tabs.filter((tab) => tab.id === selectedTab) : tabs;

  return (
    <div className={`tabs-list px-1 mt-2 tabs-list-${variant}`}>
      {visibleTabs.map((tab) => {
        const isSelected = tab.id === selectedTab;
        const baseColor = undefined;
        const iconStyle =
          isSelected || variant === 'expanded' ? { color: 'var(--text)' } : undefined;
        const targetHref = tab.href ?? `/${tab.id}`;

        return (
          <a
            key={tab.id}
            href={targetHref}
            className={`tab-item tab-item-${variant} ${isSelected ? 'selected' : ''}`}
            onClick={(event) => {
              event.preventDefault();
              if (isInteractionLocked) return;
              onSelectTab(tab.id);
            }}
            aria-disabled={isInteractionLocked}
            tabIndex={isInteractionLocked ? -1 : 0}
            aria-label={`${tab.label} (${targetHref})`}
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
          </a>
        );
      })}
    </div>
  );
}
