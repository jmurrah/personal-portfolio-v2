interface TimelineProps {
  children: React.ReactNode;
}
export default function Timeline({ children }: TimelineProps) {
  return (
    <div className="relative">
      <ul className="relative flex flex-col py-10 gap-10 items-start before:content-[''] before:absolute before:left-[28px] before:top-0 before:bottom-0 before:w-0.25 before:bg-[var(--text)]">
        {children}
      </ul>
    </div>
  );
}
