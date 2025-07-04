import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { verifyJwt } from "@/utils/authUtils";
import LoginForm from "./loginForm"; // 👈 클라이언트 컴포넌트 분리

export default async function LoginPage() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("jwt")?.value;
  const user = token ? verifyJwt(token) : null;

  if (user) redirect("/"); // SSR에서 인증된 유저면 즉시 홈으로

  // **폼 자체는 CSR 컴포넌트로 분리해서 import**
  return <LoginForm />;
}