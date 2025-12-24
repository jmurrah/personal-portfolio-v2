import { useEffect } from 'react';
import { LOGOS } from '@/assets';
import { prefetchBlogPosts } from '@/components/Blog/feedService';
import CurrentTime from '@/components/CurrentTime';
import PrimaryColorSelector from '@/components/PrimaryColorSelector';
import TechnologyBadge from '@/components/TechnologyBadge';
import ThemeToggle from '@/components/ThemeToggle';
import {
  AboutContent,
  BlogContent,
  EducationContent,
  ExperienceContent,
  ProjectsContent,
} from '@/components/TabContent';

const technologies = [
  { name: 'Python', logoSrc: LOGOS.python, accent: 'var(--tech-python)' },
  { name: 'TypeScript', logoSrc: LOGOS.typeScript, accent: 'var(--tech-typescript)' },
  { name: 'React', logoSrc: LOGOS.react, accent: 'var(--tech-react)' },
  { name: 'Java', logoSrc: LOGOS.java, accent: 'var(--tech-java)' },
  { name: 'Go', logoSrc: LOGOS.go, accent: 'var(--tech-go)' },
  { name: 'AWS', logoSrc: LOGOS.aws, accent: 'var(--tech-aws)' },
  {
    name: 'Google Cloud',
    logoSrc: LOGOS.googleCloud,
    accent: 'var(--tech-google-cloud)',
  },
  { name: 'Postman', logoSrc: LOGOS.postman, accent: 'var(--tech-postman)' },
  { name: 'Supabase', logoSrc: LOGOS.supabase, accent: 'var(--tech-supabase)' },
  { name: 'MongoDB', logoSrc: LOGOS.mongoDb, accent: 'var(--tech-mongodb)' },
  { name: 'Git', logoSrc: LOGOS.git, accent: 'var(--tech-git)' },
  { name: 'Docker', logoSrc: LOGOS.docker, accent: 'var(--tech-docker)' },
  { name: 'Tailwind CSS', logoSrc: LOGOS.tailwind, accent: 'var(--tech-tailwind)' },
  { name: 'Spring Boot', logoSrc: LOGOS.spring, accent: 'var(--tech-spring)' },
  { name: 'FastAPI', logoSrc: LOGOS.fastApi, accent: 'var(--tech-fastapi)' },
];

export default function Home() {
  useEffect(() => {
    prefetchBlogPosts();
  }, []);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-wrap items-center gap-4">
        <ThemeToggle />
        <PrimaryColorSelector />
        <CurrentTime />
      </div>

      <section className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold">Technologies</h2>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <TechnologyBadge key={tech.name} {...tech} />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold">About</h2>
        <AboutContent />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold">Experience</h2>
        <ExperienceContent />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold">Education</h2>
        <EducationContent />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold">Projects</h2>
        <ProjectsContent />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold">Blog</h2>
        <BlogContent />
      </section>
    </div>
  );
}
