import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ICONS, LOGOS } from '@/assets';
import AnimatedCard from '@/components/AnimatedCard';
import SvgIcon from '@/components/SvgIcon';
import TechnologyBadge from '@/components/TechnologyBadge';
import Tabs from '@/components/NavCard/NavCard';
import { useSlideAnimation } from '@/hooks/useSlideAnimation';
import ThemeToggle from '@/components/ThemeToggle';
import { BASE_ANIMATION_MS as DELAY } from '@/components/NavCard/animationConfig';
import { useLocation, useNavigate } from 'react-router-dom';

const technologies = [
  { name: 'Python', logoSrc: LOGOS.python, accent: 'rgba(53, 114, 165, 0.2)' },
  { name: 'Java', logoSrc: LOGOS.java, accent: 'rgba(244, 117, 87, 0.2)' },
  { name: 'Go', logoSrc: LOGOS.go, accent: 'rgba(0, 173, 216, 0.2)' },
  { name: 'TypeScript', logoSrc: LOGOS.typeScript, accent: 'rgba(49, 120, 198, 0.2)' },
  { name: 'React', logoSrc: LOGOS.react, accent: 'rgba(97, 218, 251, 0.2)' },
  { name: 'AWS', logoSrc: LOGOS.aws, accent: 'rgba(255, 153, 0, 0.2)' },
  {
    name: 'Google Cloud',
    logoSrc: LOGOS.googleCloud,
    accent: 'rgba(66, 133, 244, 0.2)',
  },
  { name: 'Postman', logoSrc: LOGOS.postman, accent: 'rgba(255, 108, 55, 0.2)' },
  { name: 'Supabase', logoSrc: LOGOS.supabase, accent: 'rgba(63, 207, 142, 0.2)' },
  { name: 'MongoDB', logoSrc: LOGOS.mongoDb, accent: 'rgba(89, 150, 54, 0.2)' },
  { name: 'Docker', logoSrc: LOGOS.docker, accent: 'rgba(0, 130, 202, 0.2)' },
  { name: 'Git', logoSrc: LOGOS.git, accent: 'rgba(241, 80, 47, 0.2)' },
  // { name: 'Tailwind CSS', logoSrc: LOGOS.tailwind, accent: 'rgba(56, 189, 248, 0.2)' },
  // { name: 'Spring Boot', logoSrc: LOGOS.spring, accent: 'rgba(109, 179, 63, 0.2)' },
  // { name: 'FastAPI', logoSrc: LOGOS.fastApi, accent: 'rgba(5, 153, 139, 0.2)' },
];

type NavTabId = 'about' | 'experience' | 'education' | 'projects' | 'blog';

const tabRoutes: Record<NavTabId, `/${NavTabId}`> = {
  about: '/about',
  experience: '/experience',
  education: '/education',
  projects: '/projects',
  blog: '/blog',
};

const totalCards = 4;

