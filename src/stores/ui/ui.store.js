import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUiStore = create(persist((set) => ({
    DarkMode: true, // DATA_PERFIL_Type
    MenuOptionExercise: "todos",
    MenuOptionUsers: "todos",

    setDarkMode: (values) => set({ DarkMode: values }),
    setMenuOptionExercise: (values) => set({ MenuOptionExercise: values }),
    setMenuOptionUser: (values) => set({ MenuOptionUsers: values }),
}), {
    name: 'ui-storage',
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