import { Link, Outlet } from 'react-router-dom';
import { LoginButton } from '../auth/LoginButton';

interface LayoutProps {
  user: { username: string } | null;
}

export function Layout({ user }: LayoutProps) {
  return (
    <div className="layout">
      <nav className="main-nav">
        <div className="nav-brand">
          <Link to="/">Execodex</Link>
        </div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/vault">Vault</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
        <div className="nav-auth">
          {user ? (
            <span>Welcome, {user.username}</span>
          ) : (
            <LoginButton />
          )}
        </div>
      </nav>
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
