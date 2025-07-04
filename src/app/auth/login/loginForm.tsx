"use client";
import { useState } from "react";
import { login, fetchMe } from "@/libs/authService";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login: setLogin } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      const user = await fetchMe();
      setLogin(user);
      toast.success("로그인 성공!");
      router.replace("/");
    } catch (e: any) {
      toast.error(e.message || "로그인 실패");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={e=>setEmail(e.target.value)} />
      <input value={password} onChange={e=>setPassword(e.target.value)} type="password" />
      <button type="submit">로그인</button>
    </form>
  );
}