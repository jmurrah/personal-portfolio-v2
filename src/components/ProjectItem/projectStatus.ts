type StatusMeta = {
  icon: string;
  label: string;
  summary: string;
};

export type ProjectStatus = 'active' | 'passive' | 'shutdown';

export const PROJECT_STATUS_META: Record<ProjectStatus, StatusMeta> = {
  active: { icon: '🟢', label: 'Active', summary: 'Currently developing' },
  passive: { icon: '🟡', label: 'Passive', summary: 'Running but not developing' },
  shutdown: { icon: '⚪', label: 'Shut Down', summary: 'No longer running' },
};

export interface ProjectItemProps {
  status: ProjectStatus;
  title: string;
  description: string;
  year: string;
  tags?: string[];
  githubUrl?: string;
  liveUrl?: string;
}
