import { useMemo, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import SvgIcon from '@/components/SvgIcon';
import { PHOTOS, ICONS } from '@/assets';
import ThemeFontToggle from '@/components/ThemeFontToggle';
import TagList from '@/components/TagList';
import { useAccentColors } from '@/hooks/useAccentColors';
import { getCachedBlogPosts } from '@/components/Blog/feedService';
import { getPostPath, getPostSlug } from '@/components/Blog/postRouting';

export default function Home() {
  const { getPrimaryMutedColor } = useAccentColors();

  const formatDate = (value?: string | null) => {
    if (!value) return '';
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? value : parsed.toLocaleDateString();
  };

  const recentPosts = useMemo(() => {
    const posts = getCachedBlogPosts() ?? [];
    return posts.slice(0, 3);
  }, []);

  return (
    <div className="flex flex-wrap gap-14 mt-10">
      <div className="w-full flex flex-col sm:flex-row gap-4 justify-center items-center sm:items-start mb-10 text-center sm:text-left">
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
            {[
              { label: 'email', href: 'mailto:jacob@murrah.dev' },
              { label: 'linkedin', href: 'https://www.linkedin.com/in/jacobmurrah/' },
              { label: 'github', href: 'https://github.com/jmurrah' },
              { label: 'resume', href: '/JacobMurrahResume.pdf' },
            ].map((link) => (
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
                  className="arrow-link__icon transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-xl mb-1 font-semibold">About</h2>
        <div className="flex flex-col gap-2">
          <p className="text-[var(--text-muted)]">
            I specialize in{' '}
            <span
              className="accent-underline"
              style={{ '--accent-underline-color': getPrimaryMutedColor() } as CSSProperties}
            >
              full-stack development
            </span>{' '}
            and build applications that prioritize{' '}
            <span
              className="accent-underline"
              style={{ '--accent-underline-color': getPrimaryMutedColor() } as CSSProperties}
            >
              simplicity
            </span>{' '}
            and{' '}
            <span
              className="accent-underline"
              style={{ '--accent-underline-color': getPrimaryMutedColor() } as CSSProperties}
            >
              efficiency
            </span>
            . My experience in{' '}
            <span
              className="accent-underline"
              style={{ '--accent-underline-color': getPrimaryMutedColor() } as CSSProperties}
            >
              machine learning
            </span>{' '}
            and{' '}
            <span
              className="accent-underline"
              style={{ '--accent-underline-color': getPrimaryMutedColor() } as CSSProperties}
            >
              system design
            </span>{' '}
            enables me to create{' '}
            <span
              className="accent-underline"
              style={{ '--accent-underline-color': getPrimaryMutedColor() } as CSSProperties}
            >
              intelligent
            </span>{' '}
            and{' '}
            <span
              className="accent-underline"
              style={{ '--accent-underline-color': getPrimaryMutedColor() } as CSSProperties}
            >
              scalable
            </span>{' '}
            systems.
          </p>
        </div>
      </div>
      <div className="flex flex-wrap w-full justify-between gap-14">
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
        <div className="flex flex-col flex-1 min-w-[280px]">
          <h2 className="text-xl mb-1 font-semibold">Education</h2>
          <div className="flex flex-col gap-1 w-full">
            <div>
              <h3>Georgia Institute of Technology</h3>
              <div className="flex justify-between items-center gap-x-2">
                <p className="text-sm text-[var(--text-muted)]">M.S. in Computer Science</p>
                <p className="text-sm text-[var(--text-muted)]">Dec. 2028</p>
              </div>
            </div>
            <div>
              <h3>Auburn University</h3>
              <div className="flex justify-between items-center gap-x-2">
                <p className="text-sm text-[var(--text-muted)]">B.E. in Software Engineering</p>
                <p className="text-sm text-[var(--text-muted)]">Dec. 2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full">
        <h2 className="text-xl mb-2 font-semibold">Experience</h2>
        <div className="flex flex-col gap-6 w-full">
          <div className="flex items-start gap-2">
            <div className="w-full">
              <div className="flex justify-between items-center">
                <h3>AT&T</h3>
                <p>Atlanta, GA</p>
              </div>
              <div className="flex flex-col">
                <div>
                  <div className="flex justify-between items-start text-[var(--text-muted)] text-sm">
                    <p>Software Engineer I</p>
                    <p className="shrink-0">Jan. 2026 - Present</p>
                  </div>
                  <ul className="bullet-list text-sm">
                    <li>Incoming January 2026.</li>
                  </ul>
                  <TagList
                    tags={[
                      'Python',
                      'TypeScript',
                      'Java',
                      'Docker',
                      'MongoDB',
                      'PostgreSQL',
                      'Azure',
                    ]}
                    className="mt-1.5 text-xs"
                    tagClassName=""
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-full">
              <div className="flex justify-between items-center">
                <h3>Auburn University</h3>
                <p>Auburn, AL</p>
              </div>
              <div>
                <div className="flex justify-between items-start text-[var(--text-muted)] text-sm gap-x-4">
                  <p>Undergraduate Research Assistant</p>
                  <p className="shrink-0">Aug. 2025 - Dec. 2025</p>
                </div>
                <ul className="bullet-list text-sm">
                  <li>Worked with Dr. Rongxuan (Raphael) Wang in the AMICS lab.</li>
                </ul>
                <TagList
                  tags={['TypeScript', 'NextJS', 'Python', 'Docker', 'Supabase', 'Vercel', 'CAD']}
                  className="mt-1.5 text-xs"
                  tagClassName=""
                />
              </div>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-full">
              <div className="flex justify-between items-center">
                <h3>AT&T</h3>
                <p>Atlanta, GA</p>
              </div>
              <div>
                <div className="flex justify-between items-start text-[var(--text-muted)] text-sm gap-x-4">
                  <p>Software Engineer Intern</p>
                  <p className="shrink-0">Jun. 2025 - Aug. 2025</p>
                </div>
                <ul className="bullet-list text-sm">
                  <li>Cricket Wireless web application for monitoring store inventory.</li>
                </ul>
                <TagList
                  tags={[
                    'TypeScript',
                    'React',
                    'Java',
                    'Spring Boot',
                    'Figma',
                    'Docker',
                    'MongoDB',
                  ]}
                  className="mt-1.5 text-xs"
                  tagClassName=""
                />
              </div>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-full">
              <div className="flex justify-between items-center">
                <h3>Adtran</h3>
                <p>Huntsville, AL</p>
              </div>
              <div>
                <div className="flex justify-between items-start text-[var(--text-muted)] text-sm gap-x-4">
                  <p>Software Engineer Co-op</p>
                  <p className="shrink-0">May 2023 - Dec. 2024</p>
                </div>
                <ul className="bullet-list text-sm">
                  <li>Developer tooling and Mosaic One SaaS for network monitoring.</li>
                </ul>
                <TagList
                  tags={['Python', 'TypeScript', 'Angular', 'Docker', 'PostgreSQL', 'AWS']}
                  className="mt-1.5 text-xs"
                  tagClassName=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="flex justify-between items-center">
          <h2 className="text-lg mb-2 font-semibold">Featured Projects</h2>
          <Link to="/projects" className="group gap-0.5 flex items-center underline-fill">
            <div className="flex justify-center items-center">
              <p>all projects</p>
              <SvgIcon
                src={ICONS.arrowRight}
                alt="Arrow right icon"
                size="2xsmall"
                color="currentColor"
                className="transition-transform duration-200 group-hover:translate-x-0.5 svg-icon-shadow"
              />
            </div>
          </Link>
        </div>
        <div className="flex flex-col gap-1 w-full">
          <div>
            <div className="flex justify-between items-center">
              <h3>LeetCode Repetition Extension</h3>
              <div className="flex items-center gap-2 text-sm">
                <p>github</p>
                <p>live</p>
              </div>
            </div>
            <p className="text-[var(--text-muted)] text-sm">
              Web extension that helps users track{' '}
            </p>
            <TagList
              tags={['Python', 'TypeScript', 'Angular', 'Docker', 'PostgreSQL', 'AWS']}
              className="mt-1.5 text-xs"
              tagClassName=""
            />
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">Recent Posts</h2>
          <Link to="/blog" className="group gap-0.5 flex items-center underline-fill">
            <div className="flex justify-center items-center">
              <p>all posts</p>
              <SvgIcon
                src={ICONS.arrowRight}
                alt="Arrow right icon"
                size="2xsmall"
                color="currentColor"
                className="transition-transform duration-200 group-hover:translate-x-0.5 svg-icon-shadow"
              />
            </div>
          </Link>
        </div>
        <div className="flex flex-col gap-2 w-full">
          {recentPosts.length ? (
            <ul className="flex flex-col">
              {recentPosts.map((post) => {
                const slug = getPostSlug(post);
                const id = post.guid ?? post.link ?? slug;
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
      <div className="w-full flex flex-row flex-wrap items-start gap-10 md:gap-12">
        <div className="flex flex-col gap-2 self-start flex-[2_1_0] min-w-[185px] max-w-full">
          <h2 className="flex items-center gap-2 text-lg">
            <SvgIcon src={ICONS.paint} alt="Theme" size="medium" color="var(--primary)" />
            <span>Theme</span>
          </h2>
          <ThemeFontToggle tileSize={32} gap="0.75rem" />
        </div>
        <div className="flex flex-col self-start flex-[3_1_0] min-w-[220px]">
          <h2 className="flex items-center gap-2 text-lg mb-1">
            <SvgIcon src={ICONS.calendar} alt="Chat" size="small" color="var(--primary)" />
            <span>Contact</span>
          </h2>
          <div className="w-full flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <p className="text-[var(--text-muted)]">Always open to talk about anything!</p>
              <button className="w-full rounded-lg text-center bg-[var(--primary)] transition-transform duration-200 hover:scale-[1.03]">
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
              <div className="flex flex-col items-center">
                <a
                  href="mailto:jacob@murrah.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="arrow-link group w-full flex flex-wrap justify-between items-center text-[var(--text)]"
                >
                  <div className="flex justify-center items-center">
                    <p className="text-[var(--text)]">email</p>
                    <SvgIcon
                      src={ICONS.arrowUpRight}
                      alt="External link arrow"
                      size="xsmall"
                      color="var(--text)"
                      className="arrow-link__icon transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </div>
                  <p className="text-[var(--text-muted)] group-hover:text-[var(--text)]">
                    jacob@murrah.dev
                  </p>
                </a>
              </div>
              <div className="flex flex-col items-center">
                <a
                  href="https://www.linkedin.com/in/jacobmurrah/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="arrow-link group w-full flex flex-wrap justify-between items-center text-[var(--text)]"
                >
                  <div className="flex justify-center items-center">
                    <p className="text-[var(--text)]">linkedin</p>
                    <SvgIcon
                      src={ICONS.arrowUpRight}
                      alt="External link arrow"
                      size="xsmall"
                      color="var(--text)"
                      className="arrow-link__icon transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </div>
                  <p className="text-[var(--text-muted)] group-hover:text-[var(--text)]">
                    /in/jacobmurrah
                  </p>
                </a>
              </div>
              <div className="flex flex-col items-center">
                <a
                  href="https://github.com/jmurrah"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="arrow-link group w-full flex flex-wrap justify-between items-center text-[var(--text)]"
                >
                  <div className="flex justify-center items-center">
                    <p className="text-[var(--text)]">github</p>
                    <SvgIcon
                      src={ICONS.arrowUpRight}
                      alt="LinkedIn"
                      size="xsmall"
                      color="var(--text)"
                      className="arrow-link__icon transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </div>
                  <p className="text-[var(--text-muted)] group-hover:text-[var(--text)]">
                    /jmurrah
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
