import { useState, type ReactNode } from 'react';
import {
  AboutContent,
  ExperienceContent,
  EducationContent,
  ProjectsContent,
  BlogContent,
} from '@/components/TabContent';
import './SimpleTabs.css';

type TabId = 'about' | 'experience' | 'education' | 'projects' | 'blog';

interface TabDefinition {
  id: TabId;
  label: string;
  render: () => ReactNode;
}

const tabs: TabDefinition[] = [
  { id: 'about', label: 'About', render: () => <AboutContent /> },
  { id: 'experience', label: 'Experience', render: () => <ExperienceContent /> },
  { id: 'education', label: 'Education', render: () => <EducationContent /> },
  { id: 'projects', label: 'Projects', render: () => <ProjectsContent /> },
  { id: 'blog', label: 'Blog', render: () => <BlogContent /> },
];

export default function SimpleTabs() {
  const [activeTab, setActiveTab] = useState<TabId>('about');
  const activeDefinition = tabs.find((tab) => tab.id === activeTab) ?? tabs[0];

  return (
    <div className="simple-tabs">
      <div className="simple-tabs__nav" role="tablist" aria-label="Section Navigation">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`tab-panel-${tab.id}`}
              className={`simple-tabs__tab ${isActive ? 'is-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="simple-tabs__label">{tab.label}</span>
              <span className="simple-tabs__underline" aria-hidden="true" />
            </button>
          );
        })}
      </div>
      <div id={`tab-panel-${activeDefinition.id}`} role="tabpanel" className="simple-tabs__panel">
        <h2 className="text-2xl font-semibold text-[color:var(--text)] capitalize mb-2">
          {activeDefinition.label}
        </h2>
        {activeDefinition.render()}
      </div>
    </div>
  );
}
