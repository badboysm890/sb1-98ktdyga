import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isAuthenticated: boolean;
  lastRoute: string;
  login: () => void;
  logout: () => void;
  setLastRoute: (route: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      lastRoute: '/',
      login: () => set({ isAuthenticated: true }),
      logout: () => set({ isAuthenticated: false }),
      setLastRoute: (route: string) => set({ lastRoute: route }),
    }),
    {
      name: 'auth-storage',
    }
  )
);