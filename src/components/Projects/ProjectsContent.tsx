import ProjectItem from '@/components/ProjectItem/ProjectItem';
import {
  PROJECT_STATUS_COLOR_VARS,
  PROJECT_STATUS_META,
  PROJECT_STATUS,
  type ProjectItemProps,
  type ProjectStatus,
} from '@/components/ProjectItem/projectStatus';
import { PROJECTS } from '@/constants/projects';

const STATUS_ORDER: ProjectStatus[] = [
  PROJECT_STATUS.ACTIVE,
  PROJECT_STATUS.PASSIVE,
  PROJECT_STATUS.SHUTDOWN,
];

const FEATURED_PROJECTS = PROJECTS.filter((project) => project.featured);

const initializeStatusCounts = (): Record<ProjectStatus, number> =>
  STATUS_ORDER.reduce(
    (acc, status) => {
      acc[status] = 0;
      return acc;
    },
    {} as Record<ProjectStatus, number>,
  );

const buildStatusCounts = (projects: ProjectItemProps[]) =>
  projects.reduce((acc, project) => {
    acc[project.status] += 1;
    return acc;
  }, initializeStatusCounts());

const STATUS_COUNTS = buildStatusCounts(PROJECTS);
const TOTAL_PROJECTS = PROJECTS.length;

const PROJECTS_BY_YEAR = PROJECTS.reduce<Record<number, ProjectItemProps[]>>((acc, project) => {
  const year = project.year;
  acc[year] = acc[year] ?? [];
  acc[year].push(project);
  return acc;
}, {});

const SORTED_YEARS = Object.keys(PROJECTS_BY_YEAR)
  .map((year) => Number(year))
  .sort((a, b) => b - a);

export default function ProjectsContent() {
  return (
    <div className="flex flex-col gap-10">
      <section>
        <p className="text-lg">
          <span className="font-semibold">Total Projects:</span> {TOTAL_PROJECTS}
        </p>
        <ul className="flex flex-col mt-1">
          {STATUS_ORDER.map((status) => {
            const meta = PROJECT_STATUS_META[status];
            const statusColor = PROJECT_STATUS_COLOR_VARS[status];

            return (
              <li key={status} className="flex items-center gap-2">
                <div
                  className="ml-0.5 self-stretch my-1 shrink-0"
                  style={{ backgroundColor: statusColor, width: '5px' }}
                  aria-hidden
                ></div>
                <span className="font-semibold"> {meta.label}:</span>
                <span>{STATUS_COUNTS[status]}</span>
                <span>- {meta.summary}</span>
              </li>
            );
          })}
        </ul>
      </section>

      {FEATURED_PROJECTS.length > 0 ? (
        <section className="flex flex-col">
          <h2 className="mb-2 text-xl font-semibold border-b-2 border-[color:var(--border)]">
            Featured
          </h2>
          <div className="flex flex-col gap-3">
            {FEATURED_PROJECTS.map((project) => (
              <ProjectItem key={`${project.title}-${project.year}`} {...project} />
            ))}
          </div>
        </section>
      ) : null}

      <div className="flex flex-col gap-10">
        {SORTED_YEARS.map((year) => (
          <section key={year} className="flex flex-col">
            <h3 className="mb-2 text-xl font-semibold border-b-2 border-[color:var(--border)]">
              {year}
            </h3>
            <div className="flex flex-col gap-3">
              {PROJECTS_BY_YEAR[year].map((project) => (
                <ProjectItem key={`${project.title}-${project.year}`} {...project} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
