import { Link, useLocation, useNavigate } from 'react-router-dom';
import './TerminalBreadcrumb.css';

const MAX_SEGMENTS = 4;

const getSegments = (pathname: string) =>
  pathname.split('/').filter(Boolean).slice(0, MAX_SEGMENTS);

export default function TerminalBreadcrumb() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const segments = getSegments(pathname);

  const scrollToTop = (behavior: ScrollBehavior = 'smooth') => {
    const targets = [document.scrollingElement, document.documentElement, document.body] as const;
    targets.forEach((target) => target?.scrollTo({ top: 0, behavior }));
    window.scrollTo({ top: 0, behavior });
  };

  const handleHomeClick: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
    if (pathname === '/') {
      event.preventDefault();
      scrollToTop('smooth');
    } else {
      scrollToTop('auto');
      navigate('/');
    }
  };

  return (
    <nav className="terminal-breadcrumb" aria-label="Breadcrumbs">
      <ul className="terminal-breadcrumb__list">
        <li className="terminal-breadcrumb__item">
          <Link
            className="terminal-breadcrumb__link terminal-breadcrumb__link--home"
            to="/"
            onClick={handleHomeClick}
          >
            ~<span className="terminal-breadcrumb__home-slash">/</span>
          </Link>
        </li>
        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1;
          const href = `/${segments.slice(0, index + 1).join('/')}`;
          return (
            <li className="terminal-breadcrumb__item" key={`${segment}-${index}`}>
              <Link
                className={`terminal-breadcrumb__link${isLast ? ' terminal-breadcrumb__current' : ''}`}
                to={href}
                aria-current={isLast ? 'page' : undefined}
                onClick={(event) => {
                  if (isLast && pathname === href) {
                    event.preventDefault();
                    scrollToTop('smooth');
                  } else {
                    scrollToTop('auto');
                  }
                }}
              >
                {segment}/
              </Link>
            </li>
          );
        })}
        <li className="terminal-breadcrumb__item" aria-hidden="true">
          <span className="terminal-breadcrumb__cursor" />
        </li>
      </ul>
    </nav>
  );
}
