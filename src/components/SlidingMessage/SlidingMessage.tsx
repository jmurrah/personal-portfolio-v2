import './SlidingMessage.css';

type SlidingMessageProps = {
  messages?: string[];
  duration?: number;
  className?: string;
};

export default function SlidingMessage({
  messages = [],
  duration = 10,
  className = '',
}: SlidingMessageProps) {
  const cleanedMessages = messages.filter((message) => message?.trim().length);

  if (!cleanedMessages.length) {
    return null;
  }

  const trackItems: React.ReactNode[] = [];
  for (let repeat = 0; repeat < 2; repeat += 1) {
    cleanedMessages.forEach((message, index) => {
      const keySuffix = `${repeat}-${index}`;
      trackItems.push(
        <span key={`msg-${keySuffix}`} className="sliding-message__item">
          {message}
        </span>,
      );

      trackItems.push(
        <span
          key={`sep-${keySuffix}`}
          aria-hidden="true"
          className="sliding-message__separator"
        />,
      );
    });
  }
  const animationDuration = `${Math.max(duration, 6)}s`;

  return (
    <div
      className={`sliding-message flex items-center ${className}`.trim()}
      role="status"
      aria-live="polite"
    >
      <div className="sliding-message__mask">
        <div className="sliding-message__track" style={{ animationDuration }}>
          {trackItems}
        </div>
      </div>
    </div>
  );
}
