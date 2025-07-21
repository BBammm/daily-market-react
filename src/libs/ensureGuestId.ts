import { apiService } from "./apiService";
import Cookies from "js-cookie";

/**
 * 게스트 ID를 쿠키 및 서버에서 안전하게 가져오거나 생성
 * 1. 클라이언트 쿠키에 guestId가 있으면 그대로 반환
 * 2. 없으면 서버로 GET 요청해서 새 guestId 발급, 쿠키에도 저장
 * @returns guestId (string)
 */
export async function ensureGuestId(): Promise<string> {
  let guestId = Cookies.get("guestId");
  if (guestId) return guestId;

  // apiService 사용 (경로는 서버 기준에 맞게 조정)
  const res = await apiService.get<{ guestId: string }>("/auth/guest", { withCredentials: true });
  guestId = res.guestId;
  if (!guestId) throw new Error("게스트 ID 발급 실패");

  Cookies.set("guestId", guestId, { expires: 7, sameSite: "lax" });
  return guestId;
}