import SvgIcon from '@/components/SvgIcon';
import { ICONS } from '@/assets';

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
  year: string | number;
  tags?: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export default function ProjectItem({
  status,
  title,
  description,
  year,
  tags = [],
  githubUrl,
  liveUrl,
}: ProjectItemProps) {
  const statusMeta = PROJECT_STATUS_META[status];

  return (
    <div className="flex flex-col border-t-2">
      <div className="flex mt-1 gap-2">
        <div className="flex gap-2 items-center justify-center">
          <span
            aria-label={`${statusMeta.label} project`}
            title={statusMeta.label}
            className="text-sm"
          >
            {statusMeta.icon}
          </span>
          <span className="font-bold">{title}</span>
        </div>
        {githubUrl && (
          <SvgIcon
            href={githubUrl}
            src={ICONS.gitHub}
            alt={`${title} GitHub`}
            size="xsmall"
            color="var(--text-muted)"
            hoverColor="var(--primary)"
          />
        )}
        {liveUrl && (
          <SvgIcon
            href={liveUrl}
            src={ICONS.gitHub}
            alt={`${title} Live`}
            size="xsmall"
            color="var(--text-muted)"
            hoverColor="var(--primary)"
          />
        )}
        <span className="ml-auto font-bold">{year}</span>
      </div>
      <div className="flex flex-col">
        <p className="">{description}</p>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 main">
            {tags.map((tag) => (
              <span key={tag}>#{tag}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
