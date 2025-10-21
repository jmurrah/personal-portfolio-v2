import Card from '@/components/Card';
import ThemeToggle from '@/components/ThemeToggle';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';

export default function Home() {
  return (
    <div>
      <ThemeToggle />

      <div className="h-96 flex gap-4">
        <Card className="flex flex-col gap-2">
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
        <Card className="w-30">
          <img src="/JacobMurrahWaterfall.jpg" alt="Jacob Murrah" />
        </Card>

        <Card>
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
