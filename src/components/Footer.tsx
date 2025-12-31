import { useEffect, useState } from 'react';
import { ICONS } from '@/assets';
import SvgIcon from '@/components/SvgIcon';

const TIMEZONE = 'America/New_York';

type SocialLink = {
  label: string;
  href: string;
  icon: string;
};

const SOCIAL_LINKS: SocialLink[] = [
  { label: 'Email', href: 'mailto:jacob@murrah.dev', icon: ICONS.mail },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jacobmurrah/', icon: ICONS.linkedIn },
  { label: 'GitHub', href: 'https://github.com/jmurrah', icon: ICONS.gitHub },
  { label: 'Resume', href: '/JacobMurrahResume.pdf', icon: ICONS.resume },
];

const formatTime = (date: Date) =>
  new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: TIMEZONE,
  }).format(date);

const getTimeZoneName = () => {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: TIMEZONE,
    timeZoneName: 'short',
  });
  const part = formatter.formatToParts(new Date()).find((item) => item.type === 'timeZoneName');
  return part?.value ?? 'ET';
};

const TIME_ZONE_NAME = getTimeZoneName();

export default function Footer() {
  const [time, setTime] = useState(() => formatTime(new Date()));
  const year = new Date().getFullYear();

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTime(formatTime(new Date()));
    }, 1000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <footer className="mt-16 w-full max-w-2xl rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)] px-5 py-4 text-sm text-[color:var(--text-muted)]">
      <div className="flex flex-col flex-wrap justify-between items-center gap-x-4 gap-y-2 min-[480px]:flex-row">
        <span className="whitespace-nowrap">© {year} Jacob Murrah</span>
        <div className="flex flex-wrap gap-x-8 gap-y-4 sm:gap-x-4 justify-center items-center">
          <div
            className="flex items-center gap-1.5 text-xs"
            style={{ fontFamily: 'var(--font-family)' }}
          >
            <SvgIcon src={ICONS.clock} alt="Clock" size="3xsmall" color="var(--text-muted)" />
            <span className="italic text-[var(--text-muted)]">{time}</span>
            <span className="text-[color:var(--text-muted)]">{TIME_ZONE_NAME}</span>
          </div>
          <span className="hidden h-4 w-px bg-[color:var(--border)] sm:inline-block" />
          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map((link) => (
              <SvgIcon
                key={link.label}
                href={link.href}
                src={link.icon}
                alt={link.label}
                size="xsmall"
                color="var(--text-muted)"
                hoverColor="var(--primary)"
                className="transition-transform duration-150 hover:-translate-y-0.5"
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
