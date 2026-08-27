import { useAuthStore } from '../stores/auth/auth.store.js';

/**
 * Hook principal de autenticación - expone estado y acciones
 * @returns {Object} Estado y métodos de autenticación
 */
export function useAuth() {
  const store = useAuthStore();
  return {
    // Estado
    isAuthenticated: store.isAuthenticated,
    user: store.user,
    tokens: store.tokens,
    role: store.role,
    isLoading: store.isLoading,
    error: store.error,

    // Acciones
    login: store.login,
    register: store.register,
    logout: store.logout,
    refreshAccessToken: store.refreshAccessToken,
    fetchMe: store.fetchMe,
    updateUser: store.updateUser,
    setUser: store.setUser,
    setTokens: store.setTokens,
    clearError: store.clearError,

    // Roles (computed) - ahora son funciones que se llaman
    isAdmin: store.isAdmin(),
    isTeacher: store.isTeacher(),
    isTrainer: store.isTrainer(),

    // Permisos (computed) - ahora son funciones que se llaman
    canManageUsers: store.canManageUsers(),
    canManageExercises: store.canManageExercises(),
    canCreateSessions: store.canCreateSessions(),
    canViewAllSessions: store.canViewAllSessions(),
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
  const { user, isAdmin, isTeacher } = useAuth();

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