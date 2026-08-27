import { createContext, useContext } from 'react';
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
  // En modo prototype/mock, NO llamamos fetchMe() porque no hay backend real.
  // El middleware persist de Zustand ya hidrata automáticamente el estado
  // desde localStorage (auth-storage). Cuando haya backend real, descomentar:
  // 
  // const { fetchMe, isAuthenticated, tokens } = useAuthStore();
  // useEffect(() => {
  //   if (tokens?.accessToken && isAuthenticated) {
  //     fetchMe(); // Valida token con backend y trae datos frescos
  //   }
  // }, []);

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