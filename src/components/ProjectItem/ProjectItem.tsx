import SvgIcon from '@/components/SvgIcon';
import { ICONS } from '@/assets';
import TagList from '@/components/TagList';
import './ProjectItem.css';
import { PROJECT_STATUS_COLOR_VARS, type ProjectItemProps } from './projectStatus';

type ProjectItemSize = 'base' | 'large';
type ProjectItemViewProps = ProjectItemProps & { size?: ProjectItemSize; showStatusBar?: boolean };

export default function ProjectItem({
  size = 'large',
  status,
  title,
  description,
  tags = [],
  githubUrl,
  liveUrl,
  writeupPath,
  showStatusBar = true,
}: ProjectItemViewProps) {
  const statusColor = PROJECT_STATUS_COLOR_VARS[status];
  const hasTags = tags.length > 0;
  const hasLinks = Boolean(githubUrl || liveUrl || writeupPath);
  const titleClass = size === 'large' ? 'text-lg' : 'text-base';
  const descriptionClass =
    size === 'large' ? 'text-[var(--text-muted)]' : 'text-sm text-[var(--text-muted)]';
  const linksTextClass = size === 'large' ? 'text-[var(--text)]' : 'text-sm text-[var(--text)]';

  return (
    <div className="flex items-center gap-2">
      {showStatusBar ? (
        <div
          className="status-bar self-stretch shrink-0"
          style={{ backgroundColor: statusColor, width: '5px' }}
          aria-hidden
        ></div>
      ) : null}
      <div className="flex flex-col w-full">
        <div className="flex gap-2 justify-between">
          <div className="flex gap-2 items-center justify-center">
            <span className={titleClass}>{title}</span>
          </div>
          {hasLinks ? (
            <div className={`text-[var(--text)] flex items-center gap-3 ${linksTextClass}`}>
              {githubUrl ? (
                <a
                  className="arrow-link group flex items-center gap-0.5"
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(event) => event.stopPropagation()}
                >
                  <span>github</span>
                  <SvgIcon
                    src={ICONS.arrowUpRight}
                    alt="External link arrow"
                    size="2xsmall"
                    color="currentColor"
                    className="arrow-link__icon transition-transform duration-150 group-hover:translate-x-0.5"
                  />
                </a>
              ) : null}
              {liveUrl ? (
                <a
                  className="arrow-link group flex items-center gap-0.5"
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(event) => event.stopPropagation()}
                >
                  <span>live</span>
                  <SvgIcon
                    src={ICONS.arrowUpRight}
                    alt="External link arrow"
                    size="2xsmall"
                    color="currentColor"
                    className="arrow-link__icon transition-transform duration-150 group-hover:translate-x-0.5"
                  />
                </a>
              ) : null}
              {writeupPath ? (
                <a
                  className="arrow-link group flex items-center gap-0.5"
                  href={writeupPath}
                  onClick={(event) => event.stopPropagation()}
                >
                  <span>writeup</span>
                  <SvgIcon
                    src={ICONS.arrowRight}
                    alt="Writeup link arrow"
                    size="2xsmall"
                    color="currentColor"
                    className="arrow-link__icon transition-transform duration-150 group-hover:translate-x-0.5"
                  />
                </a>
              ) : null}
            </div>
          ) : null}
        </div>
        <div className="flex flex-col">
          <p className={descriptionClass}>{description}</p>
          {hasTags ? (
            <TagList
              tags={tags}
              className="mt-1 text-xs text-[var(--text-muted)]"
              tagClassName=""
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
