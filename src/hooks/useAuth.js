import { useAuthStore } from '../stores/auth/auth.store.js';

/**
 * Hook principal de autenticación - expone estado y acciones
 * @returns {Object} Estado y métodos de autenticación
 */
export function useAuth() {
  const {
    isAuthenticated,
    user,
    tokens,
    role,
    isLoading,
    error,
    login,
    register,
    logout,
    refreshAccessToken,
    fetchMe,
    updateUser,
    clearError,
    isAdmin,
    isTeacher,
    isTrainer,
    canManageUsers,
    canManageExercises,
    canCreateSessions,
    canViewAllSessions,
  } = useAuthStore();

  return {
    // Estado
    isAuthenticated,
    user,
    tokens,
    role,
    isLoading,
    error,

    // Acciones
    login,
    register,
    logout,
    refreshAccessToken,
    fetchMe,
    updateUser,
    clearError,

    // Roles (computed)
    isAdmin,
    isTeacher,
    isTrainer,

    // Permisos (computed)
    canManageUsers,
    canManageExercises,
    canCreateSessions,
    canViewAllSessions,
  };
}

/**
 * Hook para obtener solo el rol actual
 * @returns {'admin' | 'teacher' | 'trainer' | null}
 */
export function useRole() {
  return useAuthStore((state) => state.role);
}

/**
 * Hook para verificar permisos específicos
 * @param {string|string[]} roles - Rol o array de roles permitidos
 * @returns {boolean}
 */
export function usePermission(roles) {
  const role = useAuthStore((state) => state.role);
  const allowedRoles = Array.isArray(roles) ? roles : [roles];
  return allowedRoles.includes(role);
}

/**
 * Hook para verificar si el usuario actual puede acceder a un recurso
 */
export function useResourceAccess(resource) {
  const { user, isAdmin, isTeacher } = useAuthStore();

  if (isAdmin) return true;
  if (!user) return false;

  // El owner siempre puede acceder
  if (resource.ownerId && resource.ownerId === user.id) return true;
  if (resource.teacherId && resource.teacherId === user.id) return true;
  if (resource.trainerId && resource.trainerId === user.id) return true;

  // Teachers pueden acceder a recursos de sus trainers asignados
  if (isTeacher && resource.trainerId && user.assignedTrainers?.includes(resource.trainerId)) {
    return true;
  }

  return false;
}