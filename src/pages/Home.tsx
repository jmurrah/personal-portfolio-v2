import Card from '@/components/Card';
import ThemeToggle from '@/components/ThemeToggle';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import SvgIcon from '@/components/SvgIcon';
import TechnologyBadge from '@/components/TechnologyBadge';

const technologies = [
  { name: 'TypeScript', logoSrc: '/logos/TypeScriptLogo.svg', accent: 'rgba(49, 120, 198, 0.2)' },
  { name: 'React', logoSrc: '/logos/ReactLogo.svg', accent: 'rgba(97, 218, 251, 0.2)' },
  { name: 'Supabase', logoSrc: '/logos/SupabaseLogo.svg', accent: 'rgba(63, 207, 142, 0.2)' },
  { name: 'MongoDB', logoSrc: '/logos/MongoDbLogo.svg', accent: 'rgba(89, 150, 54, 0.2)' },
  { name: 'Docker', logoSrc: '/logos/DockerLogo.svg', accent: 'rgba(0, 130, 202, 0.2)' },
  { name: 'AWS', logoSrc: '/logos/AWSLogo.svg', accent: 'rgba(255, 153, 0, 0.2)' },
  { name: 'Git', logoSrc: '/logos/GitLogo.svg', accent: 'rgba(241, 80, 47, 0.2)' },
  { name: 'Python', logoSrc: '/logos/PythonLogo.svg', accent: 'rgba(53, 114, 165, 0.2)' },
  { name: 'Java', logoSrc: '/logos/JavaLogo.svg', accent: 'rgba(244, 117, 87, 0.2)' },
];

export default function Home() {
  return (
    <div>
      <ThemeToggle />

      <div className="flex flex-wrap gap-4">
        <div className="flex flex-col gap-4">
          <Card className="h-56 flex flex-col justify-between w-80 shrink-0">
            <h1 className="text-[color:var(--primary)] text-4xl font-bold">Jacob Murrah</h1>
            <p>
              <CodeOutlinedIcon sx={{ fontSize: 24, color: 'var(--primary)', marginRight: 1.5 }} />
              Full Stack Software Developer
            </p>
            <p>
              <CalendarMonthOutlinedIcon
                sx={{ fontSize: 24, color: 'var(--primary)', marginRight: 1.5 }}
              />
              2+ Years of Experience
            </p>
            <p>
              <PlaceOutlinedIcon sx={{ fontSize: 24, color: 'var(--primary)', marginRight: 1.5 }} />
              Atlanta, GA
            </p>
            <a href="mailto:jacob@murrah.dev">
              <EmailOutlinedIcon sx={{ fontSize: 24, color: 'var(--primary)', marginRight: 1.5 }} />
              jacob@murrah.dev
            </a>
          </Card>
          <Card className="flex justify-between items-center">
            <SvgIcon href="https://github.com/jmurrah" src="/icons/GitHubIcon.svg" alt="GitHub" />
            <SvgIcon
              href="https://linkedin.com/in/jacobhmurrah"
              src="/icons/LinkedInIcon.svg"
              alt="LinkedIn"
            />
            <SvgIcon
              href="https://leetcode.com/jmurrah"
              src="/icons/LeetCodeIcon.svg"
              alt="LeetCode"
            />
            <SvgIcon
              href="https://www.buymeacoffee.com/jmurrah"
              src="/icons/CoffeeIcon.svg"
              alt="Buy Me a Coffee"
            />
            <SvgIcon href="mailto:jacob@murrah.dev" src="/icons/MailIcon.svg" alt="Email" />
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

        <Card className="flex flex-col gap-2 w-full">
          <h2>About</h2>
          <h2>Experience</h2>
          <h2>Education</h2>
          <h2>Projects</h2>
          <h2>Resume</h2>
        </Card>
        <Card className="w-full flex flex-col gap-4">
          <h2>Technologies</h2>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <TechnologyBadge key={tech.name} {...tech} />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
