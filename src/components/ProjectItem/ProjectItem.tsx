import SvgIcon from '@/components/SvgIcon';
import { ICONS } from '@/assets';
import TagList from '@/components/TagList';
import { useAccentColors } from '@/hooks/useAccentColors';
import { PROJECT_STATUS_META, type ProjectItemProps } from './projectStatus';

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
  const { getMutedAccentColor } = useAccentColors();

  return (
    <div className="flex flex-col border-t-2 border-[var(--border)]">
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
            className="project-links"
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
            className="project-links"
          />
        )}
        <span className="ml-auto font-bold">{year}</span>
      </div>
      <div className="flex flex-col">
        <p className="">{description}</p>
        {tags.length > 0 && (
          <TagList
            tags={tags}
            getAccentColor={getMutedAccentColor}
            className="mt-1 text-sm text-[var(--text-muted)]"
          />
        )}
      </div>
    </div>
  );
}
