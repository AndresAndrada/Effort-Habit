import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authService } from '../../services';

/**
 * Store de autenticación con roles, tokens y persistencia
 * Reemplaza al anterior user.store.js
 */
export const useAuthStore = create(
  persist(
    (set, get) => ({
      // Estado
      isAuthenticated: false,
      user: null,
      tokens: null,
      role: null,
      isLoading: false,
      error: null,

      // Acciones
      /**
       * Inicia sesión
       * @param {{email: string, password: string}} credentials
       */
      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.login(credentials);
          const { user, tokens } = response.data;
          set({
            isAuthenticated: true,
            user,
            tokens,
            role: user.role,
            isLoading: false,
          });
          return { ok: true, user };
        } catch (error) {
          const message = error.response?.data?.message || 'Error al iniciar sesión';
          set({ isLoading: false, error: message });
          return { ok: false, message };
        }
      },

      /**
       * Registra un nuevo usuario
       * @param {{name: string, email: string, password: string, role: string, assignedTeacherId?: string}} data
       */
      register: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.register(data);
          const { user, tokens } = response.data;
          set({
            isAuthenticated: true,
            user,
            tokens,
            role: user.role,
            isLoading: false,
          });
          return { ok: true, user };
        } catch (error) {
          const message = error.response?.data?.message || 'Error al registrarse';
          set({ isLoading: false, error: message });
          return { ok: false, message };
        }
      },

      /**
       * Cierra sesión
       */
      logout: async () => {
        set({ isLoading: true });
        try {
          await authService.logout();
        } catch {
          // Ignorar errores de logout en servidor
        } finally {
          set({
            isAuthenticated: false,
            user: null,
            tokens: null,
            role: null,
            isLoading: false,
            error: null,
          });
        }
      },

      /**
       * Refresca el access token
       */
      refreshAccessToken: async () => {
        try {
          const response = await authService.refresh();
          const { accessToken, refreshToken, expiresIn } = response.data;
          set((state) => ({
            tokens: {
              ...state.tokens,
              accessToken,
              refreshToken,
              expiresIn,
            },
          }));
          return accessToken;
        } catch {
          get().logout();
          throw new Error('Sesión expirada');
        }
      },

      /**
       * Obtiene el usuario actual del servidor
       */
      fetchMe: async () => {
        if (!get().tokens?.accessToken) return;
        set({ isLoading: true });
        try {
          const response = await authService.me();
          set({
            user: response.data,
            role: response.data.role,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch {
          set({ isAuthenticated: false, user: null, tokens: null, role: null, isLoading: false });
        }
      },

      /**
       * Actualiza datos del usuario localmente
       * @param {Partial<User>} data
       */
      updateUser: (data) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        })),

      /**
       * Establece usuario manualmente (para testing o recuperación)
       * @param {User} user
       */
      setUser: (user) =>
        set({
          user,
          role: user?.role || null,
          isAuthenticated: !!user,
        }),

      /**
       * Establece tokens manualmente
       * @param {{accessToken: string, refreshToken: string, expiresIn: number}} tokens
       */
      setTokens: (tokens) => set({ tokens }),

      /**
       * Limpia error
       */
      clearError: () => set({ error: null }),

      // Selectores computados
      /**
       * @returns {boolean}
       */
      get isAdmin() {
        return get().role === 'admin';
      },

      /**
       * @returns {boolean}
       */
      get isTeacher() {
        return get().role === 'teacher';
      },

      /**
       * @returns {boolean}
       */
      get isTrainer() {
        return get().role === 'trainer';
      },

      /**
       * @returns {boolean}
       */
      get canManageUsers() {
        return get().role === 'admin';
      },

      /**
       * @returns {boolean}
       */
      get canManageExercises() {
        return ['admin', 'teacher'].includes(get().role);
      },

      /**
       * @returns {boolean}
       */
      get canCreateSessions() {
        return ['admin', 'teacher'].includes(get().role);
      },

      /**
       * @returns {boolean}
       */
      get canViewAllSessions() {
        return ['admin', 'teacher'].includes(get().role);
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        tokens: state.tokens,
        role: state.role,
      }),
      storage: {
        getItem: (name) => {
          const item = localStorage.getItem(name);
          return item ? JSON.parse(item) : null;
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);

/**
 * Hook de conveniencia para acceder al store
 * @returns {ReturnType<typeof useAuthStore>}
 */
export const useAuth = () => useAuthStore();