import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useUiStore = create(persist((set) => ({
    DarkMode: true,
    MenuOptionExercise: "todos",
    MenuOptionUserPerfil: "addSession",
    MenuOptionUsers: "todos",

    setDarkMode: (values) => set({ DarkMode: values }),
    setMenuOptionExercise: (values) => set({ MenuOptionExercise: values }),
    setMenuOptionUserPerfil: (values) => set({ MenuOptionUserPerfil: values }),
    setMenuOptionUser: (values) => set({ MenuOptionUsers: values }),
}), {
    name: 'ui-storage',
    storage: createJSONStorage(() => localStorage),
}));