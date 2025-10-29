import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import SvgIcon from '@/components/SvgIcon';
import './SlidingTabs.css';

export type Tab = {
  id: string;
  icon: string;
  label: string;
};

export interface SlidingTabsProps {
  tabs: Tab[];
  selectedTab: string | null;
  onSelectTab: (tabId: string) => void;
  onAnimationComplete?: () => void;
  isExpanded?: boolean;
  isClosing?: boolean;
}

const CARD_ANIMATION_DURATION_MS = 1000;

export default function SlidingTabs({
  tabs,
  selectedTab,
  onSelectTab,
  onAnimationComplete,
  isExpanded = false,
  isClosing = false,
}: SlidingTabsProps) {
  const [scaledTabId, setScaledTabId] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedTab || !onAnimationComplete) return;

    const timeoutId = window.setTimeout(() => {
      onAnimationComplete();
    }, CARD_ANIMATION_DURATION_MS);

    return () => window.clearTimeout(timeoutId);
  }, [selectedTab, onAnimationComplete]);

  useEffect(() => {
    setScaledTabId((current) => {
      if (!selectedTab || !isExpanded || isClosing) {
        return current !== null ? null : current;
      }

      return current === selectedTab ? current : selectedTab;
    });
  }, [selectedTab, isExpanded, isClosing]);

  const listStyle = useMemo(
    () =>
      ({
        '--animation-duration': `${CARD_ANIMATION_DURATION_MS}ms`,
      }) as CSSProperties,
    [],
  );

  const showFullList = !isExpanded || !selectedTab || isClosing;

  return (
    <div className="tabs-list" style={listStyle}>
      {tabs.map((tab) => {
        const isSelected = selectedTab === tab.id;
        const shouldScale = scaledTabId === tab.id;
        const shouldCollapse = !showFullList && !isSelected;

        const buttonClasses = [
          'tab-item',
          isSelected ? 'selected' : '',
          shouldScale ? 'scaled' : '',
          shouldCollapse ? 'collapsed' : '',
        ]
          .filter(Boolean)
          .join(' ');

        return (
          <button
            key={tab.id}
            className={buttonClasses}
            onClick={() => onSelectTab(tab.id)}
            aria-hidden={shouldCollapse}
            tabIndex={shouldCollapse ? -1 : 0}
          >
            <SvgIcon src={tab.icon} alt={tab.label} hoverColor="var(--primary)" size="small" />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
