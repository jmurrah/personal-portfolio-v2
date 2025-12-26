import { useEffect, useRef, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { ICONS } from '@/assets';
import Footer from '@/components/Footer';
import PreloadAssets from '@/components/PreloadAssets';
import PrimaryColorSelector from '@/components/PrimaryColorSelector';
import SvgIcon from '@/components/SvgIcon';
import TerminalBreadcrumb from '@/components/TerminalBreadcrumb';
import ThemeToggle from '@/components/ThemeToggle';

type NavItem = {
  title: string;
  href: string;
  external?: boolean;
};

export default function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isHeaderStuck, setIsHeaderStuck] = useState(false);
  const { pathname } = useLocation();
  const headerSentinelRef = useRef<HTMLDivElement | null>(null);

  const mainNavItems: NavItem[] = [
    { title: 'Home', href: '/' },
    { title: 'Projects', href: '/projects' },
    { title: 'Blog', href: '/blog' },
    { title: 'Resume', href: '/JacobMurrahResume.pdf', external: true },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen((current) => !current);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    const sentinel = headerSentinelRef.current;
    if (!sentinel || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsHeaderStuck(!entry.isIntersecting);
    });

    observer.observe(sentinel);
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <PreloadAssets />
      <div className="flex flex-col items-center py-4 sm:py-10 w-full min-h-screen">
        <div ref={headerSentinelRef} className="h-px w-full" aria-hidden="true" />
        <header
          className={`max-w-3xl sticky top-0 z-11 w-full bg-[color:var(--bg)] mb-2 sm:mb-6 border-b ${
            isHeaderStuck ? 'border-[color:var(--border)]' : 'border-transparent'
          }`}
        >
          <div className="flex h-24 w-full items-center justify-between px-4 select-none">
            <TerminalBreadcrumb />
            <button
              type="button"
              onClick={toggleSidebar}
              className="nav-link hover:text-[var(--primary)] rounded p-2 min-[576px]:hidden"
              aria-label="Open navigation menu"
              aria-expanded={isSidebarOpen}
              aria-controls="sidebar-nav"
            >
              <SvgIcon src={ICONS.menu} alt="" size="medium" style={{ width: 24, height: 24 }} />
              <span className="sr-only">Menu</span>
            </button>
            <nav className="hidden items-center space-x-4 min-[576px]:flex">
              {mainNavItems.map((item) =>
                item.external ? (
                  <a
                    key={item.title}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nav-link hover:text-[var(--primary)] rounded px-3 py-2 text-sm font-medium"
                  >
                    {item.title}
                  </a>
                ) : (
                  <Link
                    key={item.title}
                    to={item.href}
                    className="nav-link hover:text-[color:var(--primary)] rounded px-3 py-2 text-sm font-medium"
                  >
                    {item.title}
                  </Link>
                ),
              )}
            </nav>
          </div>
        </header>
        {isSidebarOpen ? (
          <div
            className="fixed inset-0 z-30 bg-black/25 backdrop-blur-sm"
            onClick={closeSidebar}
            onKeyDown={(event) => {
              if (event.key === 'Escape') {
                closeSidebar();
              }
            }}
            role="button"
            tabIndex={-1}
            aria-label="Close sidebar"
          />
        ) : null}

        <aside
          id="sidebar-nav"
          aria-hidden={!isSidebarOpen}
          className="bg-[color:var(--surface)] border-[color:var(--border)] fixed inset-y-0 right-0 z-40 flex w-64 flex-col border-l shadow-xl transition-transform duration-300 ease-in-out"
          style={{
            transform: isSidebarOpen ? 'translateX(0)' : 'translateX(100%)',
            opacity: isSidebarOpen ? 1 : 0,
            pointerEvents: isSidebarOpen ? 'auto' : 'none',
          }}
        >
          <div className="border-[color:var(--border)] flex h-16 flex-shrink-0 items-center justify-between border-b p-4">
            <span className="text-[color:var(--primary)] font-mono text-lg font-semibold">
              Navigation
            </span>
            <button
              type="button"
              onClick={closeSidebar}
              className="nav-link text-[color:var(--text-muted)] hover:text-[color:var(--primary)] rounded"
              aria-label="Close navigation menu"
            >
              Close
            </button>
          </div>

          <div className="border-[color:var(--border)] flex-shrink-0 border-b p-4">
            <div className="pb-4">
              <ThemeToggle />
            </div>
            <PrimaryColorSelector />
          </div>

          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2" role="list">
              {mainNavItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.title}>
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="nav-link hover:text-[color:var(--primary)] hover:bg-[color:var(--surface)] focus:bg-[color:var(--surface)] block rounded p-2 focus:outline-none"
                        onClick={closeSidebar}
                      >
                        {item.title}
                      </a>
                    ) : (
                      <Link
                        to={item.href}
                        className="nav-link hover:text-[color:var(--primary)] hover:bg-[color:var(--surface)] focus:bg-[color:var(--surface)] block rounded p-2 focus:outline-none"
                        aria-current={isActive ? 'page' : undefined}
                        onClick={closeSidebar}
                      >
                        {item.title}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        <main className="w-full max-w-2xl px-4">
          <div className="w-full min-w-0 break-words">
            <Outlet />
          </div>
        </main>
        <div className="w-full px-4 flex justify-center items-center mt-auto">
          <Footer />
        </div>
      </div>
    </>
  );
}
