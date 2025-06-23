// libs/api.ts
import { apiService } from "./apiService";
import type { Product } from "@/types/product";

// (A) 페이지네이션+검색: 해당 페이지 데이터만
export async function fetchProducts({
  search = "",
  page = 1,
  limit = 8,
}: {
  search?: string;
  page?: number;
  limit?: number;
} = {}): Promise<Product[]> {
  const params = new URLSearchParams();
  if (search) params.append("q", search);
  params.append("_page", page.toString());
  params.append("_limit", limit.toString());
  // **apiService 사용**
  return apiService.get<Product[]>(`/products?${params.toString()}`);
}

// (B) 총 개수만: 검색어만 걸어서 전체 받아서 length만
export async function fetchProductsTotalCount(search = ""): Promise<number> {
  const params = new URLSearchParams();
  if (search) params.append("q", search);
  // **apiService 사용**
  const products = await apiService.get<Product[]>(`/products?${params.toString()}`);
  return products.length;
}

// 예시: 포인트 정보 가져오기
export async function fetchPoints(): Promise<number> {
  const data = await apiService.get<{ points: number }>("/points");
  return data.points;
}