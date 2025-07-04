import { create } from "zustand";
import type { User } from "@/types/user";
import { login, register, fetchMe, logout } from "@/libs/authService";

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: false,
  loading: false,
  login: async (email, password) => {
    set({ loading: true });
    try {
      await login(email, password);
      const user = await fetchMe();
      set({ user, isLoggedIn: true, loading: false });
    } catch (e) {
      set({ loading: false, user: null, isLoggedIn: false });
      throw e;
    }
  },
  logout: async () => {
    try {
      await logout();
    } finally {
      set({ user: null, isLoggedIn: false, loading: false });
    }
  },
  fetchUser: async () => {
    set({ loading: true });
    try {
      const user = await fetchMe();
      set({ user, isLoggedIn: true, loading: false });
    } catch {
      set({ user: null, isLoggedIn: false, loading: false });
    }
  }
}));