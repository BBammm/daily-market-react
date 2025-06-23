// libs/api.ts
import { apiService } from "./apiService";
import type { Product } from "@/types/product";

// 상품 목록 가져오기
export async function fetchProducts(): Promise<Product[]> {
  return apiService.get<Product[]>("/products");
}

// 예시: 포인트 정보 가져오기
export async function fetchPoints(): Promise<number> {
  const data = await apiService.get<{ points: number }>("/points");
  return data.points;
}