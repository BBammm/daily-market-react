"use client";
import { useState } from "react";
import { login, fetchMe } from "@/libs/authService";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "react-hot-toast";
import { useCart } from "@/hooks/useCart";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login: setLogin } = useAuth();
  const router = useRouter();
  const { fetchCart } = useCart();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      const user = await fetchMe();
      setLogin(user);
      await fetchCart();
      toast.success("로그인 성공!");
      router.replace("/");
    } catch (e: any) {
      toast.error(e.message || "로그인 실패");
    }
  };
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xs bg-white rounded-xl shadow px-7 py-8 flex flex-col gap-4"
      >
        <h1 className="text-2xl font-bold text-center mb-3">로그인</h1>
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
          type="password"
          className="border rounded px-3 py-2 text-base focus:outline-[#FF784A]"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="비밀번호"
          required
        />
        <button
          type="submit"
          className="mt-3 py-2 rounded-xl font-bold bg-[#FF784A] text-white hover:bg-[#ff5400] transition disabled:opacity-50"
        >
          로그인
        </button>
        <p className="text-sm text-center mt-2">
          아직 회원이 아니신가요?{" "}
          <a href="/auth/register" className="text-[#FF784A] underline">회원가입</a>
        </p>
      </form>
    </div>
  );
}