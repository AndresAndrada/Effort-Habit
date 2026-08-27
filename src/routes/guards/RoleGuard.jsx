import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';
import { Loader } from '../../module/core/Loader';

/* eslint-disable react/prop-types */
export function RoleGuard({ roles, fallback = '/dashboard', showLoader = true }) {
  const { role, isAuthenticated, isLoading } = useAuth();

  const allowedRoles = Array.isArray(roles) ? roles : [roles];

  if (isLoading) {
    if (!showLoader) return null;
    return (
      <div className="h-screen w-screen grid place-content-center">
        <Loader className="h-[4rem] w-[4rem]" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to={fallback} replace />;
  }

  return <Outlet />;
}

export function AdminRoute({ fallback = '/dashboard' }) {
  return <RoleGuard roles="admin" fallback={fallback} />;
}

export function TeacherRoute({ fallback = '/dashboard' }) {
  return <RoleGuard roles={['admin', 'teacher']} fallback={fallback} />;
}

export function TrainerRoute({ fallback = '/my-sessions' }) {
  return <RoleGuard roles={['admin', 'teacher', 'trainer']} fallback={fallback} />;
}

export function RoleSwitch({ children, roles, fallback = null }) {
  const { role } = useAuth();
  const allowedRoles = Array.isArray(roles) ? roles : [roles];

  if (!role || !allowedRoles.includes(role)) {
    return fallback;
  }

  return children;
}
/* eslint-enable react/prop-types */

export default RoleGuard;