import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
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
}

const TAB_SLIDE_DURATION_MS = 520;

export default function SlidingTabs({
  tabs,
  selectedTab,
  onSelectTab,
  onAnimationComplete,
}: SlidingTabsProps) {
  const [tabOffsets, setTabOffsets] = useState<Record<string, number>>({});
  const [listMetrics, setListMetrics] = useState<{ listHeight: number; tabHeight: number }>({
    listHeight: 0,
    tabHeight: 0,
  });
  const listRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    if (!selectedTab || !onAnimationComplete) return;

    const timeoutId = window.setTimeout(() => {
      onAnimationComplete();
    }, TAB_SLIDE_DURATION_MS);

    return () => window.clearTimeout(timeoutId);
  }, [selectedTab, onAnimationComplete]);

  useLayoutEffect(() => {
    const measureLayout = () => {
      const offsets: Record<string, number> = {};
      let measuredTabHeight = 0;

      tabs.forEach((tab) => {
        const tabNode = tabRefs.current[tab.id];
        if (tabNode) {
          offsets[tab.id] = tabNode.offsetTop;
          if (!measuredTabHeight) {
            measuredTabHeight = tabNode.offsetHeight;
          }
        }
      });

      const nextListHeight = listRef.current?.scrollHeight ?? 0;

      setTabOffsets((previous) => {
        const hasChanges = tabs.some((tab) => previous[tab.id] !== offsets[tab.id]);
        return hasChanges ? offsets : previous;
      });

      setListMetrics((previous) => {
        if (previous.listHeight === nextListHeight && previous.tabHeight === measuredTabHeight) {
          return previous;
        }

        return {
          listHeight: nextListHeight,
          tabHeight: measuredTabHeight,
        };
      });
    };

    measureLayout();
    window.addEventListener('resize', measureLayout);

    return () => {
      window.removeEventListener('resize', measureLayout);
    };
  }, [tabs, selectedTab]);

  const slideDurationValue = `${TAB_SLIDE_DURATION_MS}ms`;

  return (
    <div
      ref={listRef}
      className={`tabs-list ${selectedTab ? 'tab-selected' : ''}`}
      style={
        {
          '--animation-duration': slideDurationValue,
          '--list-height': listMetrics.listHeight ? `${listMetrics.listHeight}px` : undefined,
          '--tab-height': listMetrics.tabHeight ? `${listMetrics.tabHeight}px` : undefined,
        } as CSSProperties
      }
    >
      {tabs.map((tab) => {
        const isSelected = selectedTab === tab.id;
        const offset = tabOffsets[tab.id] ?? 0;
        const translateY = selectedTab ? -offset : 0;
        const inlineStyle: CSSProperties = {
          zIndex: isSelected ? 10 : 1,
        };

        if (isSelected && selectedTab) {
          inlineStyle.transform = `translateY(${translateY}px)`;
        }

        if (selectedTab && !isSelected) {
          inlineStyle.opacity = 0;
        }

        return (
          <button
            key={tab.id}
            className={`tab-item ${isSelected ? 'selected' : ''}`}
            onClick={() => onSelectTab(tab.id)}
            style={inlineStyle}
            ref={(node) => {
              tabRefs.current[tab.id] = node;
            }}
          >
            <SvgIcon src={tab.icon} alt={tab.label} hoverColor="var(--primary)" size="small" />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
