// hooks/useCart.ts
import { useState } from "react";
import type { Product } from "@/types/product";

export function useCart() {
  const [cart, setCart] = useState<Product[]>([]);

  function addToCart(product: Product) {
    setCart(prev => {
      // 이미 있으면 수량 늘리기(아니면 단순히 추가)
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        // 확장 과제에서는 수량 상태 별도로!
        return prev;
      }
      return [...prev, product];
    });
  }

  function removeFromCart(productId: number) {
    setCart(prev => prev.filter(item => item.id !== productId));
  }

  return { cart, addToCart, removeFromCart };
}