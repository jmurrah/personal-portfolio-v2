import ProjectItem from '@/components/ProjectItem/ProjectItem';
import {
  PROJECT_STATUS_META,
  type ProjectItemProps,
  type ProjectStatus,
} from '@/components/ProjectItem/projectStatus';

const projectList: ProjectItemProps[] = [
  {
    status: 'active',
    title: 'Portfolio v2',
    description: 'The site you are browsing right now. Built with React',
    year: '2025',
    tags: ['React', 'TypeScript', 'Motion'],
    githubUrl: 'https://github.com/jacobmurrah/personal-portfolio-v2',
    liveUrl: 'https://murrah.dev',
  },
  {
    status: 'passive',
    title: 'Atlas Runner',
    description: 'Workflow automation for ingesting',
    year: '2024',
    tags: ['Python', 'Supabase', 'Automation'],
    githubUrl: 'https://github.com/jacobmurrah/atlas-runner',
    liveUrl: 'https://atlas-runner.app',
  },
  {
    status: 'shutdown',
    title: 'Signal Lantern',
    description: 'A small SaaS that summarized pager',
    year: '2023',
    tags: ['Go', 'Postgres', 'SaaS'],
    githubUrl: 'https://github.com/jacobmurrah/signal-lantern',
  },
];

const statusOrder: ProjectStatus[] = ['active', 'passive', 'shutdown'];

const statusCounts = projectList.reduce(
  (acc, project) => {
    acc[project.status] += 1;
    return acc;
  },
  statusOrder.reduce(
    (acc, status) => ({ ...acc, [status]: 0 }),
    {} as Record<ProjectStatus, number>,
  ),
);

const totalProjects = projectList.length;

export default function ProjectsContent() {
  return (
    <div className="flex flex-col">
      <section>
        <p className="mb-2">
          A running list of things I&apos;ve built, shipped, or safely retired.
        </p>
        <p>
          <span className="font-bold">Total Projects:</span> {totalProjects}
        </p>
        <ul className="flex flex-col gap-1 mt-2">
          {statusOrder.map((status) => {
            const meta = PROJECT_STATUS_META[status];

            return (
              <li key={status}>
                <span className="text-sm">{meta.icon}</span>
                <span className="font-bold"> {meta.label}:</span> {statusCounts[status]}
                <span> - {meta.summary}</span>
              </li>
            );
          })}
        </ul>
      </section>

      <div className="flex flex-col gap-7 mt-12">
        {projectList.map((project) => (
          <ProjectItem key={`${project.title}-${project.year}`} {...project} />
        ))}
      </div>
    </div>
  );
}
