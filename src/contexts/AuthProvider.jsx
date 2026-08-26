import { createContext, useContext, useEffect } from 'react';
import { useAuthStore } from '../stores/auth/auth.store.js';

/**
 * Contexto de autenticación para acceso global sin depender directamente del store
 * Permite testing fácil y desacoplamiento
 */
const AuthContext = createContext(null);

/**
 * Proveedor de autenticación - inicializa sesión al montar
 * @param {Object} props
 * @param {React.ReactNode} props.children
 */
/* eslint-disable react/prop-types */
export function AuthProvider({ children }) {
  const { fetchMe, isAuthenticated, tokens } = useAuthStore();

  useEffect(() => {
    // Al cargar la app, si hay tokens guardados, recuperar usuario
    if (tokens?.accessToken && isAuthenticated) {
      fetchMe();
    }
  }, [tokens, isAuthenticated, fetchMe]);

  return <AuthContext.Provider value={null}>{children}</AuthContext.Provider>;
}

/**
 * Hook para acceder al contexto de auth (wrapper del store)
 * @returns {ReturnType<typeof useAuthStore>}
 */
export function useAuthContext() {
  const context = useContext(AuthContext);
  const store = useAuthStore();

  if (!context && !store) {
    throw new Error('useAuthContext debe usarse dentro de AuthProvider');
  }

  return store;
}
/* eslint-enable react/prop-types */

export default AuthContext;