"use client";
import { useState } from "react";
import { register } from "@/libs/authService";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(email, password, name);
      toast.success("회원가입 완료!");
      router.replace("/auth/login");
    } catch (e: any) {
      toast.error(e.message || "회원가입 실패");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={e=>setEmail(e.target.value)} />
      <input value={name} onChange={e=>setName(e.target.value)} />
      <input value={password} onChange={e=>setPassword(e.target.value)} type="password" />
      <button type="submit">회원가입</button>
    </form>
  );
}