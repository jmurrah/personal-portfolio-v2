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
  isExpanded?: boolean;
}

const TAB_SLIDE_DURATION_MS = 520;
const SELECTED_TAB_SCALE = 1.12;

export default function SlidingTabs({
  tabs,
  selectedTab,
  onSelectTab,
  onAnimationComplete,
  isExpanded = false,
}: SlidingTabsProps) {
  const [tabOffsets, setTabOffsets] = useState<Record<string, number>>({});
  const [listMetrics, setListMetrics] = useState<{ listHeight: number; tabHeight: number }>({
    listHeight: 0,
    tabHeight: 0,
  });
  const [scaledTabId, setScaledTabId] = useState<string | null>(null);
  const [hiddenTabIds, setHiddenTabIds] = useState<Record<string, boolean>>({});
  const [collapseComplete, setCollapseComplete] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const hideTimeoutRef = useRef<number | null>(null);

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

  useEffect(() => {
    setScaledTabId((current) => {
      if (!selectedTab || !isExpanded) {
        return current !== null ? null : current;
      }

      return current === selectedTab ? current : selectedTab;
    });
  }, [selectedTab, isExpanded]);

  useEffect(() => {
    if (hideTimeoutRef.current) {
      window.clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }

    if (!selectedTab || !isExpanded) {
      setHiddenTabIds((previous) => (Object.keys(previous).length ? {} : previous));
      setCollapseComplete(false);
      return;
    }

    setCollapseComplete(false);

    setHiddenTabIds((previous) => (Object.keys(previous).length ? {} : previous));

    hideTimeoutRef.current = window.setTimeout(() => {
      setHiddenTabIds(
        tabs.reduce<Record<string, boolean>>((accumulator, tab) => {
          if (tab.id !== selectedTab) {
            accumulator[tab.id] = true;
          }
          return accumulator;
        }, {}),
      );
      setCollapseComplete(true);
      hideTimeoutRef.current = null;
    }, TAB_SLIDE_DURATION_MS);

    return () => {
      if (hideTimeoutRef.current) {
        window.clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = null;
      }
    };
  }, [selectedTab, isExpanded, tabs]);

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
        const shouldScale = scaledTabId === tab.id;
        const inlineStyle: CSSProperties = {
          zIndex: isSelected ? 10 : 1,
        };
        const transforms: string[] = [];

        const shouldTranslate = selectedTab && isSelected;

        if (shouldTranslate) {
          const translateValue = collapseComplete ? 0 : translateY;
          transforms.push(`translateY(${translateValue}px)`);
        }

        if (shouldScale) {
          transforms.push(`scale(${SELECTED_TAB_SCALE})`);
        }

        if (transforms.length) {
          inlineStyle.transform = transforms.join(' ');
        }

        if (selectedTab && !isSelected) {
          inlineStyle.opacity = 0;
          inlineStyle.pointerEvents = 'none';
        }

        if (hiddenTabIds[tab.id]) {
          inlineStyle.display = 'none';
        }

        const buttonClasses = [
          'tab-item',
          isSelected ? 'selected' : '',
          shouldScale ? 'scaled' : '',
          collapseComplete && isSelected ? 'no-transform-transition' : '',
        ]
          .filter(Boolean)
          .join(' ');

        return (
          <button
            key={tab.id}
            className={buttonClasses}
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
