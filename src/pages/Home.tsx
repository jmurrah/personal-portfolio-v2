import { useState } from 'react';
import AnimatedCard from '@/components/AnimatedCard';
import SvgIcon from '@/components/SvgIcon';
import TechnologyBadge from '@/components/TechnologyBadge';
import Tabs from '@/components/Tabs/Tabs';
import { useSlideAnimation } from '@/hooks/useSlideAnimation';

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

export default function Home() {
  // State to track if cards should exit
  const [cardsExiting, setCardsExiting] = useState(false);

  // For Tabs component animation
  // const tabsAnimation = useSlideAnimation({ direction: 'top', delay: 1100 });

  // Handle tab click - make cards exit
  const handleTabClick = (tabId: string) => {
    // If tabId is empty string, tab is being closed
    if (tabId === '') {
      // Small delay to sync with tab closing animation
      setTimeout(() => {
        setCardsExiting(false);
      }, 100);
    } else {
      // Otherwise, make cards exit
      setCardsExiting(true);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap gap-4">
        <div className="flex gap-4 w-full">
          <div className="flex flex-col gap-4">
            <AnimatedCard
              direction="left"
              delay={100}
              triggerExit={cardsExiting}
              className="h-56 flex flex-col justify-between w-80 shrink-0"
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
              <a href="mailto:jacob@murrah.dev" className="flex items-center gap-2">
                <SvgIcon
                  src="/icons/MailIcon.svg"
                  alt="Email Icon"
                  color="var(--primary)"
                  size="small"
                />
                jacob@murrah.dev
              </a>
            </AnimatedCard>

            <AnimatedCard
              direction="left"
              delay={350}
              triggerExit={cardsExiting}
              className="flex justify-between items-center"
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

            <AnimatedCard direction="left" delay={600} triggerExit={cardsExiting}>
              <p className="text-[color:var(--primary)]">Currently ↓</p>
              <p>Software Engineer I @ AT&T</p>
              <p>OMSCS @ Georgia Tech</p>
            </AnimatedCard>
          </div>

          <Tabs onTabClick={handleTabClick} />
        </div>

        <AnimatedCard
          direction="left" // Changed from "bottom" to "left" so it completely exits the screen
          delay={850}
          triggerExit={cardsExiting}
          className="w-full flex flex-col gap-4"
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
