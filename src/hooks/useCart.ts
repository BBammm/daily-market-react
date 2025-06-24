import { create } from "zustand";
import type { CartState } from "@/types/cart";
import { toast } from "react-hot-toast";

export const useCart = create<CartState>((set) => ({
  items: [],
  addToCart: (product) => {
    set((state) => {
      const existing = state.items.find((i) => i.product.id === product.id);
      if (existing && existing.quantity >= product.stock) {
        toast.error("재고보다 많이 담을 수 없습니다.");
        return state;
      }
      toast.success("장바구니에 추가했습니다.");
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.product.id === product.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return { items: [...state.items, { product, quantity: 1 }] };
    });
  },
  removeFromCart: (id) =>
    set((state) => ({
      items: state.items.filter((i) => i.product.id !== id),
    })),
  changeQuantity: (productId, quantity) => {
    set((state) => {
      const item = state.items.find((i) => i.product.id === productId);
      if (!item) return state;
      // 1 이상, 재고 이하만 허용
      if (quantity < 1 || quantity > item.product.stock) {
        if (typeof window !== "undefined" && quantity > item.product.stock) {
          toast.error("재고보다 많이 담을 수 없습니다.");
        }
        return state;
      }
      return {
        items: state.items.map((i) =>
          i.product.id === productId ? { ...i, quantity } : i
        ),
      };
    });
  },
  clearCart: () => set({ items: [] }),
}));