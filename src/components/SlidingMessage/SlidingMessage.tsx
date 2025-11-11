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
  const marqueeMessages = cleanedMessages;
  const infiniteStream = [...marqueeMessages, ...marqueeMessages];
  const animationDuration = `${Math.max(duration, 6)}s`;
  const trackItems = infiniteStream.flatMap((message, index) => {
    const nodes = [
      <span key={`msg-${index}-${message}`} className="sliding-message__item">
        {message}
      </span>,
    ];

    const isLast = index === infiniteStream.length - 1;
    if (!isLast) {
      nodes.push(
        <span
          key={`sep-${index}`}
          aria-hidden="true"
          className="sliding-message__separator"
        />,
      );
    }

    return nodes;
  });

  return (
    <div className={`sliding-message ${className}`.trim()} role="status" aria-live="polite">
      <div className="sliding-message__mask">
        <div className="sliding-message__track" style={{ animationDuration }}>
          {trackItems}
        </div>
      </div>
    </div>
  );
}
