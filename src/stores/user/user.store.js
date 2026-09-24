import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useUserStore = create(
  persist(
    (set) => (
      {
        Authenticated: true,
        DataPerfilUser: [],
        User: {},
        Details: {},
        Login: false,

        setAuthenticated: (isAuthenticated) => set({ Authenticated: isAuthenticated }),
        setUser: (values) => set({ User: values }),
        setDataPerfilUser: (values) => set({ DataPerfilUser: values }),
        setDetails: (values) => set({ Details: values }),
      }
    ), {
    name: 'user-storage',
    storage: createJSONStorage(() => localStorage),
  }));