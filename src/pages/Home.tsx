import Card from '@/components/Card';
import ThemeToggle from '@/components/ThemeToggle';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import SvgIcon from '@/components/SvgIcon';

export default function Home() {
  return (
    <div>
      <ThemeToggle />

      <div className="h-96 flex gap-4">
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
            <SvgIcon href="https://github.com/jmurrah" src="/GitHubIcon.svg" alt="GitHub" />
            <SvgIcon
              href="https://linkedin.com/in/jacobhmurrah"
              src="/LinkedInIcon.svg"
              alt="LinkedIn"
            />
            <SvgIcon href="https://leetcode.com/jmurrah" src="/LeetCodeIcon.svg" alt="LeetCode" />
            <SvgIcon
              href="https://www.buymeacoffee.com/jmurrah"
              src="/CoffeeIcon.svg"
              alt="Buy Me a Coffee"
            />
            <SvgIcon href="mailto:jacob@murrah.dev" src="/MailIcon.svg" alt="Email" />
          </Card>
        </div>
        <Card className="w-auto max-w-24">
          <img src="/JacobMurrahWaterfall.jpg" alt="Jacob Murrah" />
        </Card>

        <Card className="flex flex-col gap-2 w-full">
          <h2>About</h2>
          <h2>Experience</h2>
          <h2>Education</h2>
          <h2>Projects</h2>
          <h2>Resume</h2>
        </Card>
      </div>
    </div>
  );
}
