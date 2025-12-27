import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from 'react';
import { prefetchBlogPosts } from '@/components/Blog/feedService';
import SvgIcon from '@/components/SvgIcon';
import { PHOTOS, ICONS } from '@/assets';
import ThemeFontToggle from '@/components/ThemeFontToggle';
import { technologies } from '@/constants/technologies';
import TechnologyBadge from '@/components/TechnologyBadge';
import { usePrimaryTheme } from '@/hooks/usePrimaryTheme';

export default function Home() {
  const headerRowRef = useRef<HTMLDivElement | null>(null);
  const headshotRef = useRef<HTMLImageElement | null>(null);
  const headerContentRef = useRef<HTMLDivElement | null>(null);
  const [isHeaderWrapped, setIsHeaderWrapped] = useState(false);
  const { theme, primaryThemes } = usePrimaryTheme();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() =>
    typeof document !== 'undefined'
      ? document.documentElement.classList.contains('dark-mode')
      : false,
  );

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

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains('dark-mode'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const accentThemes = (() => {
    const idx = primaryThemes.indexOf(theme);
    if (idx === -1) return primaryThemes;
    return [...primaryThemes.slice(idx + 1), ...primaryThemes.slice(0, idx)];
  })();

  const getAccentColor = (index: number) => {
    const sourceList = accentThemes.length ? accentThemes : primaryThemes;
    const colorName = sourceList[index % sourceList.length];
    const shade = isDarkMode ? 'dark' : 'light';
    return `var(--theme-${colorName}-primary-${shade})`;
  };

  return (
    <div className="flex flex-wrap gap-14 mt-10">
      <div ref={headerRowRef} className="w-full flex flex-wrap gap-4 justify-center mb-10">
        <img ref={headshotRef} className="w-auto h-24 rounded-lg" src={PHOTOS.graduationHeadshot} />
        <div
          ref={headerContentRef}
          className={`flex flex-col gap-y-1.5 ${isHeaderWrapped ? 'items-center' : 'items-start'}`}
        >
          <h1 className="text-3xl text-[var(--primary)] text-center">Jacob Murrah</h1>
          <div className="flex gap-x-4 flex-wrap justify-center">
            <div className="flex gap-1 items-center">
              <SvgIcon
                src={ICONS.mapPin}
                alt="Location"
                size="2xsmall"
                color="var(--text-muted)"
                hoverColor="var(--primary)"
              />
              <p className="text-[var(--text-muted)] text-center">Atlanta, GA</p>
            </div>
            <div className="flex gap-1 items-center">
              <SvgIcon
                src={ICONS.code}
                alt="Specialty"
                size="small"
                color="var(--text-muted)"
                hoverColor="var(--primary)"
              />
              <p className="text-[var(--text-muted)] text-center">Full-Stack Developer</p>
            </div>
            <div className="flex gap-1 items-center">
              <SvgIcon
                src={ICONS.calendar}
                alt="Specialty"
                size="2xsmall"
                color="var(--text-muted)"
                hoverColor="var(--primary)"
              />
              <p className="text-[var(--text-muted)] text-center">2+ YoE</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-x-4 justify-center">
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
                className="group gap-0.5 flex items-center text-[color:var(--text-muted)] hover:text-[var(--text)]"
              >
                <span>{link.label}</span>
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
        <h2 className="text-xl mb-1 font-semibold">About</h2>
        <div className="flex flex-col gap-2">
          <p className="text-[var(--text-muted)]">
            I specialize in{' '}
            <span
              className="accent-underline"
              style={{ '--accent-underline-color': getAccentColor(0) } as CSSProperties}
            >
              full-stack development
            </span>{' '}
            and build applications that prioritize{' '}
            <span
              className="accent-underline"
              style={{ '--accent-underline-color': getAccentColor(1) } as CSSProperties}
            >
              simplicity
            </span>{' '}
            and{' '}
            <span
              className="accent-underline"
              style={{ '--accent-underline-color': getAccentColor(2) } as CSSProperties}
            >
              efficiency
            </span>
            . My experience in{' '}
            <span
              className="accent-underline"
              style={{ '--accent-underline-color': getAccentColor(3) } as CSSProperties}
            >
              machine learning
            </span>{' '}
            and{' '}
            <span
              className="accent-underline"
              style={{ '--accent-underline-color': getAccentColor(4) } as CSSProperties}
            >
              system design
            </span>{' '}
            enables me to create{' '}
            <span
              className="accent-underline"
              style={{ '--accent-underline-color': getAccentColor(5) } as CSSProperties}
            >
              intelligent
            </span>{' '}
            and{' '}
            <span
              className="accent-underline"
              style={{ '--accent-underline-color': getAccentColor(6) } as React.CSSProperties}
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
              Writing on {' '}
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
        <div className="flex flex-col gap-4 w-full">
          <div className="flex items-start gap-2">
            <img className="h-7 w-7" src={ICONS.att} alt="AT&T" />
            <div className="w-full">
              <div className="flex justify-between items-center mt-0.5">
                <h3 className="flex items-center gap-2">AT&T</h3>
                <p>Atlanta, GA</p>
              </div>
              <div className="flex flex-col gap-2">
                <div>
                  <div className="flex justify-between items-start text-[var(--text-muted)] text-sm">
                    <p>Software Engineer I</p>
                    <p className='shrink-0'>Jan. 2026 - Present</p>
                  </div>
                  <ul className="bullet-list text-sm">
                    <li>Incoming January 2026.</li>
                  </ul>
                </div>
                <div>
                  <div className="flex justify-between items-start text-[var(--text-muted)] text-sm gap-x-4">
                    <p>Software Engineer Intern</p>
                    <p className='shrink-0'>Jun. 2025 - Aug. 2025</p>
                  </div>
                  <ul className="bullet-list text-sm">
                    <li>Cricket Wireless web application for monitoring device inventory.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <img className="h-7 w-7" src={ICONS.auburnEng} alt="Auburn" />
            <div className="w-full">
              <div className="flex justify-between items-center mt-0.5">
                <h3 className="flex items-center gap-2">Auburn University</h3>
                <p>Auburn, AL</p>
              </div>
              <div>
                <div className="flex justify-between items-start text-[var(--text-muted)] text-sm gap-x-4">
                  <p>Undergraduate Research Assistant</p>
                  <p className='shrink-0'>Aug. 2025 - Dec. 2025</p>
                </div>
                <ul className="bullet-list text-sm">
                  <li>Worked with Dr. Rongxuan (Raphael) Wang in the AMICS lab.</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <img className="h-7 w-7" src={ICONS.adtran} alt="Adtran" />
            <div className="w-full">
              <div className="flex justify-between items-center mt-0.5">
                <h3 className="flex items-center gap-2">Adtran</h3>
                <p>Huntsville, AL</p>
              </div>
              <div>
                <div className="flex justify-between items-start text-[var(--text-muted)] text-sm gap-x-4">
                  <p>Software Engineer Co-op</p>
                  <p className='shrink-0'>May 2023 - Dec. 2024</p>
                </div>
                <ul className="bullet-list text-sm">
                  <li>Developer tooling and Mosaic One SaaS for network monitoring.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full">
        <h2 className="text-lg mb-1 font-semibold">Technologies</h2>
        <div className="flex flex-col gap-1 w-full">
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <TechnologyBadge key={tech.name} {...tech} />
            ))}
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-3">
        <h2 className="flex items-center gap-2 text-lg">
          <SvgIcon src={ICONS.paint} alt="Theme" size="medium" color="var(--primary)" />
          <span>Theme &amp; Font</span>
        </h2>
        <ThemeFontToggle />
      </div>
    </div>
  );
}