const getTabFromPath = (pathname: string): NavTabId | null => {
  const [, firstSegment = ''] = pathname.split('/');
  return (firstSegment in tabRoutes ? firstSegment : null) as NavTabId | null;
};

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const routeTab = useMemo(() => getTabFromPath(location.pathname), [location.pathname]);
  const [activeTab, setActiveTab] = useState<string | null>(() => routeTab);
  const [readyToShowTab, setReadyToShowTab] = useState(() => Boolean(routeTab));
  const [introDuration, setIntroDuration] = useState(() => (routeTab ? 650 : 1100));
  const [cardsExiting, setCardsExiting] = useState(() => Boolean(routeTab));
  const [, setExitedCardCount] = useState(0);
  const [hideCards, setHideCards] = useState(() => false);
  const internalNavRef = useRef(false);
  const pendingTabRef = useRef<string | null>(routeTab);
  const hasShownDefaultRef = useRef(routeTab === null);

  const tabsAnimation = useSlideAnimation({
    direction: 'top',
    delay: introDuration,
    duration: 1000,
    isExiting: false,
  });

  const isNavTabId = (value: string): value is NavTabId => value in tabRoutes;

  useEffect(() => {
    pendingTabRef.current = routeTab ?? null;

    if (internalNavRef.current) {
      internalNavRef.current = false;
      return;
    }

    if (routeTab) {
      setActiveTab(routeTab);
      setIntroDuration(650);
      setHideCards(false);
      setCardsExiting(true);
      setReadyToShowTab(false);
      setExitedCardCount(0);
    } else {
      setIntroDuration(1100);
      setPendingTabAndReset();
    }
  }, [routeTab]);

  const setPendingTabAndReset = useCallback(() => {
    hasShownDefaultRef.current = true;
    setActiveTab(null);
    setHideCards(false);
    setReadyToShowTab(false);
    setCardsExiting(false);
    setExitedCardCount(0);
  }, []);

  const handleAllCardsExited = useCallback(() => {
    if (pendingTabRef.current) {
      setHideCards(true);
      setReadyToShowTab(true);
      setCardsExiting(false);
    } else {
      setPendingTabAndReset();
    }
  }, [setPendingTabAndReset]);

  const handleCardExited = useCallback(() => {
    setExitedCardCount((prev) => {
      const newCount = prev + 1;
      if (newCount === totalCards) {
        handleAllCardsExited();
      }
      return newCount;
    });
  }, [handleAllCardsExited]);

  const handleTabClick = (tabId: string) => {
    const isClosing = tabId === '' || tabId === activeTab;
    const nextTab = isClosing ? null : tabId;
    const targetRoute = nextTab && isNavTabId(nextTab) ? tabRoutes[nextTab] : '/';

    pendingTabRef.current = nextTab;

    if (nextTab) {
      setActiveTab(nextTab);
    } else {
      setActiveTab(null);
    }

    if (location.pathname !== targetRoute) {
      internalNavRef.current = true;
    }

    setExitedCardCount(0);

    if (isClosing) {
      if (!hasShownDefaultRef.current) {
        setPendingTabAndReset();
      } else {
        setIntroDuration(1100);
        setCardsExiting(true);
        setReadyToShowTab(false);
        setTimeout(() => {
          setHideCards(false);
          setCardsExiting(false);
        }, DELAY);
      }
    } else {
      setIntroDuration(650);
      setHideCards(false);
      setExitedCardCount(0);
      setReadyToShowTab(false);
      setCardsExiting(true);
    }

    if (location.pathname !== targetRoute) {
      navigate(targetRoute);
    }
  };

  return (
    <div>
      <div className="relative flex flex-wrap gap-4">
        <div className="flex gap-4 w-full">
          <div className="flex gap-4 w-full">
            <div className="flex flex-col gap-4">
              <AnimatedCard
                direction="left"
                delay={100}
                triggerExit={cardsExiting}
                className={`z-100 h-56 flex flex-col justify-between w-80 shrink-0 ${hideCards ? 'hidden' : ''}`}
                onExitComplete={handleCardExited}
              >
                <h1 className="text-[color:var(--primary)] text-4xl font-bold">Jacob Murrah</h1>
                <p className="flex items-center gap-2">
                  <SvgIcon src={ICONS.code} alt="Code Icon" color="var(--primary)" size="small" />
                  Full Stack Software Developer
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
                  <SvgIcon
                    src={ICONS.mapPin}
                    alt="Map Pin Icon"
                    color="var(--primary)"
                    size="small"
                  />
                  Atlanta, GA
                </p>
                <a href="mailto:jacob@murrah.dev" className="flex items-center gap-2 w-fit">
                  <SvgIcon src={ICONS.mail} alt="Email Icon" color="var(--primary)" size="small" />
                  <span className="underline">jacob@murrah.dev</span>
                </a>
              </AnimatedCard>

              <AnimatedCard
                direction="left"
                delay={350}
                triggerExit={cardsExiting}
                className={`z-100 flex justify-between items-center ${hideCards ? 'hidden' : ''}`}
                onExitComplete={handleCardExited}
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
                triggerExit={cardsExiting}
                className={`z-100 ${hideCards ? 'hidden' : ''}`}
                onExitComplete={handleCardExited}
              >
                <p className="text-[color:var(--primary)]">Currently ↓</p>
                <p>
                  Software Engineer I @{' '}
                  <a href="https://www.att.com/" target="_blank" rel="noopener noreferrer">
                    <span className="underline">AT&T</span>
                  </a>
                </p>
                <p>
                  OMSCS @{' '}
                  <a href="https://www.gatech.edu/" target="_blank" rel="noopener noreferrer">
                    <span className="underline">Georgia Tech</span>
                  </a>
                </p>
              </AnimatedCard>
            </div>
            <AnimatedCard
              direction="right"
              delay={1350}
              triggerExit={cardsExiting}
              className={`z-100 h-full w-full flex-1 ${hideCards ? 'hidden' : ''}`}
              onExitComplete={handleCardExited}
            >
              <ThemeToggle />
            </AnimatedCard>
          </div>
          <div className="flex flex-col gap-4 w-full min-w-[192px]">
            <div style={tabsAnimation.style} className="z-100 w-full">
              <Tabs
                onTabClick={handleTabClick}
                readyToExpand={readyToShowTab}
                selectedTab={activeTab}
              />
            </div>

            <AnimatedCard
              direction="right"
              delay={1550}
              triggerExit={cardsExiting}
              className={`z-100 w-48 h-full ml-auto flex items-center ${hideCards ? 'hidden' : ''}`}
              onExitComplete={handleCardExited}
            >
              <a
                href="/resume"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center gap-2 justify-center"
              >
                <SvgIcon
                  href="/resume"
                  src={ICONS.fileDownload}
                  alt="Resume"
                  hoverColor="var(--primary)"
                />
                Resume
              </a>
            </AnimatedCard>
          </div>
        </div>
        <AnimatedCard
          direction="bottom"
          delay={850}
          triggerExit={cardsExiting}
          className={`z-100 w-full flex flex-col gap-4 ${hideCards ? 'hidden' : ''}`}
          onExitComplete={handleCardExited}
        >
          <h2>Technologies</h2>
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
