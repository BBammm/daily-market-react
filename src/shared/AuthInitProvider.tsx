"use client";
import { ReactNode, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { fetchMe } from "@/libs/authService";

interface Props {
  children: ReactNode;
}

export default function AuthInitProvider({ children }: Props) {
  const { user, isLoggedIn, login, logout } = useAuth();

  useEffect(() => {
    // SSR 첫 마운트 시 쿠키 기반 인증 정보 fetch
    fetchMe()
      .then(user => login(user))
      .catch(() => logout());
  }, [login, logout]);

  return <>{children}</>;
}