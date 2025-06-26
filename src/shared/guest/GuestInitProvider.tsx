// src/shared/guest/GuestInitProvider.tsx
"use client";

import { useEffect } from "react";
import { getCookie } from "@/utils/cookie";
import { apiService } from "@/libs/apiService";

export default function GuestInitProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // 이미 쿠키에 guestId가 있으면 아무것도 안 함
    const guestId = getCookie("guestId");
    if (!guestId) {
      apiService
        .post<{ guestId: string }>("/auth/guest", {}, { withCredentials: true })
        .then((res) => {
          // 서버에서 Set-Cookie로 내려줌 (쿠키 자동 저장됨)
          // 필요하면 res.data.guestId를 로컬스토리지나 전역 상태에도 저장 가능
        })
        .catch(console.error);
    }
  }, []);

  return <>{children}</>;
}