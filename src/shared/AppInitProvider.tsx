"use client";
import { ReactNode, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { fetchMe } from "@/libs/authService";
import { ensureGuestId } from "@/libs/ensureGuestId";

export default function AppInitProvider({ children }: { children: React.ReactNode }) {
  const { user, isLoggedIn, login, logout } = useAuth();
  const { fetchCart } = useCart();

  useEffect(() => {
    ensureGuestId().then(() => {
      // 이후 유저/카트 등 fetch 시작
      fetchMe().then(user => login(user)).catch(() => logout());
      fetchCart();
    });
  }, [login, logout, fetchCart]);

  return <>{children}</>;
}