import { useEffect, useState } from 'react';

const GITHUB_COMMIT_ENDPOINT =
  'https://api.github.com/repos/jmurrah/personal-portfolio-v2/commits/main';

const formatCommitDate = (isoDate: string | undefined): string | null => {
  if (!isoDate) return null;
  const timestamp = new Date(isoDate);
  if (Number.isNaN(timestamp.getTime())) return null;
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(timestamp);
};

export default function LastUpdated() {
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchLatestCommit = async () => {
      try {
        const response = await fetch(GITHUB_COMMIT_ENDPOINT);
        if (!response.ok) {
          throw new Error(`Failed to fetch last updated date (${response.status})`);
        }

        const payload = await response.json();
        const formattedDate =
          formatCommitDate(payload?.commit?.author?.date) ??
          formatCommitDate(payload?.commit?.committer?.date);

        if (isMounted) {
          setLastUpdated(formattedDate);
        }
      } catch (error) {
        console.error(error);
        if (isMounted) {
          setLastUpdated(null);
        }
      } finally {
        if (isMounted) {
          setIsLoadingUpdate(false);
        }
      }
    };

    fetchLatestCommit();

    return () => {
      isMounted = false;
    };
  }, []);

  const lastUpdatedLabel =
    lastUpdated ?? (isLoadingUpdate ? 'Fetching...' : 'Unable to load latest update');

  return (
    <p className="text-[color:var(--text)] flex items-center gap-2 mb-2 relative z-10">
      <span className="primary">[</span>
      <span className="main">Last Updated:</span>
      <span className="main">{lastUpdatedLabel}</span>
      <span className="primary">]</span>
    </p>
  );
}
