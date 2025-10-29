import { useEffect, useState, type CSSProperties } from 'react';
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

const TAB_ANIMATION_DURATION_MS = 520;

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
    }, TAB_ANIMATION_DURATION_MS);

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

  const animationDurationValue = `${TAB_ANIMATION_DURATION_MS}ms`;
  const showFullList = !isExpanded || !selectedTab || isClosing;

  return (
    <div
      className="tabs-list"
      style={{ '--animation-duration': animationDurationValue } as CSSProperties}
    >
      {tabs.map((tab) => {
        const isSelected = selectedTab === tab.id;
        const shouldScale = scaledTabId === tab.id;
        const inlineStyle: CSSProperties = {
          zIndex: isSelected ? 10 : 1,
        };

        if (!showFullList && !isSelected) {
          inlineStyle.display = 'none';
        }

        const buttonClasses = [
          'tab-item',
          isSelected ? 'selected' : '',
          shouldScale ? 'scaled' : '',
        ]
          .filter(Boolean)
          .join(' ');

        return (
          <button
            key={tab.id}
            className={buttonClasses}
            onClick={() => onSelectTab(tab.id)}
            style={inlineStyle}
          >
            <SvgIcon src={tab.icon} alt={tab.label} hoverColor="var(--primary)" size="small" />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
