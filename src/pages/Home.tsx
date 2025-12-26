import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { prefetchBlogPosts } from '@/components/Blog/feedService';
import PrimaryColorSelector from '@/components/PrimaryColorSelector';
import SvgIcon from '@/components/SvgIcon';
import { PHOTOS, ICONS } from '@/assets';
import ThemeToggle from '@/components/ThemeToggle';
import { ExperienceContent } from '@/components/TabContent';

export default function Home() {
  const headerRowRef = useRef<HTMLDivElement | null>(null);
  const headshotRef = useRef<HTMLImageElement | null>(null);
  const headerContentRef = useRef<HTMLDivElement | null>(null);
  const [isHeaderWrapped, setIsHeaderWrapped] = useState(false);

  const updateHeaderWrap = useCallback(() => {
    const image = headshotRef.current;
    const content = headerContentRef.current;
    if (!image || !content) return;
    const wrapped = content.offsetTop > image.offsetTop + 1;
    setIsHeaderWrapped((prev) => (prev === wrapped ? prev : wrapped));
  }, []);

  useEffect(() => {
    prefetchBlogPosts();
  }, []);

  useLayoutEffect(() => {
    updateHeaderWrap();
  }, [updateHeaderWrap]);

  useLayoutEffect(() => {
    const container = headerRowRef.current;
    if (!container || typeof ResizeObserver === 'undefined') return;
    let frame = 0;
    const handle = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateHeaderWrap);
    };
    const observer = new ResizeObserver(handle);
    observer.observe(container);
    window.addEventListener('resize', handle);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handle);
      cancelAnimationFrame(frame);
    };
  }, [updateHeaderWrap]);

  return (
    <div className="flex flex-wrap gap-10">
      <div ref={headerRowRef} className="w-full flex flex-wrap gap-4 justify-center">
        <img ref={headshotRef} className="w-auto h-24 rounded-lg" src={PHOTOS.graduationHeadshot} />
        <div
          ref={headerContentRef}
          className={`flex flex-col gap-y-1.5 ${isHeaderWrapped ? 'items-center' : 'items-start'}`}
        >
          <h1 className="text-3xl text-[var(--primary)]">Jacob Murrah</h1>
          <div className="flex gap-x-4 flex-wrap">
            <div className="flex gap-1 items-center">
              <SvgIcon
                src={ICONS.mapPin}
                alt="Location"
                size="2xsmall"
                color="var(--text-muted)"
                hoverColor="var(--primary)"
              />
              <p className="text-[var(--text-muted)]">Atlanta, GA</p>
            </div>
            <div className="flex gap-1 items-center">
              <SvgIcon
                src={ICONS.code}
                alt="Specialty"
                size="small"
                color="var(--text-muted)"
                hoverColor="var(--primary)"
              />
              <p className="text-[var(--text-muted)]">Full-Stack Developer</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-x-4">
            {[
              { label: 'email', href: 'mailto:jacob@murrah.dev' },
              { label: 'github', href: 'https://github.com/jmurrah' },
              { label: 'linkedin', href: 'https://www.linkedin.com/in/jacobmurrah/' },
              { label: 'resume', href: '/JacobMurrahResume.pdf' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group gap-0.5 flex items-center text-[color:var(--text-muted)] transition-all duration-200 hover:text-[color:var(--text)]"
              >
                <span className="transition-colors duration-200">{link.label}</span>
                <SvgIcon
                  src={ICONS.arrowUpRight}
                  alt={`${link.label} link`}
                  size="xsmall"
                  color="currentColor"
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-xl mb-1 font-bold">About</h2>
        <div className="flex flex-col gap-2">
          <p>
            I specialize in <span className="font-bold">full-stack</span> development and build
            applications that prioritize <span className="font-bold">simplicity</span> and{' '}
            <span className="font-bold">efficiency</span>. My experience in{' '}
            <span className="font-bold">machine learning</span> and{' '}
            <span className="font-bold">system design</span> allows me to create{' '}
            <span className="font-bold">intelligent</span> and{' '}
            <span className="font-bold">scalable</span> systems.
          </p>
          <p>When I'm not coding, I enjoy hanging out with my wife and cats!</p>
        </div>
      </div>
      <div>
        <h2 className="text-xl mb-1 font-bold">Currently</h2>
        <div className="flex flex-col gap-1">
          <p>
            Software Engineer I @{' '}
            <a href="https://www.att.com/" target="_blank" rel="noopener noreferrer">
              <span className="underline-fill">AT&T</span>
            </a>
          </p>
          <p>
            OMSCS @{' '}
            <a href="https://www.gatech.edu/" target="_blank" rel="noopener noreferrer">
              <span className="underline-fill">Georgia Tech</span>
            </a>
          </p>
        </div>
      </div>
      <div className="flex flex-col max-w-sm w-full">
        <h2 className="text-xl mb-1 font-bold">Education</h2>
        <div className="flex flex-col gap-1 w-full">
          <div>
            <p>Georgia Institute of Technology</p>
            <div className="flex justify-between items-center gap-x-8">
              <p className="text-sm text-[var(--text-muted)]">M.S. in Computer Science</p>
              <p className="text-sm text-[var(--text-muted)]">Dec. 2028</p>
            </div>
          </div>
          <div>
            <p>Auburn University</p>
            <div className="flex justify-between items-center gap-x-8">
              <p className="text-sm text-[var(--text-muted)]">B.E. in Software Engineering</p>
              <p className="text-sm text-[var(--text-muted)]">Dec. 2025</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col max-w-sm w-full">
        <h2 className="text-xl mb-1 font-bold">Technologies</h2>
        <div className="flex flex-col gap-1 w-full">
        </div>
      </div>
      <div className="w-full max-w-xs flex flex-col gap-2">
        <h2 className="flex items-center gap-2 text-xl">
          <SvgIcon src={ICONS.paint} alt="Theme" size="medium" color="var(--primary)" />
          <span>Theme</span>
        </h2>
        <ThemeToggle />
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1 w-full">
            <p>Primary Color:</p>
            <PrimaryColorSelector tileSize={28} gap="0.75rem" />
          </div>
        </div>
      </div>
      {/* <section className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold">Experience</h2>
        <ExperienceContent />
      </section> */}
      {/* <div className="h-20 w-30">
        <h2>Theme</h2>
        <PrimaryColorSelector tileSize={28} gap="0.75rem" />
      </div> */}
      {/* <div className="flex flex-wrap items-center gap-4">
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
      </section> */}
    </div>
  );
}
