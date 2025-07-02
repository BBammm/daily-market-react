// app/auth/register/page.tsx (회원가입 폼)
"use client";
import React, { useState } from "react";
import { register } from "@/libs/authService";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(email, password);
      toast.success("회원가입 완료! 로그인하세요.");
      router.push("/auth/login");
    } catch (err: any) {
      toast.error("회원가입 실패: " + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="...">
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="이메일" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="비밀번호" />
      <button type="submit">회원가입</button>
    </form>
  );
}