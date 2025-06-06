import create from 'zustand';
import { persist } from 'zustand/middleware';
// import { persist } from "zustand/middlewxare";

export const useUiStore = create(persist((set) => ({
    Ui: true, // DATA_PERFIL_Type

    setUi: (values) => set({ Ui: values }),
})));