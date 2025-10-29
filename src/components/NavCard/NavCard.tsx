import { useMemo, useState } from 'react';
import ExpandableCard from '@/components/NavCard/Animations/ExpandableCard/ExpandableCard';
import SlidingTabs, {
  type SlidingTabsVariant,
  type Tab,
} from '@/components/NavCard/Animations/SlidingTabs/SlidingTabs';
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

  const tabs: Tab[] = useMemo(
    () => [
      { id: 'about', icon: '/icons/ProfileIcon.svg', label: 'About' },
      { id: 'experience', icon: '/icons/BriefcaseIcon.svg', label: 'Experience' },
      { id: 'education', icon: '/icons/EducationIcon.svg', label: 'Education' },
      { id: 'projects', icon: '/icons/ProjectIcon.svg', label: 'Projects' },
      // { id: 'resume', icon: '/icons/FileDownloadIcon.svg', label: 'Resume' },
    ],
    [],
  );

  const isExpanded = Boolean(selectedTab) && readyToExpand;

  const handleSelectTab = (tabId: string) => {
    if (selectedTab === tabId) {
      setSelectedTab(null);
      onTabClick?.('');
      return;
    }

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
