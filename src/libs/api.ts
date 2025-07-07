import { apiService } from "./apiService";
import type { Product } from "@/types/product";

export async function fetchProducts({
  search = "",
  page = 1,
  limit = 8,
}: {
  search?: string;
  page?: number;
  limit?: number;
} = {}): Promise<{ items: Product[], total: number }> {
  const params = new URLSearchParams();
  if (search) params.append("q", search);
  params.append("page", String(page));
  params.append("limit", String(limit));
  return apiService.get<{ items: Product[]; total: number }>(`/products?${params.toString()}`);
}

export async function fetchProductsTotalCount(search = ""): Promise<number> {
  const params = new URLSearchParams();
  if (search) params.append("q", search);
  const products = await apiService.get<Product[]>(`/products?${params.toString()}`);
  return products.length;
}

export async function fetchPoints(): Promise<number> {
  const data = await apiService.get<{ point: number }>("/points");
  return data.point;
}