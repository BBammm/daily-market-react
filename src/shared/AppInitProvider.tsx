"use client";
import { ReactNode, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { fetchMe } from "@/libs/authService";

interface Props {
  children: ReactNode;
}

export default function AppInitProvider({ children }: { children: React.ReactNode }) {
  const { user, isLoggedIn, login, logout } = useAuth();
  const { fetchCart } = useCart();

  useEffect(() => {
    // 로그인 정보/장바구니 정보를 한 번에 fetch
    fetchMe()
      .then(user => login(user))
      .catch(() => logout());
    fetchCart();
    // 필요하다면 다른 초기화 코드 추가
  }, [login, logout, fetchCart]);

  return <>{children}</>;
}