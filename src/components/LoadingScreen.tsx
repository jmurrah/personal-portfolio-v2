export default function LoadingScreen() {
  return (
    <div
      className="fixed inset-0 z-50 bg-[color:var(--bg)]"
      role="status"
      aria-label="Loading"
      aria-live="polite"
    />
  );
}
