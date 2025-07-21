// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET!;

// 인증이 필요한 경로(로그인 필요)
const protectedRoutes = [
  "/mypage",
  "/order",
  "/order/history",
  "/cart",
];

// 로그인/회원가입 시 접근 제한(로그인한 유저는 접근 불가)
const guestOnlyRoutes = [
  "/auth/login",
  "/auth/register"
];

// JWT 쿠키명
const COOKIE_NAME = "accessToken"; // 본인 프로젝트에 맞게

async function isValidJWT(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
    return true;
  } catch {
    return false;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get(COOKIE_NAME)?.value || "";

  // 로그인 상태 판별
  const isLoggedIn = token && await isValidJWT(token);

  // 1. **로그인 필요 페이지에서 비로그인 시 → 로그인으로 리다이렉트**
  if (
    protectedRoutes.some((route) =>
      pathname === route || pathname.startsWith(route + "/")
    ) && !isLoggedIn
  ) {
    const url = req.nextUrl.clone();
    url.pathname = "/auth/login";
    url.searchParams.set("next", pathname); // 원래 가려던 경로 기억
    return NextResponse.redirect(url);
  }

  // 2. **로그인/회원가입 페이지에서 이미 로그인 상태면 → 홈으로 리다이렉트**
  if (
    guestOnlyRoutes.some((route) =>
      pathname === route || pathname.startsWith(route + "/")
    ) && isLoggedIn
  ) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // 3. 기타는 통과
  return NextResponse.next();
}

// 미들웨어 적용 경로 설정(보호 필요 라우트만)
// 하위 경로 포함 → "/mypage(.*)", "/order(.*)", 등
export const config = {
  matcher: [
    "/mypage",
    "/mypage/(.*)",
    "/order",
    "/order/(.*)",
    "/cart",
    "/cart/(.*)",
    "/auth/login",
    "/auth/register",
  ],
};