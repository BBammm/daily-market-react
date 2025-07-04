import jwt from "jsonwebtoken";

// JWT가 없거나 유효하지 않으면 null 반환
export function verifyJwt(token: string): null | { id: string; email: string; name: string } {
  try {
    // jwt.verify에서 타입 지정
    return jwt.verify(token, process.env.JWT_SECRET!) as any;
  } catch {
    return null;
  }
}