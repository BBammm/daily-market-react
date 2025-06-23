import { create } from "zustand";
import type { CartState } from "@/types/cart";

export const useCart = create<CartState>((set) => ({
  items: [],
  addToCart: (product) =>
    set((state) => {
      const exists = state.items.find((i) => i.product.id === product.id);
      if (exists) {
        // 수량 증가
        return {
          items: state.items.map((i) =>
            i.product.id === product.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      // 새로 추가
      return { items: [...state.items, { product, quantity: 1 }] };
    }),
  removeFromCart: (id) =>
    set((state) => ({
      items: state.items.filter((i) => i.product.id !== id),
    })),
  changeQuantity: (id, quantity) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.product.id === id ? { ...i, quantity: Math.max(1, quantity) } : i
      ),
    })),
  clearCart: () => set({ items: [] }),
}));