// hooks/useCart.ts

import { create } from "zustand";
import type { Product } from "@/types/product";
import {
  fetchCart,
  addCartItem,
  changeCartItem,
  removeCartItem,
  clearCart,
} from "@/libs/cartService";

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  fetchCart: () => Promise<void>;
  addToCart: (productId: number, quantity?: number) => Promise<void>;
  changeQuantity: (productId: number, quantity: number) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  clearCart: () => Promise<void>;
}

export const useCart = create<CartState>((set) => ({
  items: [],
  fetchCart: async () => {
    const data = await fetchCart();
    set({ items: data.items });
  },
  addToCart: async (productId, quantity = 1) => {
    const data = await addCartItem(productId, quantity);
    set({ items: data.items });
  },
  changeQuantity: async (productId, quantity) => {
    const data = await changeCartItem(productId, quantity);
    set({ items: data.items });
  },
  removeFromCart: async (productId) => {
    const data = await removeCartItem(productId);
    set({ items: data.items });
  },
  clearCart: async () => {
    const data = await clearCart();
    set({ items: data.items });
  },
}));