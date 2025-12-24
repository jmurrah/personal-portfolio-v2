import { useEffect, useState } from 'react';

const EST_TIMEZONE = 'America/New_York';

function formatEstTime(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: EST_TIMEZONE,
  }).format(date);
}

export default function CurrentTime() {
  const [time, setTime] = useState(() => formatEstTime(new Date()));
  const [timeZoneName, setTimeZoneName] = useState('ET');

  useEffect(() => {
    const nameFormatter = new Intl.DateTimeFormat('en-US', {
      timeZone: EST_TIMEZONE,
      timeZoneName: 'short',
    });
    const tzPart = nameFormatter
      .formatToParts(new Date())
      .find((part) => part.type === 'timeZoneName');
    if (tzPart?.value) {
      setTimeZoneName(tzPart.value);
    }
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTime(formatEstTime(new Date()));
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="h-full w-full flex justify-center items-center">
      <p className="font-mono text-base">
        <span className="italic">{time}</span>{' '}
        <span className="text-base font-semibold text-[color:var(--text-muted)]">
          {timeZoneName}
        </span>
      </p>
    </div>
  );
}
