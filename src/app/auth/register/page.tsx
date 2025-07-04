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
    <div className="flex min-h-[60vh] items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xs bg-white rounded-xl shadow px-7 py-8 flex flex-col gap-4"
      >
        <h1 className="text-2xl font-bold text-center mb-3">회원가입</h1>
        <input
          type="email"
          className="border rounded px-3 py-2 text-base focus:outline-[#FF784A]"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="이메일"
          autoFocus
          required
        />
        <input
          type="text"
          className="border rounded px-3 py-2 text-base focus:outline-[#FF784A]"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="이름"
          required
        />
        <input
          type="password"
          className="border rounded px-3 py-2 text-base focus:outline-[#FF784A]"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="비밀번호"
          required
        />
        <button
          type="submit"
          className="mt-3 py-2 rounded-xl font-bold bg-[#FF784A] text-white hover:bg-[#ff5400] transition"
        >
          회원가입
        </button>
        <p className="text-sm text-center mt-2">
          이미 계정이 있으신가요?{" "}
          <a href="/auth/login" className="text-[#FF784A] underline">로그인</a>
        </p>
      </form>
    </div>
  );
}