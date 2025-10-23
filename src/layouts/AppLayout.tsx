import { NavLink, Outlet } from 'react-router-dom';
import ThemeToggle from '@/components/ThemeToggle';

const navItems = [
  { label: 'home', to: '/', title: 'Portfolio overview' },
  { label: 'blog', to: '/blog', title: 'Blog posts and updates' },
  { label: 'contact', to: '/contact', title: 'Contact form' },
];

export default function AppLayout() {
  return (
    <>
      <header
        className="sticky top-0 z-50 border-b backdrop-blur-md flex justify-center"
        style={{
          backgroundColor: 'color-mix(in srgb, var(--bg-light) 75%, transparent)',
          borderColor: 'var(--card-border)',
        }}
      >
        <div className="w-full max-w-2xl p-4 flex items-center justify-between gap-4 py-6">
          <nav>
            <ul className="flex gap-6 list-none p-0 m-0">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    title={item.title}
                    className="lowercase text-[0.95rem] no-underline"
                    style={({ isActive }) => ({
                      color: isActive ? 'var(--primary)' : 'var(--text)',
                    })}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <ThemeToggle />
        </div>
      </header>
      <main className="flex justify-center">
        <div className="w-full max-w-2xl p-4 min-h-fit">
          <Outlet />
        </div>
      </main>
    </>
  );
}
