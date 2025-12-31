import { useEffect, useRef, useState } from 'react';
import { Link, Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import { ICONS } from '@/assets';
import Footer from '@/components/Footer';
import ThemeFontToggle from '@/components/ThemeFontToggle';
import SvgIcon from '@/components/SvgIcon';
import TerminalBreadcrumb from '@/components/TerminalBreadcrumb';

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

  const toggleSidebar = () => setIsSidebarOpen((current) => !current);
  const closeSidebar = () => setIsSidebarOpen(false);
  const scrollToTop = (behavior: ScrollBehavior = 'auto') => {
    const targets = [document.scrollingElement, document.documentElement, document.body] as const;
    targets.forEach((target) => target?.scrollTo({ top: 0, behavior }));
    window.scrollTo({ top: 0, behavior });
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    closeSidebar();
  }, [pathname]);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (!isSidebarOpen) return;

    const html = document.documentElement;
    const body = document.body;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;

    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';

    return () => {
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
    };
  }, [isSidebarOpen]);

  useEffect(() => {
    const sentinel = headerSentinelRef.current;
    if (!sentinel || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(([entry]) => {
      setIsHeaderStuck(!entry.isIntersecting);
    });
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col items-center pb-4 sm:pb-10 w-full min-h-screen">
      <ScrollRestoration />
      <div ref={headerSentinelRef} className="h-6 sm:h-12 w-full shrink-0" aria-hidden="true" />
      <header className="sticky top-0 z-20 w-full bg-[color:var(--bg)]/90 backdrop-blur-md">
        <div className="w-full mx-auto max-w-3xl px-4">
          <div
            className={`flex h-24 items-center justify-between px-4 pt-5 pb-6 select-none border-b ${
              isHeaderStuck ? 'border-[color:var(--border)]' : 'border-transparent'
            }`}
            style={{
              WebkitMaskImage: isHeaderStuck
                ? 'none'
                : 'linear-gradient(black, black, transparent)',
              maskImage: isHeaderStuck ? 'none' : 'linear-gradient(black, black, transparent)',
            }}
          >
            <TerminalBreadcrumb />
            <button
              type="button"
              onClick={toggleSidebar}
              className="nav-link hover:text-[var(--primary)] rounded min-[576px]:hidden"
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
                    onClick={closeSidebar}
                  >
                    {item.title}
                  </a>
                ) : (
                  <Link
                    key={item.title}
                    to={item.href}
                    className="nav-link hover:text-[color:var(--primary)] rounded px-3 py-2 text-sm font-medium"
                    onClick={(event) => {
                      if (pathname === item.href) {
                        event.preventDefault();
                        scrollToTop('smooth');
                      }
                      closeSidebar();
                    }}
                  >
                    {item.title}
                  </Link>
                ),
              )}
            </nav>
          </div>
        </div>
      </header>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/25 backdrop-blur-sm transition-opacity duration-300 ease-in-out opacity-100 pointer-events-auto"
          onClick={closeSidebar}
          onKeyDown={(event) => {
            if (
              event.key === 'Escape' ||
              event.key === 'Enter' ||
              event.key === ' ' ||
              event.key === 'Spacebar'
            ) {
              event.preventDefault();
              closeSidebar();
            }
          }}
          role="button"
          tabIndex={0}
          aria-label="Close sidebar"
        />
      )}

      <aside
        id="sidebar-nav"
        className="bg-[color:var(--surface)] border-[color:var(--border)] fixed right-0 z-40 flex w-[265px] flex-col overflow-y-auto scrollbar border-l shadow-xl transition-[transform,opacity] duration-300 ease-in-out"
        inert={!isSidebarOpen}
        style={{
          top: 0,
          height: '100vh',
          transform: isSidebarOpen ? 'translateX(0)' : 'translateX(100%)',
          opacity: isSidebarOpen ? 1 : 0,
          pointerEvents: isSidebarOpen ? 'auto' : 'none',
          scrollbarGutter: 'stable both-edges',
        }}
      >
        <div className="border-[color:var(--border)] flex h-16 flex-shrink-0 items-center justify-between border-b p-4">
          <span className="text-[color:var(--primary)] text-lg font-semibold">Navigation</span>
          <button
            type="button"
            onClick={closeSidebar}
            className="nav-link text-[color:var(--text-muted)] hover:text-[color:var(--primary)] rounded"
            aria-label="Close navigation menu"
          >
            Close
          </button>
        </div>

        <nav className="p-4 border-b border-[color:var(--border)]">
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
                      onClick={(event) => {
                        if (pathname === item.href) {
                          event.preventDefault();
                          scrollToTop('smooth');
                        }
                        closeSidebar();
                      }}
                    >
                      {item.title}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4">
          <div className="w-full flex flex-col gap-3 self-start shrink-0">
            <h2 className="flex items-center gap-2 text-lg">
              <SvgIcon src={ICONS.paint} alt="Theme" size="medium" color="var(--primary)" />
              <span>Theme</span>
            </h2>
            <ThemeFontToggle tileSize={32} gap="0.75rem" />
          </div>
        </div>
      </aside>

      <main className="w-full max-w-2xl px-8">
        <div className="w-full min-w-0 break-words">
          <Outlet />
        </div>
      </main>

      <div className="w-full px-4 flex justify-center items-center mt-auto">
        <Footer />
      </div>
    </div>
  );
}
