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
} = {}): Promise<Product[]> {
  const params = new URLSearchParams();
  if (search) params.append("q", search);
  params.append("_page", page.toString());
  params.append("_limit", limit.toString());
  return apiService.get<Product[]>(`/products?${params.toString()}`);
}

export async function fetchProductsTotalCount(search = ""): Promise<number> {
  const params = new URLSearchParams();
  if (search) params.append("q", search);
  const products = await apiService.get<Product[]>(`/products?${params.toString()}`);
  return products.length;
}

export async function fetchPoints(): Promise<number> {
  const data = await apiService.get<{ points: number }>("/points");
  return data.points;
}