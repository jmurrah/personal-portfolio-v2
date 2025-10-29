import { useEffect, useMemo, useRef, useState } from 'react';
import { ICONS } from '@/assets';
import ExpandableCard from '@/components/NavCard/Animations/ExpandableCard/ExpandableCard';
import SlidingTabs, {
  type SlidingTabsVariant,
  type Tab,
} from '@/components/NavCard/Animations/SlidingTabs/SlidingTabs';
import { NAV_CARD_ANIMATION } from '@/components/NavCard/animationConfig';
import '@/components/NavCard/NavCard.css';
import {
  AboutContent,
  EducationContent,
  ExperienceContent,
  ProjectsContent,
} from '@/components/NavCard/Content';

interface TabsProps {
  onTabClick: (tabId: string) => void;
  readyToExpand?: boolean;
}

export default function Tabs({ onTabClick, readyToExpand = false }: TabsProps) {
  const [selectedTab, setSelectedTab] = useState<string | null>(null);
  const [isInteractionLocked, setIsInteractionLocked] = useState(false);
  const lockTimeoutRef = useRef<number | null>(null);

  const tabs: Tab[] = useMemo(
    () => [
      { id: 'about', icon: ICONS.profile, label: 'About' },
      { id: 'experience', icon: ICONS.briefcase, label: 'Experience' },
      { id: 'education', icon: ICONS.education, label: 'Education' },
      { id: 'projects', icon: ICONS.project, label: 'Projects' },
      // { id: 'resume', icon: ICONS.fileDownload, label: 'Resume' },
    ],
    [],
  );

  const isExpanded = Boolean(selectedTab) && readyToExpand;

  useEffect(() => {
    return () => {
      if (lockTimeoutRef.current) {
        window.clearTimeout(lockTimeoutRef.current);
      }
    };
  }, []);

  const beginInteractionLock = () => {
    if (lockTimeoutRef.current) {
      window.clearTimeout(lockTimeoutRef.current);
    }

    setIsInteractionLocked(true);
    lockTimeoutRef.current = window.setTimeout(() => {
      setIsInteractionLocked(false);
      lockTimeoutRef.current = null;
    }, NAV_CARD_ANIMATION.interactionLockMs);
  };

  const handleSelectTab = (tabId: string) => {
    if (isInteractionLocked) return;

    if (selectedTab === tabId) {
      beginInteractionLock();
      setSelectedTab(null);
      onTabClick?.('');
      return;
    }

    beginInteractionLock();
    setSelectedTab(tabId);
    onTabClick?.(tabId);
  };

  const renderTabContent = () => {
    if (!selectedTab) return null;

    switch (selectedTab) {
      case 'about':
        return <AboutContent />;
      case 'experience':
        return <ExperienceContent />;
      case 'education':
        return <EducationContent />;
      case 'projects':
        return <ProjectsContent />;
      default:
        return null;
    }
  };

  const renderTabs = (variant: SlidingTabsVariant) => (
    <SlidingTabs
      tabs={tabs}
      selectedTab={selectedTab}
      onSelectTab={handleSelectTab}
      variant={variant}
      showSelection={variant === 'expanded' || !isExpanded}
      isInteractionLocked={isInteractionLocked}
    />
  );

  return (
    <ExpandableCard
      renderTabs={renderTabs}
      expanded={isExpanded}
      initialWidth="192px"
      initialHeight="320px"
      tabContent={renderTabContent()}
      className="ml-auto"
    />
  );
}
