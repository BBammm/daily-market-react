import { apiService } from "./apiService";
import type { Product } from "@/types/product";

export async function fetchCart() {
  return apiService.get<{ items: { product: Product; quantity: number }[] }>("/cart", {
    withCredentials: true,
  });
}

export async function addCartItem(productId: number, quantity = 1): Promise<{ items: { product: Product; quantity: number }[] }> {
  return apiService.post<{ items: { product: Product; quantity: number }[] }>(
    "/cart/add",
    { productId, quantity },
    { withCredentials: true }
  );
}

// 장바구니 수량 변경
export async function changeCartItem(
  productId: number,
  quantity: number
): Promise<{ items: { product: Product; quantity: number }[] }> {
  return apiService.put<{ items: { product: Product; quantity: number }[] }>(
    "/cart/change",
    { productId, quantity },
    { withCredentials: true }
  );
}

// 장바구니 항목 삭제
export async function removeCartItem(
  productId: number
): Promise<{ items: { product: Product; quantity: number }[] }> {
  return apiService.delete<{ items: { product: Product; quantity: number }[] }>(
    `/cart/remove?productId=${productId}`,
    { withCredentials: true }
  );
}

// 장바구니 전체 비우기
export async function clearCart(): Promise<{ items: { product: Product; quantity: number }[] }> {
  return apiService.post<{ items: { product: Product; quantity: number }[] }>(
    "/cart/clear",
    {},
    { withCredentials: true }
  );
}