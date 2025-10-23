import React from 'react';

interface TimelineItemProps {
  href: string;
  imgSrc: string;
  imgAlt: string;
  timeStart: string;
  timeEnd: string;
  title: string;
  subtitle: string;
  bulletPoints?: string[];
  tags?: React.ReactNode[];
}

export default function TimelineItem({
  href,
  imgSrc,
  imgAlt,
  timeStart,
  timeEnd,
  title,
  subtitle,
  bulletPoints,
  tags = [],
}: TimelineItemProps) {
  const [active, setActive] = React.useState(false);
  const handleMouseEnter: React.MouseEventHandler<HTMLAnchorElement> = () => {
    setActive(true);
    console.log('hovered');
  };
  const handleMouseLeave = () => {
    console.log('unhovered');
    setActive(false);
  };

  return (
    <li className="group flex flex-row items-start">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="flex items-center justify-center bg-white border relative z-10 "
        style={{ borderColor: active ? 'var(--primary)' : 'var(--text-muted)' }}
      >
        <span className="relative flex shrink-0 overflow-hidden size-14">
          <img
            className="aspect-square h-full w-full bg-background object-contain"
            alt={imgAlt}
            src={imgSrc}
            loading="eager"
          />
        </span>
      </a>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="w-6 h-14"
      ></a>
      <div className="flex flex-1 flex-col justify-start gap-1">
        <time className="text-xs text-muted-foreground block">
          <span>{timeStart}</span>
          <span> - </span>
          <span>{timeEnd}</span>
        </time>

        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="font-semibold leading-none w-fit"
          style={{ color: active ? 'var(--primary)' : 'var(--text-muted)' }}
        >
          {title}
        </a>

        <p className="text-sm text-muted-foreground">{subtitle}</p>
        {bulletPoints && (
          <ul className="ml-4 list-outside list-disc">
            {bulletPoints.map((point, index) => (
              <li key={index} className="prose pr-8 text-sm dark:prose-invert">
                {point}
              </li>
            ))}
          </ul>
        )}

        {tags && tags.length > 0 && (
          <div className="mt-2 flex flex-row flex-wrap items-start gap-2">
            {tags.map((tag, idx) => (
              <React.Fragment key={idx}>{tag}</React.Fragment>
            ))}
          </div>
        )}
      </div>
    </li>
  );
}
