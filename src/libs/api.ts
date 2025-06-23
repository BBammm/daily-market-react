import type { Product } from "@/types/product";

/**
 * 상품 목록 데이터 fetch
 */
export async function fetchProducts(): Promise<{ products: Product[] }> {
  const res = await fetch("http://localhost:3000/products", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}