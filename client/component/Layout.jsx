import { NavLink, Outlet } from 'react-router-dom'
import { portfolioOwner } from '../src/siteData'

const navItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/education', label: 'Education' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact' },
]

export default function Layout() {
  return (
    <div className="site-shell">
      <header className="site-header">
        {/* Brand area keeps the custom logo visible beside the site identity. */}
        <NavLink to="/" className="brand-mark">
          <img src="/logo.jpeg" alt="Amir Saad logo" className="brand-logo-image" />
          <span>
            <strong>{portfolioOwner.name}</strong>
            <small>{portfolioOwner.title}</small>
          </span>
        </NavLink>

        <nav className="site-nav" aria-label="Primary navigation">
          {/* Main navigation links for the six required portfolio pages. */}
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="page-content">
        <Outlet />
      </main>

      <footer className="site-footer">
        <p>{portfolioOwner.tagline}</p>
      </footer>
    </div>
  )
}
