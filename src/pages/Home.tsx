import { useState } from 'react';
import AnimatedCard from '@/components/AnimatedCard';
import SvgIcon from '@/components/SvgIcon';
import TechnologyBadge from '@/components/TechnologyBadge';
import Tabs from '@/components/NavCard/NavCard';
import { useSlideAnimation } from '@/hooks/useSlideAnimation';
import ThemeToggle from '@/components/ThemeToggle';

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

const DELAY = 800;
export default function Home() {
  const [selectedTabId, setSelectedTabId] = useState('');
  const [readyToShowTab, setReadyToShowTab] = useState(false);
  const [cardsExiting, setCardsExiting] = useState(false);
  const [exitedCardCount, setExitedCardCount] = useState(0);
  const [hideCards, setHideCards] = useState(false);
  const totalCards = 4;

  const tabsAnimation = useSlideAnimation({
    direction: 'top',
    delay: 1100,
    duration: 1000,
    isExiting: false,
  });

  const handleAllCardsExited = () => {
    setHideCards(true);
    setReadyToShowTab(true);
  };

  const handleCardExited = () => {
    setExitedCardCount((prev) => {
      const newCount = prev + 1;
      if (newCount === totalCards) {
        handleAllCardsExited();
      }
      return newCount;
    });
  };

  const handleTabClick = (tabId: string) => {
    setSelectedTabId(tabId);
    setExitedCardCount(0);
    setReadyToShowTab(false);

    if (tabId === '') {
      setCardsExiting(true);
      setTimeout(() => {
        setHideCards(false);
        setCardsExiting(false);
      }, DELAY);
    } else {
      setHideCards(false);
      setCardsExiting(true);
    }
  };

  return (
    <div>
      <div className="relative flex flex-wrap gap-4">
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
              <a href="mailto:jacob@murrah.dev" className="flex items-center gap-2 w-fit">
                <SvgIcon
                  src="/icons/MailIcon.svg"
                  alt="Email Icon"
                  color="var(--primary)"
                  size="small"
                />
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
              <SvgIcon href="https://github.com/jmurrah" src="/icons/GitHubIcon.svg" alt="GitHub" />
              <SvgIcon
                href="https://linkedin.com/in/jacobmurrah"
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
          <div className="flex flex-col gap-4 w-full">
            <div style={tabsAnimation.style} className="z-100 w-full">
              <Tabs onTabClick={handleTabClick} readyToExpand={readyToShowTab} />
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
                  src="/icons/FileDownloadIcon.svg"
                  alt="Resume"
                  hoverColor="var(--primary)"
                />
                Resume
              </a>
            </AnimatedCard>

            {/* <AnimatedCard
              direction="right"
              delay={1350}
              triggerExit={cardsExiting}
              className={`z-100 h-full ${hideCards ? 'hidden' : ''}`}
              onExitComplete={handleCardExited}
            >
              <ThemeToggle />
            </AnimatedCard> */}
          </div>
        </div>
        <div className="z-100">
          <ThemeToggle />
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
