import create from 'zustand';
import { persist } from 'zustand/middleware';
// import { persist } from "zustand/middlewxare";

export const useUiStore = create(persist((set) => ({
    DarkMode: true, // DATA_PERFIL_Type

    setDarkMode: (values) => set({ DarkMode: values }),
})));