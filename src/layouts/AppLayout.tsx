import { useEffect, useRef, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
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
  const [headerHeight, setHeaderHeight] = useState(0);
  const { pathname } = useLocation();
  const headerSentinelRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);

  const mainNavItems: NavItem[] = [
    { title: 'Home', href: '/' },
    { title: 'Projects', href: '/projects' },
    { title: 'Blog', href: '/blog' },
    { title: 'Resume', href: '/JacobMurrahResume.pdf', external: true },
  ];

  const toggleSidebar = () => setIsSidebarOpen((current) => !current);
  const closeSidebar = () => setIsSidebarOpen(false);

  useEffect(() => {
    const sentinel = headerSentinelRef.current;
    if (!sentinel || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsHeaderStuck(!entry.isIntersecting);
    });

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    closeSidebar();
  }, [pathname]);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    let frame = 0;
    const updateHeight = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setHeaderHeight(header.getBoundingClientRect().height);
      });
    };

    updateHeight();

    const resizeObserver =
      typeof ResizeObserver !== 'undefined' ? new ResizeObserver(updateHeight) : null;
    if (resizeObserver) {
      resizeObserver.observe(header);
    } else {
      window.addEventListener('resize', updateHeight);
    }

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener('resize', updateHeight);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="flex flex-col items-center pb-4 sm:pb-10 w-full min-h-screen">
      <div ref={headerSentinelRef} className="h-6 sm:h-12 w-full" aria-hidden="true" />
      <header
        ref={headerRef}
        className={`w-full bg-[color:var(--bg)] ${
          isHeaderStuck ? 'fixed left-0 right-0 top-0 z-11' : 'sticky top-0 z-11'
        }`}
      >
        <div
          className={`mx-auto flex h-24 w-full max-w-3xl items-center justify-between px-4 select-none border-b ${
            isHeaderStuck ? 'border-[color:var(--border)]' : 'border-transparent'
          }`}
        >
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
                  onClick={closeSidebar}
                >
                  {item.title}
                </a>
              ) : (
                <Link
                  key={item.title}
                  to={item.href}
                  className="nav-link hover:text-[color:var(--primary)] rounded px-3 py-2 text-sm font-medium"
                  onClick={closeSidebar}
                >
                  {item.title}
                </Link>
              ),
            )}
          </nav>
        </div>
      </header>
      <div
        aria-hidden="true"
        className="w-full mb-2 sm:mb-6"
        style={{ height: isHeaderStuck ? headerHeight : 0 }}
      />

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
        className="bg-[color:var(--surface)] border-[color:var(--border)] fixed inset-y-0 right-0 z-40 flex w-64 flex-col border-l shadow-xl transition-[transform,opacity] duration-300 ease-in-out"
        inert={!isSidebarOpen}
        style={{
          transform: isSidebarOpen ? 'translateX(0)' : 'translateX(100%)',
          opacity: isSidebarOpen ? 1 : 0,
          pointerEvents: isSidebarOpen ? 'auto' : 'none',
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

        <div className="border-[color:var(--border)] flex-shrink-0 border-b p-4">
          <ThemeFontToggle isCompact />
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
  );
}
