// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export function middleware(request: NextRequest) {
  // matcher로 인한 영향: 아래 경로만 해당!
  // 만약 / 전체나 /* 이런 식이면... 사이트 전체 먹통 됨

  // 1. 로그인 상태 체크
  let isLoggedIn = false;
  const token = request.cookies.get("jwt")?.value;

  if (token) {
    try {
      verify(token, JWT_SECRET);
      isLoggedIn = true;
    } catch {
      isLoggedIn = false;
    }
  }

  console.log('token ======= ', token);
  // 2. 로그인/회원가입 경로에 이미 로그인된 유저가 접근하면 홈으로
  if (
    isLoggedIn &&
    (request.nextUrl.pathname === "/auth/login" ||
     request.nextUrl.pathname === "/auth/register")
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // 3. (중요) 나머지는 반드시 next()로 통과!
  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/login", "/auth/register"], // 정확히 이 경로만 미들웨어 적용
};