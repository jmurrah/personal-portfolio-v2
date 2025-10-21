import { useState } from 'react';
import Card from '@/components/Card';
import SvgIcon from '@/components/SvgIcon';
import TechnologyBadge from '@/components/TechnologyBadge';

const technologies = [
  { name: 'Python', logoSrc: '/logos/PythonLogo.svg', accent: 'rgba(53, 114, 165, 0.2)' },
  { name: 'Java', logoSrc: '/logos/JavaLogo.svg', accent: 'rgba(244, 117, 87, 0.2)' },
  { name: 'Go', logoSrc: '/logos/GoLogo.svg', accent: 'rgba(0, 173, 216, 0.2)' },
  { name: 'TypeScript', logoSrc: '/logos/TypeScriptLogo.svg', accent: 'rgba(49, 120, 198, 0.2)' },
  { name: 'React', logoSrc: '/logos/ReactLogo.svg', accent: 'rgba(97, 218, 251, 0.2)' },
  { name: 'AWS', logoSrc: '/logos/AWSLogo.svg', accent: 'rgba(255, 153, 0, 0.2)' },
  {
    name: 'Google Cloud',
    logoSrc: '/logos/GoogleCloudLogo.svg',
    accent: 'rgba(66, 133, 244, 0.2)',
  },
  { name: 'Postman', logoSrc: '/logos/PostmanLogo.svg', accent: 'rgba(255, 108, 55, 0.2)' },
  { name: 'Supabase', logoSrc: '/logos/SupabaseLogo.svg', accent: 'rgba(63, 207, 142, 0.2)' },
  { name: 'MongoDB', logoSrc: '/logos/MongoDbLogo.svg', accent: 'rgba(89, 150, 54, 0.2)' },
  { name: 'Docker', logoSrc: '/logos/DockerLogo.svg', accent: 'rgba(0, 130, 202, 0.2)' },
  { name: 'Git', logoSrc: '/logos/GitLogo.svg', accent: 'rgba(241, 80, 47, 0.2)' },
  // { name: 'Tailwind CSS', logoSrc: '/logos/TailwindLogo.svg', accent: 'rgba(56, 189, 248, 0.2)' },
  // { name: 'Spring Boot', logoSrc: '/logos/SpringLogo.svg', accent: 'rgba(109, 179, 63, 0.2)' },
  // { name: 'FastAPI', logoSrc: '/logos/FastAPILogo.svg', accent: 'rgba(5, 153, 139, 0.2)' },
];

