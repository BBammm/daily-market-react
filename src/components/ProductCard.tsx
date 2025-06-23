import React from "react";
import type { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="border rounded p-4 flex justify-between items-center">
      <div>
        <div className="font-semibold">{product.name}</div>
        <div className="text-sm text-gray-500">{product.price.toLocaleString()}원</div>
        <div className="text-xs text-gray-400">재고: {product.stock}</div>
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => onAddToCart(product)}
      >
        장바구니 담기
      </button>
    </div>
  );
}