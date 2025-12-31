import { useMemo, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import SvgIcon from '@/components/SvgIcon';
import { PHOTOS, ICONS } from '@/assets';
import ThemeFontToggle from '@/components/ThemeFontToggle';
import TagList from '@/components/TagList';
import { useAccentColors } from '@/hooks/useAccentColors';
import { getCachedBlogPosts } from '@/components/Blog/feedService';
import { getPostPath, getPostSlug } from '@/components/Blog/postRouting';
import type { FeedPost } from '@/components/Blog/types';
import ProjectItem from '@/components/ProjectItem/ProjectItem';
import { PROJECTS } from '@/constants/projects';

type HeroLink = { label: string; href: string };
type EducationItem = { school: string; degree: string; graduation: string };
type ExperienceItem = {
  company: string;
  location: string;
  role: string;
  dates: string;
  summary: string;
  tags: string[];
};
type ContactLink = { label: string; href: string; display: string };

const HERO_LINKS: HeroLink[] = [
  { label: 'email', href: 'mailto:jacob@murrah.dev' },
  { label: 'linkedin', href: 'https://www.linkedin.com/in/jacobmurrah/' },
  { label: 'github', href: 'https://github.com/jmurrah' },
  { label: 'resume', href: '/JacobMurrahResume.pdf' },
];

const EDUCATION: EducationItem[] = [
  {
    school: 'Georgia Institute of Technology',
    degree: 'M.S. in Computer Science',
    graduation: 'Dec. 2028',
  },
  { school: 'Auburn University', degree: 'B.E. in Software Engineering', graduation: 'Dec. 2025' },
];

const EXPERIENCES: ExperienceItem[] = [
  {
    company: 'AT&T',
    location: 'Atlanta, GA',
    role: 'Software Engineer I',
    dates: 'Jan. 2026 - Present',
    summary: 'Incoming January 2026.',
    tags: ['Python', 'TypeScript', 'Java', 'Docker', 'MongoDB', 'SQL', 'Azure'],
  },
  {
    company: 'Auburn University',
    location: 'Auburn, AL',
    role: 'Undergraduate Research Assistant',
    dates: 'Aug. 2025 - Dec. 2025',
    summary: 'Worked with Dr. Rongxuan (Raphael) Wang in the AMICS lab.',
    tags: ['TypeScript', 'NextJS', 'Python', 'Docker', 'Supabase', 'Vercel', 'CAD'],
  },
  {
    company: 'AT&T',
    location: 'Atlanta, GA',
    role: 'Software Engineer Intern',
    dates: 'Jun. 2025 - Aug. 2025',
    summary: 'Cricket Wireless web application for monitoring store inventory.',
    tags: ['TypeScript', 'React', 'Java', 'Spring Boot', 'Figma', 'Docker', 'MongoDB'],
  },
  {
    company: 'Adtran',
    location: 'Huntsville, AL',
    role: 'Software Engineer Co-op',
    dates: 'May 2023 - Dec. 2024',
    summary: 'Developer tooling and Mosaic One SaaS for network monitoring.',
    tags: ['Python', 'TypeScript', 'Angular', 'Docker', 'SQL', 'AWS'],
  },
];

const CONTACT_LINKS: ContactLink[] = [
  { label: 'email', href: 'mailto:jacob@murrah.dev', display: 'jacob@murrah.dev' },
  { label: 'linkedin', href: 'https://www.linkedin.com/in/jacobmurrah/', display: 'jacobmurrah' },
  { label: 'github', href: 'https://github.com/jmurrah', display: 'jmurrah' },
];

const FEATURED_PROJECTS = PROJECTS.filter((project) => project.featured);

const formatDate = (value?: string | null): string => {
  const text = value ?? '';
  if (!text) return '';
  const parsed = new Date(text);
  return Number.isNaN(parsed.getTime()) ? text : parsed.toLocaleDateString();
};

const getPostId = (post: FeedPost, slug: string): string => post.guid ?? post.link ?? slug;

function HeroSection() {
  return (
    <div className="w-full flex flex-col sm:flex-row gap-4 justify-center items-center sm:items-start mb-6 text-center sm:text-left">
      <img
        className="w-auto h-24 rounded-lg"
        src={PHOTOS.graduationHeadshot}
        alt="Portrait of Jacob Murrah"
        width={96}
        height={96}
        decoding="async"
        fetchPriority="high"
      />
      <div className="flex flex-col gap-y-1.5 items-center sm:items-start w-full sm:w-auto">
        <h1 className="text-3xl text-[var(--primary)]">Jacob Murrah</h1>
        <div className="flex gap-x-4 flex-wrap justify-center sm:justify-start">
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
              alt="Code icon"
              size="small"
              color="var(--text-muted)"
              hoverColor="var(--primary)"
            />
            <p className="text-[var(--text-muted)]">Full-Stack Developer</p>
          </div>
          <div className="flex gap-1 items-center">
            <SvgIcon
              src={ICONS.calendar}
              alt="Calendar icon"
              size="2xsmall"
              color="var(--text-muted)"
              hoverColor="var(--primary)"
            />
            <p className="text-[var(--text-muted)]">2+ YoE</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-x-4 justify-center sm:justify-start">
          {HERO_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="arrow-link group gap-0.5 flex items-center"
            >
              <span>{link.label}</span>
              <SvgIcon
                src={ICONS.arrowUpRight}
                alt="External link arrow"
                size="xsmall"
                color="currentColor"
                className="arrow-link__icon transition-transform duration-150 group-hover:translate-x-0.5"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function AboutSection({ accentColor }: { accentColor: string }) {
  const accentStyle = { '--accent-underline-color': accentColor } as CSSProperties;
  return (
    <div>
      <h2 className="text-xl mb-1 font-semibold">About</h2>
      <div className="flex flex-col gap-2">
        <p className="text-[var(--text-muted)]">
          I specialize in{' '}
          <span className="accent-underline" style={accentStyle}>
            full-stack development
          </span>{' '}
          and build applications that prioritize{' '}
          <span className="accent-underline" style={accentStyle}>
            simplicity
          </span>{' '}
          and{' '}
          <span className="accent-underline" style={accentStyle}>
            efficiency
          </span>
          . My experience in{' '}
          <span className="accent-underline" style={accentStyle}>
            machine learning
          </span>{' '}
          and{' '}
          <span className="accent-underline" style={accentStyle}>
            system design
          </span>{' '}
          enables me to create{' '}
          <span className="accent-underline" style={accentStyle}>
            intelligent
          </span>{' '}
          and{' '}
          <span className="accent-underline" style={accentStyle}>
            scalable
          </span>{' '}
          systems.
        </p>
      </div>
    </div>
  );
}

function CurrentSection() {
  return (
    <div className="w-fit flex-shrink-0">
      <h2 className="text-xl mb-1 font-semibold">Currently</h2>
      <div className="flex flex-col gap-1">
        <h3>
          Software Engineer I @{' '}
          <a href="https://www.att.com/" target="_blank" rel="noopener noreferrer">
            <span className="underline-fill">AT&T</span>
          </a>
        </h3>
        <h3>
          OMSCS @{' '}
          <a href="https://www.gatech.edu/" target="_blank" rel="noopener noreferrer">
            <span className="underline-fill">Georgia Tech</span>
          </a>
        </h3>
        <h3>
          Writing on{' '}
          <a
            href="https://jacobmurrah.substack.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline-fill"
          >
            Substack
          </a>
        </h3>
      </div>
    </div>
  );
}

function EducationSection() {
  return (
    <div className="flex flex-col flex-1 min-w-[280px]">
      <h2 className="text-xl mb-1 font-semibold">Education</h2>
      <div className="flex flex-col gap-1 w-full">
        {EDUCATION.map((item) => (
          <div key={item.school}>
            <h3>{item.school}</h3>
            <div className="flex justify-between items-center gap-x-2">
              <p className="text-sm text-[var(--text-muted)]">{item.degree}</p>
              <p className="text-sm text-[var(--text-muted)]">{item.graduation}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExperienceSection() {
  return (
    <div className="w-full">
      <h2 className="text-xl mb-2 font-semibold">Experience</h2>
      <div className="flex flex-col gap-5 w-full">
        {EXPERIENCES.map((item) => (
          <div
            key={`${item.company}-${item.role}-${item.dates}`}
            className="flex items-start gap-2"
          >
            <div className="w-full">
              <div className="flex justify-between items-center">
                <h3>{item.company}</h3>
                <p>{item.location}</p>
              </div>
              <div className="flex flex-col">
                <div>
                  <div className="flex justify-between items-start text-[var(--text-muted)] text-sm gap-x-4">
                    <p>{item.role}</p>
                    <p className="shrink-0">{item.dates}</p>
                  </div>
                  <ul className="bullet-list text-sm">
                    <li>{item.summary}</li>
                  </ul>
                  <TagList tags={item.tags} className="mt-1.5 text-xs" tagClassName="" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FeaturedProjectsSection() {
  const hasFeatured = FEATURED_PROJECTS.length > 0;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <h2 className="text-lg mb-1 font-semibold">Featured Projects</h2>
        <Link to="/projects" className="group gap-0.5 flex items-center underline-fill">
          <div className="flex justify-center items-center">
            <p>all projects</p>
            <SvgIcon
              src={ICONS.arrowRight}
              alt="Arrow right icon"
              size="2xsmall"
              color="currentColor"
              className="transition-transform duration-150 group-hover:translate-x-0.5 svg-icon-shadow"
            />
          </div>
        </Link>
      </div>
      <div className="flex flex-col gap-3 w-full">
        {hasFeatured ? (
          FEATURED_PROJECTS.map((project) => (
            <ProjectItem
              key={`${project.title}-${project.year}`}
              size="base"
              showStatusBar={false}
              {...project}
            />
          ))
        ) : (
          <p className="text-[var(--text-muted)] text-sm">No featured projects yet.</p>
        )}
      </div>
    </div>
  );
}

function RecentPostsSection({ posts }: { posts: FeedPost[] }) {
  const hasPosts = posts.length > 0;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        <h2 className="text-lg font-semibold">Recent Posts</h2>
        <Link to="/blog" className="group gap-0.5 flex items-center underline-fill">
          <div className="flex justify-center items-center">
            <p>all posts</p>
            <SvgIcon
              src={ICONS.arrowRight}
              alt="Arrow right icon"
              size="2xsmall"
              color="currentColor"
              className="transition-transform duration-150 group-hover:translate-x-0.5 svg-icon-shadow"
            />
          </div>
        </Link>
      </div>
      <div className="flex flex-col gap-2 w-full">
        {hasPosts ? (
          <ul className="flex flex-col">
            {posts.map((post) => {
              const slug = getPostSlug(post);
              const id = getPostId(post, slug);
              const publishedOn = formatDate(post.pubDate ?? undefined);

              return (
                <li key={id}>
                  <Link
                    to={getPostPath(post)}
                    className="blog-card block w-full border-t-2 border-[var(--border)] bg-[var(--surface)] p-3"
                    aria-label={post.title ? `Read ${post.title}` : 'Read blog post'}
                  >
                    <div className="flex justify-between">
                      <h3 className="blog-card__title font-semibold text-[color:var(--primary)]">
                        <span className="underline-fill">{post.title}</span>
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-[color:var(--text-muted)]">
                        {publishedOn && <span>{publishedOn}</span>}
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-[color:var(--text-muted)]">No posts yet.</p>
        )}
      </div>
    </div>
  );
}

function ThemeContactSection() {
  return (
    <div className="w-full flex flex-row flex-wrap items-start gap-14">
      <div className="flex flex-col gap-2 self-start flex-[4_1_0] min-w-[185px] max-w-full">
        <h2 className="flex items-center gap-2 text-lg">
          <SvgIcon src={ICONS.paint} alt="Theme" size="medium" color="var(--primary)" />
          <span>Theme</span>
        </h2>
        <ThemeFontToggle tileSize={32} gap="0.75rem" />
      </div>
      <div className="flex flex-col self-start flex-[5_1_0] min-w-[220px]">
        <h2 className="flex items-center gap-2 text-lg mb-1">
          <SvgIcon src={ICONS.calendar} alt="Chat" size="small" color="var(--primary)" />
          <span>Contact</span>
        </h2>
        <div className="w-full flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <p className="text-[var(--text-muted)]">Always open to talk about anything!</p>
            <button className="w-full rounded-lg text-center bg-[var(--primary)] transition-transform duration-150 hover:scale-[1.03]">
              <a
                href="https://cal.com/jmurrah/30min?overlayCalendar=true"
                target="_blank"
                rel="noopener noreferrer"
              >
                <p className="text-[var(--surface)] py-2 font-semibold flex justify-center items-center gap-2">
                  <SvgIcon
                    src={ICONS.calendar}
                    alt="Calendar icon"
                    size="small"
                    color="var(--surface)"
                  />
                  <span>Book a Chat</span>
                </p>
              </a>
            </button>
          </div>
          <div className="h-px w-full bg-[color:var(--border)]" />
          <div className="flex flex-col gap-2">
            {CONTACT_LINKS.map((link) => (
              <div key={link.label} className="flex flex-col items-center">
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="arrow-link-group group w-full flex flex-wrap justify-between items-center gap-2 text-[var(--text)]"
                >
                  <span className="arrow-link-target inline-flex items-center gap-0.5">
                    <p className="text-[var(--text)]">{link.label}</p>
                    <SvgIcon
                      src={ICONS.arrowUpRight}
                      alt="External link arrow"
                      size="xsmall"
                      color="var(--text)"
                      className="arrow-link__icon transition-transform duration-150 group-hover:translate-x-0.5"
                    />
                  </span>
                  <p className="text-[var(--text-muted)] transition-colors group-hover:text-[var(--text)] group-focus-visible:text-[var(--text)]">
                    {link.display}
                  </p>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const { getPrimaryMutedColor } = useAccentColors();
  const recentPosts = useMemo(() => {
    const posts = getCachedBlogPosts() ?? [];
    return posts.slice(0, 3);
  }, []);

  const accentColor = getPrimaryMutedColor();

  return (
    <div className="flex flex-wrap gap-14 mt-10">
      <HeroSection />
      <AboutSection accentColor={accentColor} />
      <div className="flex flex-wrap w-full justify-between gap-14">
        <CurrentSection />
        <EducationSection />
      </div>
      <ExperienceSection />
      <FeaturedProjectsSection />
      <RecentPostsSection posts={recentPosts} />
      <ThemeContactSection />
    </div>
  );
}
