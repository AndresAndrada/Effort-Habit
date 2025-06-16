import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUserStore = create(
  persist(
    (set, get) => (
      {
        Authenticated: true, // Estado inicial
        DataPerfilUser: [], // DATA_PERFIL_USER
        User: {}, // DATA_USER
        Details: {},
        Login: false,

        setAuthenticated: (isAuthenticated) => set({ Authenticated: isAuthenticated }),
        setUser: (values) => set({ User: values }),
        setDataPerfilUser: (values) => set({ DataPerfilUser: values }),
        setDetails: (values) => set({ Details: values }),
      }
    ), {
    name: 'user-storage',
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
  }));