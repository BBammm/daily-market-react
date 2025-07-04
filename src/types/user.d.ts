export interface User {
  _id: string;         // MongoDB ObjectId (string으로)
  email: string;
  nickname?: string;       // 이름(선택)
  createdAt?: string;  // ISO Date string
  updatedAt?: string;
  // 필요한 경우 더 추가 (예: role, point 등)
  role?: "user" | "admin";
  point?: number;      // 예시: 포인트/적립금
}