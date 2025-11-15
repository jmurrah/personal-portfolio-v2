import { useState } from 'react';
import { ICONS, LOGOS, MEMOJI } from '@/assets';
import AnimatedCard from '@/components/AnimatedCard';
import CurrentTime from '@/components/CurrentTime';
import SvgIcon from '@/components/SvgIcon';
import TechnologyBadge from '@/components/TechnologyBadge';
import Tabs from '@/components/NavCard/NavCard';
import ThemeToggle from '@/components/ThemeToggle';
import SlidingMessage from '@/components/SlidingMessage/SlidingMessage';

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

const marqueeMessages = [
  'Proud father of 3 cats',
  'Hitting new gym PRs',
  'Mentoring junior engineers',
  'Carrying in unrated Valorant',
  'Sharing lessons learned',
];

type NavTabId = 'about' | 'experience' | 'education' | 'projects' | 'blog';

const navTabIds: NavTabId[] = ['about', 'experience', 'education', 'projects', 'blog'];

export default function Home() {
  const [activeTab, setActiveTab] = useState<NavTabId | null>(null);
  const noop = () => {};

  const isNavTabId = (value: string): value is NavTabId =>
    navTabIds.includes(value as NavTabId);

  const handleTabClick = (tabId: string) => {
    if (tabId === '') {
      setActiveTab(null);
      return;
    }

    if (isNavTabId(tabId)) {
      setActiveTab((current) => (current === tabId ? null : tabId));
    }
  };

  return (
    <div>
      <div className="relative flex flex-wrap gap-4">
        <div className="flex flex-col gap-4 w-full md:max-w-[276px]">
          <AnimatedCard
            direction="left"
            delay={100}
            triggerExit={false}
            className="z-100 flex flex-col gap-1.5 justify-between w-full shrink-0"
            onExitComplete={noop}
          >
            <h1 className="text-[color:var(--primary)] text-4xl font-bold">Jacob Murrah</h1>
            <p className="flex items-center gap-2">
              <SvgIcon src={ICONS.code} alt="Code Icon" color="var(--primary)" size="small" />
              Full Stack Developer
            </p>
            <p className="flex items-center gap-2">
              <SvgIcon
                src={ICONS.calendar}
                alt="Calendar Icon"
                color="var(--primary)"
                size="small"
              />
              2+ Years of Experience
            </p>
            <p className="flex items-center gap-2">
              <SvgIcon src={ICONS.mapPin} alt="Map Pin Icon" color="var(--primary)" size="small" />
              Atlanta, GA
            </p>
            <p className="flex items-center gap-2 w-fit">
              <SvgIcon src={ICONS.mail} alt="Email Icon" color="var(--primary)" size="small" />
              <a href="mailto:jacob@murrah.dev">
                <span className="underline-fill">jacob@murrah.dev</span>
              </a>
            </p>
          </AnimatedCard>

          <AnimatedCard
            direction="left"
            delay={350}
            triggerExit={false}
            className="social-links z-100 flex justify-between items-center"
            onExitComplete={noop}
          >
            <SvgIcon href="https://github.com/jmurrah" src={ICONS.gitHub} alt="GitHub" />
            <SvgIcon
              href="https://linkedin.com/in/jacobmurrah"
              src={ICONS.linkedIn}
              alt="LinkedIn"
              hoverColor="var(--primary)"
            />
            <SvgIcon
              href="https://leetcode.com/jmurrah"
              src={ICONS.leetCode}
              alt="LeetCode"
              hoverColor="var(--primary)"
            />
            <SvgIcon
              href="https://www.buymeacoffee.com/jmurrah"
              src={ICONS.coffee}
              alt="Buy Me a Coffee"
              hoverColor="var(--primary)"
            />
            <SvgIcon
              href="mailto:jacob@murrah.dev"
              src={ICONS.mail}
              alt="Email"
              hoverColor="var(--primary)"
            />
          </AnimatedCard>

          <AnimatedCard
            direction="right"
            delay={600}
            triggerExit={false}
            className="z-100 h-full flex flex-col justify-between items-start"
            onExitComplete={noop}
          >
            {/* <p className="text-[color:var(--primary)]">Currently ↴</p> */}
            <p>Currently 🡓</p>
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
          </AnimatedCard>
        </div>

        <div className="flex flex-col gap-4 w-full">
          <AnimatedCard
            direction="right"
            delay={1350}
            triggerExit={false}
            className="z-100"
            onExitComplete={noop}
            isCustomCard={true}
          >
            <ThemeToggle />
          </AnimatedCard>
          <AnimatedCard
            direction="right"
            delay={1350}
            triggerExit={false}
            className="z-100 rounded-lg bg-[var(--card-bg)]"
            onExitComplete={noop}
            isCustomCard={true}
          >
            <CurrentTime />
          </AnimatedCard>
          <AnimatedCard
            direction="right"
            delay={1350}
            triggerExit={false}
            className="z-100 rounded-lg bg-[var(--card-bg)]"
            onExitComplete={noop}
            isCustomCard={true}
          >
            <div className="flex h-full items-end">
              <img src={MEMOJI.memoji} alt="Jacob Memoji" className="mx-auto max-w-full" />
            </div>
          </AnimatedCard>
          <AnimatedCard
            direction="right"
            delay={1350}
            triggerExit={false}
            className="z-100 rounded-lg p-2 bg-[var(--card-bg)]"
            onExitComplete={noop}
            isCustomCard={true}
          >
            <div className="flex flex-col justify-center items-center gap-2">
              <div className="flex gap-1 justify-start items-center">
                <img src={ICONS.aubie} className="w-9 h-auto" alt="Auburn mascot" />
                <p>War Eagle!</p>
              </div>
              <div className="flex gap-1 justify-start items-center">
                <img src={ICONS.buzz} className="w-8.5 h-auto" alt="Georgia Tech mascot" />
                <p>Sting 'Em!</p>
              </div>
            </div>
          </AnimatedCard>
          <AnimatedCard
            direction="top"
            delay={1350}
            triggerExit={false}
            className="z-100"
            onExitComplete={noop}
            isCustomCard={true}
          >
            <Tabs
              onTabClick={handleTabClick}
              readyToExpand={Boolean(activeTab)}
              selectedTab={activeTab}
            />
          </AnimatedCard>
          <AnimatedCard
            direction="right"
            delay={1550}
            triggerExit={false}
            className="z-100"
            onExitComplete={noop}
            isCustomCard={true}
          >
            <a
              href={`${import.meta.env.BASE_URL}resume`}
              target="_blank"
              rel="noopener noreferrer"
              className="resume w-full inline-flex items-center justify-center gap-3 rounded-lg px-4 py-2 border-3"
            >
              <SvgIcon
                src={ICONS.fileDownload}
                alt="Resume"
                color="var(--resume-icon-color)"
                size="large"
              />
              <p className="font-bold">Resume</p>
            </a>
          </AnimatedCard>
          <AnimatedCard
            direction="right"
            delay={1350}
            triggerExit={false}
            className="z-100"
            onExitComplete={noop}
            isCustomCard={true}
          >
            <SlidingMessage className="w-full min-h-10" messages={marqueeMessages} duration={18} />
          </AnimatedCard>
        </div>

        <AnimatedCard
          direction="bottom"
          delay={850}
          triggerExit={false}
          className="z-100 w-full flex flex-col gap-2"
          onExitComplete={noop}
        >
          <h2 className="text-[var(--text)]">Technologies</h2>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <TechnologyBadge key={tech.name} {...tech} />
            ))}
          </div>
        </AnimatedCard>
      </div>
    </div>
  );
}