const sections = [
  { key: 'about', label: 'About', icon: '/icons/ProfileIcon.svg' },
  { key: 'experience', label: 'Experience', icon: '/icons/BriefcaseIcon.svg' },
  { key: 'education', label: 'Education', icon: '/icons/EducationIcon.svg' },
  { key: 'projects', label: 'Projects', icon: '/icons/ProjectIcon.svg' },
  { key: 'resume', label: 'Resume', icon: '/icons/FileDownloadIcon.svg' },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState<null | string>(null);
  const activeSectionMeta = sections.find((section) => section.key === activeSection);
  const activeHeadingId = activeSectionMeta ? `section-${activeSectionMeta.key}-title` : undefined;

  return (
    <div>
      <div className="relative flex flex-wrap gap-4">
        <div className="flex gap-4 w-full">
          <div className="flex flex-col gap-4">
            <Card className="h-56 flex flex-col justify-between w-80 shrink-0">
              <h1 className="text-[color:var(--primary)] text-4xl font-bold">Jacob Murrah</h1>
              <p className="flex items-center gap-2">
                <SvgIcon
                  src="/icons/CodeIcon.svg"
                  alt="Code Icon"
                  color="var(--primary)"
                  size="small"
                />
                Full Stack Software Developer
              </p>
              <p className="flex items-center gap-2">
                <SvgIcon
                  src="/icons/CalendarIcon.svg"
                  alt="Calendar Icon"
                  color="var(--primary)"
                  size="small"
                />
                2+ Years of Experience
              </p>
              <p className="flex items-center gap-2">
                <SvgIcon
                  src="/icons/MapPinIcon.svg"
                  alt="Map Pin Icon"
                  color="var(--primary)"
                  size="small"
                />
                Atlanta, GA
              </p>
              <a href="mailto:jacob@murrah.dev" className="flex items-center gap-2">
                <SvgIcon
                  src="/icons/MailIcon.svg"
                  alt="Email Icon"
                  color="var(--primary)"
                  size="small"
                />
                jacob@murrah.dev
              </a>
            </Card>
            <Card className="flex justify-between items-center">
              <SvgIcon href="https://github.com/jmurrah" src="/icons/GitHubIcon.svg" alt="GitHub" />
              <SvgIcon
                href="https://linkedin.com/in/jacobhmurrah"
                src="/icons/LinkedInIcon.svg"
                alt="LinkedIn"
                hoverColor="var(--primary)"
              />
              <SvgIcon
                href="https://leetcode.com/jmurrah"
                src="/icons/LeetCodeIcon.svg"
                alt="LeetCode"
                hoverColor="var(--primary)"
              />
              <SvgIcon
                href="https://www.buymeacoffee.com/jmurrah"
                src="/icons/CoffeeIcon.svg"
                alt="Buy Me a Coffee"
                hoverColor="var(--primary)"
              />
              <SvgIcon
                href="mailto:jacob@murrah.dev"
                src="/icons/MailIcon.svg"
                alt="Email"
                hoverColor="var(--primary)"
              />
            </Card>
            <Card>
              <p className="text-[color:var(--primary)]">Currently ↓</p>
              <p>Software Engineer I @ AT&T</p>
              <p>OMSCS @ Georgia Tech</p>
            </Card>
          </div>
          {/* <Card className="w-auto max-w-24">
            <img src="/JacobMurrahWaterfall.jpg" alt="Jacob Murrah" />
          </Card> */}

          <Card
            className={
              activeSection
                ? 'section-card flex flex-col gap-2 w-full section-card--active-source'
                : 'section-card flex flex-col gap-2 w-full'
            }
          >
            <div
              className={
                activeSection
                  ? 'section-card__list flex flex-col gap-2 section-card__list--animating'
                  : 'section-card__list flex flex-col gap-2'
              }
              aria-hidden={Boolean(activeSection)}
            >
              {sections.map((section) => {
                const isActive = activeSection === section.key;
                return (
                  <button
                    key={section.key}
                    type="button"
                    data-active={isActive}
                    onClick={() =>
                      setActiveSection((prev) => (prev === section.key ? null : section.key))
                    }
                    aria-expanded={isActive}
                    className="section-card__button flex items-center gap-2 text-left transition-colors duration-200 hover:text-[color:var(--primary)] focus-visible:outline-none focus-visible:text-[color:var(--primary)]"
                  >
                    <SvgIcon
                      src={section.icon}
                      alt={section.label}
                      hoverColor="var(--primary)"
                      size="small"
                    />
                    <span>{section.label}</span>
                  </button>
                );
              })}
            </div>
          </Card>
        </div>
        <Card className="w-full flex flex-col gap-4">
          <h2>Technologies</h2>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <TechnologyBadge key={tech.name} {...tech} />
            ))}
          </div>
        </Card>
        {activeSectionMeta && (
          <Card
            className="section-expander flex flex-col gap-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby={activeHeadingId}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold" id={activeHeadingId}>
                {activeSectionMeta.label}
              </h2>
              <button
                type="button"
                onClick={() => setActiveSection(null)}
                className="text-sm text-[color:var(--primary)] hover:opacity-80 focus-visible:outline-none focus-visible:opacity-80"
              >
                Close
              </button>
            </div>
            <p className="opacity-75">
              Placeholder content for the {activeSectionMeta.label.toLowerCase()} section. Add your
              real copy here later.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
