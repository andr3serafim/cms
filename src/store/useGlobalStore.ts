import { create } from 'zustand';

interface GlobalStore {
  isAuthenticated: boolean;
  userName: string | null;
  login: (userName: string) => void;
  logout: () => void;
}

export const useGlobalStore = create<GlobalStore>((set) => ({
  isAuthenticated: false,
  userName: null,

  login: (userName) => set({ isAuthenticated: true, userName }),
  logout: () => set({ isAuthenticated: false, userName: null }),
}));
