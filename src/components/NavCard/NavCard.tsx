import { useState, useMemo, useRef, useEffect } from 'react';
import SlidingTabs, { type Tab } from '@/components/NavCard/Animations/SlidingTabs/SlidingTabs';
import ExpandableCard from '@/components/NavCard/Animations/ExpandableCard/ExpandableCard';
import '@/components/NavCard/NavCard.css';
import {
  AboutContent,
  ExperienceContent,
  EducationContent,
  ProjectsContent,
} from '@/components/NavCard/Content';

const ANIMATION_DURATION_MS = 1000;

interface TabsProps {
  onTabClick: (tabId: string) => void;
  readyToExpand?: boolean;
}

export default function Tabs({ onTabClick, readyToExpand = false }: TabsProps) {
  const [selectedTab, setSelectedTab] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const closeTimeoutRef = useRef<number | null>(null);

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

  useEffect(() => {
    if (readyToExpand && selectedTab && !isExpanded && !isClosing) {
      console.log('Ready to expand tab:', selectedTab);
      setIsExpanded(true);
    }
  }, [readyToExpand, selectedTab, isExpanded, isClosing]);

  const handleSelectTab = (tabId: string) => {
    if (isClosing) return;
    if (selectedTab === tabId) {
      if (closeTimeoutRef.current) {
        window.clearTimeout(closeTimeoutRef.current);
      }

      setIsClosing(true);
      setIsExpanded(false);

      if (onTabClick) {
        onTabClick(''); // empty tabId indicates closing
      }

      closeTimeoutRef.current = window.setTimeout(() => {
        setSelectedTab(null);
        setIsClosing(false);
      }, ANIMATION_DURATION_MS);

      return;
    }

    if (onTabClick) {
      onTabClick(tabId);
    }

    setSelectedTab(tabId);
  };

  return (
    <ExpandableCard
      expanded={isExpanded}
      className={`${isClosing ? 'closing' : ''} ml-auto`}
      initialWidth="192px"
      initialHeight="320px"
      tabContent={
        selectedTab && (
          <>
            {selectedTab === 'about' && <AboutContent />}
            {selectedTab === 'experience' && <ExperienceContent />}
            {selectedTab === 'education' && <EducationContent />}
            {selectedTab === 'projects' && <ProjectsContent />}
            {/* {selectedTab === 'resume' && <ResumeContent />} */}
          </>
        )
      }
      onAnimationComplete={() => console.log('Animation complete')}
    >
      <SlidingTabs
        tabs={tabs}
        selectedTab={selectedTab}
        onSelectTab={handleSelectTab}
        isExpanded={isExpanded}
        isClosing={isClosing}
      />
    </ExpandableCard>
  );
}
