type StatusMeta = {
  label: string;
  summary: string;
};

export const PROJECT_STATUS = {
  ACTIVE: 'active',
  PASSIVE: 'passive',
  SHUTDOWN: 'shutdown',
} as const;

export type ProjectStatus = (typeof PROJECT_STATUS)[keyof typeof PROJECT_STATUS];

export const PROJECT_STATUS_META: Record<ProjectStatus, StatusMeta> = {
  [PROJECT_STATUS.ACTIVE]: { label: 'Active', summary: 'Currently developing' },
  [PROJECT_STATUS.PASSIVE]: { label: 'Passive', summary: 'Maintenance only' },
  [PROJECT_STATUS.SHUTDOWN]: { label: 'Shut Down', summary: 'No longer supported' },
};

export const PROJECT_STATUS_COLOR_VARS: Record<ProjectStatus, string> = {
  [PROJECT_STATUS.ACTIVE]: 'var(--status-active)',
  [PROJECT_STATUS.PASSIVE]: 'var(--status-passive)',
  [PROJECT_STATUS.SHUTDOWN]: 'var(--status-shutdown)',
};

export interface ProjectItemProps {
  status: ProjectStatus;
  title: string;
  description: string;
  year: number;
  featured?: boolean;
  writeupPath?: string;
  tags?: string[];
  githubUrl?: string;
  liveUrl?: string;
}
