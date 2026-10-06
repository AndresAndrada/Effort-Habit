import { useNavigate } from 'react-router-dom'
import useLogout from '../../auth/hooks/useLogout';
import { useUiStore } from '../../../stores'
import { useAuth } from '../../../hooks/useAuth.js';
import SideBar from './SideBar';
import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, user: authUser } = useAuth();
  const { DarkMode, setDarkMode } = useUiStore();
  const [showNavbar, setShowNavbar] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const { logout } = useLogout();

  const handlerSision = () => {
    isAuthenticated
      ? logout()
      : navigate('/sign-in')
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < lastScrollY.current) {
        setShowNavbar(true);
      } else if (window.scrollY > lastScrollY.current && window.scrollY > 80) {
        setShowNavbar(false);
      }
      setScrolled(window.scrollY > 20);
      lastScrollY.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ease-out ${
        showNavbar ? 'translate-y-0' : '-translate-y-full'
      } ${
        scrolled
          ? `${DarkMode ? 'bg-primary/95' : 'bg-secondary/95'} backdrop-blur-xl shadow-card`
          : `${DarkMode ? 'bg-primary/70' : 'bg-secondary/70'} backdrop-blur-md`
      }`}
    >
      <nav className="section-container flex items-center justify-between h-16 sm:h-18">
        {/* Sidebar trigger + Logo */}
        <div className="flex items-center gap-3">
          <SideBar />
          <Link
            to="/"
            className="flex items-center gap-2 group focus-ring rounded-lg"
            aria-label="Effort&Habit - Inicio"
          >
            <span className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-effort-600 text-white font-extrabold text-lg shadow-sm group-hover:bg-effort-700 transition-colors duration-200">
              E
            </span>
            <span className="hidden sm:flex flex-col leading-none">
              <span className={`text-heading-sm font-bold tracking-tight ${DarkMode ? 'text-secondary' : 'text-primary'}`}>
                Effort<span className="text-effort-500">&</span>Habit
              </span>
              <span className="text-caption text-base-400 uppercase tracking-wider hidden md:block">
                Entrenamiento
              </span>
            </span>
          </Link>
        </div>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          <NavLink to="/dashboard" label="Panel de control" DarkMode={DarkMode} />
          <NavLink to="/ejercicios" label="Ejercicios" DarkMode={DarkMode} />
          <NavLink to="/usuarios" label="Usuarios" DarkMode={DarkMode} />
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Theme toggle */}
          <button
            onClick={() => setDarkMode(!DarkMode)}
            className={`btn btn-ghost btn-circle btn-sm focus-ring ${DarkMode ? 'text-secondary hover:bg-secondary/10' : 'text-primary hover:bg-primary/10'}`}
            aria-label={DarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          >
            {DarkMode ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
              </svg>
            )}
          </button>

          {/* User menu */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className={`btn btn-ghost btn-circle btn-sm avatar focus-ring ${DarkMode ? 'text-secondary' : 'text-primary'}`}
              aria-label="Menú de usuario"
            >
              <div className="w-9 rounded-full ring-2 ring-effort-500/40 ring-offset-2 ring-offset-transparent">
                <img
                  alt={authUser?.name || 'Avatar de usuario'}
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className={`menu menu-sm dropdown-content mt-3 z-50 w-56 p-2 shadow-card-elevated rounded-xl border ${
                DarkMode
                  ? 'bg-primary text-secondary border-secondary/10'
                  : 'bg-secondary text-primary border-primary/10'
              }`}
            >
              {isAuthenticated ? (
                <>
                  <li className="menu-title px-4 py-2">
                    <span className={`${DarkMode ? 'text-secondary/60' : 'text-primary/60'} text-caption uppercase tracking-wider`}>
                      {authUser?.name || 'Usuario'}
                    </span>
                  </li>
                  <li>
                    <button
                      onClick={() => navigate(`/profile/${authUser?.id}`)}
                      className="justify-between rounded-lg hover:bg-effort-50 dark:hover:bg-effort-950/30 hover:text-effort-600 transition-colors"
                    >
                      Perfil
                      <span className="badge badge-sm badge-outline border-effort-500 text-effort-500">
                        {authUser?.role || 'user'}
                      </span>
                    </button>
                  </li>
                  <li>
                    <button className="justify-between rounded-lg hover:bg-effort-50 dark:hover:bg-effort-950/30 hover:text-effort-600 transition-colors">
                      Configuración
                    </button>
                  </li>
                  <li className="mt-1 pt-1 border-t border-current/10">
                    <button
                      onClick={handlerSision}
                      className="rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                    >
                      Cerrar sesión
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <button
                    onClick={handlerSision}
                    className="rounded-lg bg-effort-600 text-white hover:bg-effort-700 transition-colors justify-center font-semibold"
                  >
                    Iniciar sesión
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

/* eslint-disable react/prop-types */
function NavLink({ to, label, DarkMode }) {
  return (
    <Link
      to={to}
      className={`px-4 py-2 rounded-lg text-body-sm font-medium transition-all duration-200 focus-ring ${
        DarkMode
          ? 'text-secondary/80 hover:text-effort-400 hover:bg-effort-950/30'
          : 'text-primary/80 hover:text-effort-600 hover:bg-effort-50'
      }`}
    >
      {label}
    </Link>
  );
}
