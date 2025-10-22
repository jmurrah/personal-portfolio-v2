import { useLayoutEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import Card from '@/components/Card';
import SvgIcon from '@/components/SvgIcon';
import './Tabs.css';

type Tab = {
  id: string;
  icon: string;
  label: string;
};

export default function Tabs() {
  const [selectedTab, setSelectedTab] = useState<string | null>(null);
  const [tabOffsets, setTabOffsets] = useState<Record<string, number>>({});
  const [listMetrics, setListMetrics] = useState<{ listHeight: number; tabHeight: number }>({
    listHeight: 0,
    tabHeight: 0,
  });
  const listRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Define our tabs
  const tabs: Tab[] = useMemo(
    () => [
      { id: 'about', icon: '/icons/ProfileIcon.svg', label: 'About' },
      { id: 'experience', icon: '/icons/BriefcaseIcon.svg', label: 'Experience' },
      { id: 'education', icon: '/icons/EducationIcon.svg', label: 'Education' },
      { id: 'projects', icon: '/icons/ProjectIcon.svg', label: 'Projects' },
      { id: 'resume', icon: '/icons/FileDownloadIcon.svg', label: 'Resume' },
    ],
    []
  );

  // Handle tab selection
  const handleSelectTab = (tabId: string) => {
    setSelectedTab((current) => current === tabId ? null : tabId);
  };

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

      if (!Object.keys(offsets).length) {
        setListMetrics((previous) => {
          if (
            previous.listHeight === nextListHeight &&
            previous.tabHeight === measuredTabHeight
          ) {
            return previous;
          }

          return {
            listHeight: nextListHeight,
            tabHeight: measuredTabHeight,
          };
        });
        return;
      }

      setTabOffsets((previous) => {
        const hasChanges = tabs.some(
          (tab) => previous[tab.id] !== offsets[tab.id]
        );

        return hasChanges ? offsets : previous;
      });

      setListMetrics((previous) => {
        if (
          previous.listHeight === nextListHeight &&
          previous.tabHeight === measuredTabHeight
        ) {
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
  }, [tabs]);
  
  return (
    <Card className="tabs-container">
      <div 
        ref={listRef}
        className={`tabs-list ${selectedTab ? 'tab-selected' : ''}`}
        style={{ 
          '--animation-duration': '650ms',
          '--list-height': listMetrics.listHeight ? `${listMetrics.listHeight}px` : undefined,
          '--tab-height': listMetrics.tabHeight ? `${listMetrics.tabHeight}px` : undefined,
        } as CSSProperties}
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
              onClick={() => handleSelectTab(tab.id)}
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
    </Card>
  );
}
