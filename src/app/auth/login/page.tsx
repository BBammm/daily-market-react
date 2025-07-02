// app/auth/login/page.tsx (로그인 폼)
"use client";

import React, { useState } from "react";
import { login } from "@/libs/authService";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password); // 성공시 쿠키에 jwt 저장됨
      toast.success("로그인 성공!");
      router.push("/"); // 홈으로 이동
    } catch (err: any) {
      toast.error("로그인 실패: " + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="...">
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="이메일" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="비밀번호" />
      <button type="submit">로그인</button>
    </form>
  );
}