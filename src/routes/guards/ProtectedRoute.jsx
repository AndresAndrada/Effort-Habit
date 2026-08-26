import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';
import { Loader } from '../../module/core/Loader';

/* eslint-disable react/prop-types */
export function ProtectedRoute({ fallbackPath = '/sign-in' }) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="h-screen w-screen grid place-content-center">
        <Loader className="h-[4rem] w-[4rem]" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={fallbackPath} state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export function PublicRoute({ redirectTo = '/dashboard' }) {
  const { isAuthenticated, isLoading, role } = useAuth();

  if (isLoading === true) {
    return (
      <div className="h-screen w-screen grid place-content-center">
        <Loader className="h-[4rem] w-[4rem]" />
      </div>
    );
  }

  if (isAuthenticated) {
    const defaultPath = role === 'trainer' ? '/my-sessions' : redirectTo;
    return <Navigate to={defaultPath} replace />;
  }

  return <Outlet />;
}
/* eslint-enable react/prop-types */

export default ProtectedRoute;