import { Outlet, NavLink } from 'react-router-dom';
import Logo from './Logo.jsx';

export default function AuthLayout() {
  return (
    <div className="auth-layout">
      <aside className="auth-layout__sidebar">
        <Logo />
        <h1 className="auth-layout__title">CamisApp</h1>
        <p className="auth-layout__subtitle">
          Gestiona tu colección de camisetas personal con la seguridad de Supabase.
        </p>
        <nav className="auth-layout__nav">
          <NavLink to="/login" className={({ isActive }) => (isActive ? 'link active' : 'link')}>
            Iniciar sesión
          </NavLink>
          <NavLink
            to="/registro"
            className={({ isActive }) => (isActive ? 'link active' : 'link')}
          >
            Crear cuenta
          </NavLink>
        </nav>
      </aside>
      <main className="auth-layout__main">
        <Outlet />
      </main>
    </div>
  );
}
