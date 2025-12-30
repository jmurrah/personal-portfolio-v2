type StatusMeta = {
  icon: string;
  label: string;
  summary: string;
};

export const PROJECT_STATUS_META = {
  active: { icon: '🟢', label: 'Active', summary: 'Currently developing' },
  passive: { icon: '🟡', label: 'Passive', summary: 'Running but not developing' },
  shutdown: { icon: '🔴', label: 'Shut Down', summary: 'No longer running' },
} as const satisfies Record<string, StatusMeta>;

export type ProjectStatus = keyof typeof PROJECT_STATUS_META;

export interface ProjectItemProps {
  status: ProjectStatus;
  title: string;
  description: string;
  year: string;
  tags?: string[];
  githubUrl?: string;
  liveUrl?: string;
}
