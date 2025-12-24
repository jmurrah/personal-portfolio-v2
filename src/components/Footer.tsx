import { useEffect, useState } from 'react';
import { ICONS } from '@/assets';
import SvgIcon from '@/components/SvgIcon';

const TIMEZONE = 'America/New_York';

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

export default function Footer() {
  const [time, setTime] = useState(() => formatTime(new Date()));
  const [timeZoneName, setTimeZoneName] = useState(() => getTimeZoneName());
  const year = new Date().getFullYear();
  const socialLinks = [
    {
      label: 'Email',
      href: 'mailto:jacob@murrah.dev',
      icon: ICONS.mail,
    },
    {
      label: 'GitHub',
      href: 'https://github.com/jmurrah',
      icon: ICONS.gitHub,
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/jacobmurrah/',
      icon: ICONS.linkedIn,
    },
  ];

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTime(formatTime(new Date()));
    }, 1000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    setTimeZoneName(getTimeZoneName());
  }, []);

  return (
    <footer className="mt-10 w-full max-w-2xl rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)] px-5 py-4 text-sm text-[color:var(--text-muted)]">
      <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 md:flex-row">
        <span className="whitespace-nowrap">© {year} Jacob Murrah</span>
        <div className="flex flex-wrap gap-x-8 gap-y-4 sm:gap-x-4 justify-center items-center">
          <div className="flex items-center gap-1.5 font-mono text-xs">
            <SvgIcon src={ICONS.clock} alt="Clock" size="3xsmall" color="var(--text-muted)" />
            <span className="text-[color:var(--text-main)] italic">{time}</span>
            <span className="text-[color:var(--text-muted)]">{timeZoneName}</span>
          </div>
          <span className="hidden h-4 w-px bg-[color:var(--border)] sm:inline-block" />
          <div className="flex items-center gap-3">
            {socialLinks.map((link) => (
              <SvgIcon
                key={link.label}
                href={link.href}
                src={link.icon}
                alt={link.label}
                size="xsmall"
                color="var(--text-muted)"
                hoverColor="var(--primary)"
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
