import { useState, useMemo, useRef, useEffect } from 'react';
import SlidingTabs, { type Tab } from './SlidingTabs/SlidingTabs';
import ExpandableCard from './ExpandableCard/ExpandableCard';
import './Tabs.css';

const CARD_CLOSING_DURATION_MS = 720; // Slightly longer closing animation

interface TabsProps {
  onTabClick?: (tabId: string) => void;
}

export default function Tabs({ onTabClick }: TabsProps) {
  const [selectedTab, setSelectedTab] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const closeTimeoutRef = useRef<number | null>(null);

  // Define our tabs
  const tabs: Tab[] = useMemo(
    () => [
      { id: 'about', icon: '/icons/ProfileIcon.svg', label: 'About' },
      { id: 'experience', icon: '/icons/BriefcaseIcon.svg', label: 'Experience' },
      { id: 'education', icon: '/icons/EducationIcon.svg', label: 'Education' },
      { id: 'projects', icon: '/icons/ProjectIcon.svg', label: 'Projects' },
      { id: 'resume', icon: '/icons/FileDownloadIcon.svg', label: 'Resume' },
    ],
    [],
  );

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        window.clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  // Handle tab selection
  const handleSelectTab = (tabId: string) => {
    // If we're closing, don't respond to clicks
    if (isClosing) return;

    // If clicking the same tab, close it
    if (selectedTab === tabId) {
      if (closeTimeoutRef.current) {
        window.clearTimeout(closeTimeoutRef.current);
      }

      setIsClosing(true);
      setIsExpanded(false);

      // Notify parent about tab closing with null id
      if (onTabClick) {
        onTabClick(''); // empty string indicates closing
      }

      // Use the longer closing duration
      closeTimeoutRef.current = window.setTimeout(() => {
        setSelectedTab(null);
        setIsClosing(false);
      }, CARD_CLOSING_DURATION_MS);

      return;
    }

    // Notify parent about tab click
    if (onTabClick) {
      onTabClick(tabId);
    }

    // Otherwise, select the new tab
    setSelectedTab(tabId);
  };

  // Handle tab animation completion
  const handleTabAnimationComplete = () => {
    if (selectedTab && !isClosing) {
      setIsExpanded(true);
    }
  };

  return (
    <ExpandableCard expanded={isExpanded} className={`${isClosing ? 'closing' : ''} h-full`}>
      <SlidingTabs
        tabs={tabs}
        selectedTab={selectedTab}
        onSelectTab={handleSelectTab}
        onAnimationComplete={handleTabAnimationComplete}
      />
    </ExpandableCard>
  );
}
