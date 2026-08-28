import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authService } from '../../services';

const INITIAL_AUTH_STATE = {
  isAuthenticated: false,
  user: null,
  tokens: null,
  role: null,
  isLoading: false,
  error: null,
};

const ROLE_PERMISSIONS = {
  admin:   { isAdmin: true, canManageUsers: true, canManageExercises: true, canCreateSessions: true, canViewAllSessions: true },
  teacher: { canManageExercises: true, canCreateSessions: true, canViewAllSessions: true },
};

const runAuthAction = async (set, get, op, { errorMsg, onSuccess } = {}) => {
  set({ isLoading: true, error: null });
  try {
    const response = await op();
    onSuccess?.(response);
    return { ok: true, ...(response.data ?? {}) };
  } catch (error) {
    const message = error.response?.data?.message || errorMsg;
    set({ error: message });
    return { ok: false, message };
  } finally {
    set({ isLoading: false });
  }
};

export const useAuthStore = create(
  persist(
    (set, get) => ({
      ...INITIAL_AUTH_STATE,

      login: async (credentials) =>
        runAuthAction(set, get, () => authService.login(credentials), {
          errorMsg: 'Error al iniciar sesión',
          onSuccess: (response) => {
            const { user, tokens } = response.data;
            set({ isAuthenticated: true, user, tokens, role: user.role });
          },
        }),

      register: async (data) =>
        runAuthAction(set, get, () => authService.register(data), {
          errorMsg: 'Error al registrarse',
          onSuccess: (response) => {
            const { user, tokens } = response.data;
            set({ isAuthenticated: true, user, tokens, role: user.role });
          },
        }),

      logout: async () => {
        set({ isLoading: true });
        try {
          await authService.logout();
        } catch {
          // Ignorar errores de logout en servidor
        } finally {
          set(INITIAL_AUTH_STATE);
        }
      },

      refreshAccessToken: async () => {
        try {
          const response = await authService.refresh();
          const { accessToken, refreshToken, expiresIn } = response.data;
          set((state) => ({
            tokens: { ...state.tokens, accessToken, refreshToken, expiresIn },
          }));
          return accessToken;
        } catch {
          get().logout();
          throw new Error('Sesión expirada');
        }
      },

      fetchMe: async () => {
        if (!get().tokens?.accessToken) return;
        set({ isLoading: true });
        try {
          const response = await authService.me();
          set({ user: response.data, role: response.data.role, isAuthenticated: true, isLoading: false });
        } catch {
          set({ ...INITIAL_AUTH_STATE, isLoading: false });
        }
      },

      updateUser: (data) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        })),

      setUser: (user) =>
        set({
          user,
          role: user?.role || null,
          isAuthenticated: !!user,
        }),

      setTokens: (tokens) => set({ tokens }),

      clearError: () => set({ error: null }),

      isAdmin: () => get().role === 'admin',
      isTeacher: () => get().role === 'teacher',
      isTrainer: () => get().role === 'trainer',
      canManageUsers: () => ROLE_PERMISSIONS[get().role]?.canManageUsers ?? false,
      canManageExercises: () => ROLE_PERMISSIONS[get().role]?.canManageExercises ?? false,
      canCreateSessions: () => ROLE_PERMISSIONS[get().role]?.canCreateSessions ?? false,
      canViewAllSessions: () => ROLE_PERMISSIONS[get().role]?.canViewAllSessions ?? false,
    }),
    {
      name: 'auth-storage',
      version: 1,
      onRehydrateStorage: () => (state, error) => {
        if (error) console.error('❌ Error rehydrating storage:', error);
      },
    }
  )
);

export const useAuth = () => useAuthStore();