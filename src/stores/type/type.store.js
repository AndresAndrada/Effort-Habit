import { create } from 'zustand';
// import { persist } from 'zustand/middleware';

export const useTypeStore = create((set) => ({
    DataPerfilType: [], // DATA_PERFIL_Type
    Type: [], // DATA_Type
    Details: {},

    setType: (values) => set({ Type: values }),
    setDataPerfilType: (values) => set({ DataPerfilType: values }),
    setDetails: (values) => set({ Details: values }),
}));