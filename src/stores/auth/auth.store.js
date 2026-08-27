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
          console.log('🔐 LOGIN SUCCESS - Setting store:', { user, tokens, role: user.role });
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
      setUser: (user) =>{
        set({
          user,
          role: user?.role || null,
          isAuthenticated: !!user,
        })},

      /**
       * Establece tokens manualmente
       * @param {{accessToken: string, refreshToken: string, expiresIn: number}} tokens
       */
      setTokens: (tokens) => set({ tokens }),

      /**
       * Limpia error
       */
      clearError: () => set({ error: null }),

      // Selectores computados (funciones en lugar de getters para evitar problemas con persist)
      isAdmin: () => get().role === 'admin',
      isTeacher: () => get().role === 'teacher',
      isTrainer: () => get().role === 'trainer',
      canManageUsers: () => get().role === 'admin',
      canManageExercises: () => ['admin', 'teacher'].includes(get().role),
      canCreateSessions: () => ['admin', 'teacher'].includes(get().role),
      canViewAllSessions: () => ['admin', 'teacher'].includes(get().role),
    }),
    {
      name: 'auth-storage',
      // CRÍTICO: NO usar partialize, guardar TODO el estado
      // partialize puede causar problemas de hidratación en ciertas versiones de Zustand
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error('❌ Error rehydrating storage:', error);
        } else {
          console.log('💾 REHYDRATE SUCCESS - Estado restaurado:', state);
        }
      },
      version: 1,
      migrate: (persistedState, version) => {
        console.log('🔄 MIGRATE - version:', version, 'state:', persistedState);
        // Si viene de versión anterior, asegurar que tenga la estructura correcta
        if (version === 0) {
          return persistedState;
        }
        return persistedState;
      },
    }
  )
);

/**
 * Hook de conveniencia para acceder al store
 * @returns {ReturnType<typeof useAuthStore>}
 */
export const useAuth = () => useAuthStore();