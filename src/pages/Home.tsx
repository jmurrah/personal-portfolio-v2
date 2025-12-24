import { useEffect } from 'react';
import { LOGOS } from '@/assets';
import { prefetchBlogPosts } from '@/components/Blog/feedService';
import CurrentTime from '@/components/CurrentTime';
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
  { name: 'Python', logoSrc: LOGOS.python, accent: 'rgba(53, 114, 165, 0.2)' },
  { name: 'TypeScript', logoSrc: LOGOS.typeScript, accent: 'rgba(49, 120, 198, 0.2)' },
  { name: 'React', logoSrc: LOGOS.react, accent: 'rgba(97, 218, 251, 0.2)' },
  { name: 'Java', logoSrc: LOGOS.java, accent: 'rgba(244, 117, 87, 0.2)' },
  { name: 'Go', logoSrc: LOGOS.go, accent: 'rgba(0, 173, 216, 0.2)' },
  { name: 'AWS', logoSrc: LOGOS.aws, accent: 'rgba(255, 153, 0, 0.2)' },
  {
    name: 'Google Cloud',
    logoSrc: LOGOS.googleCloud,
    accent: 'rgba(66, 133, 244, 0.2)',
  },
  { name: 'Postman', logoSrc: LOGOS.postman, accent: 'rgba(255, 108, 55, 0.2)' },
  { name: 'Supabase', logoSrc: LOGOS.supabase, accent: 'rgba(63, 207, 142, 0.2)' },
  { name: 'MongoDB', logoSrc: LOGOS.mongoDb, accent: 'rgba(89, 150, 54, 0.2)' },
  { name: 'Git', logoSrc: LOGOS.git, accent: 'rgba(241, 80, 47, 0.2)' },
  { name: 'Docker', logoSrc: LOGOS.docker, accent: 'rgba(0, 130, 202, 0.2)' },
  { name: 'Tailwind CSS', logoSrc: LOGOS.tailwind, accent: 'rgba(56, 189, 248, 0.2)' },
  { name: 'Spring Boot', logoSrc: LOGOS.spring, accent: 'rgba(109, 179, 63, 0.2)' },
  { name: 'FastAPI', logoSrc: LOGOS.fastApi, accent: 'rgba(5, 153, 139, 0.2)' },
];

export default function Home() {
  useEffect(() => {
    prefetchBlogPosts();
  }, []);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-wrap items-center gap-4">
        <ThemeToggle />
        <CurrentTime />
      </div>

      <section className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold text-[var(--text)]">Technologies</h2>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <TechnologyBadge key={tech.name} {...tech} />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold text-[var(--text)]">About</h2>
        <AboutContent />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold text-[var(--text)]">Experience</h2>
        <ExperienceContent />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold text-[var(--text)]">Education</h2>
        <EducationContent />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold text-[var(--text)]">Projects</h2>
        <ProjectsContent />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold text-[var(--text)]">Blog</h2>
        <BlogContent />
      </section>
    </div>
  );
}
