import React from "react";
import type { Product } from "@/types/product";


interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  // 데이터에 img명이 없어서 Id로 임시 대체
  const imageUrl = product.id ? `/images/product_${product.id}.png` : "/images/product_default.png"; // 예시 경로

  return (
    <div className="rounded-2xl overflow-hidden bg-white flex flex-col">
      {/* 상품 이미지 */}
      <div className="w-full aspect-square bg-gray-50 flex items-center justify-center">
        <img
          src={imageUrl}
          alt={product.name}
          className="max-w-[55%] max-h-[55%] object-contain"
        />
      </div>
      {/* 상품 정보/버튼 */}
      <div className="flex-1 flex flex-col px-4 py-3 gap-2">
        {/* 장바구니 담기 버튼 */}
        <button
          className="border w-full py-2 rounded-lg font-semibold flex items-center justify-center gap-2 mb-2 hover:bg-blue-50 transition"
          onClick={() => onAddToCart(product)}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M3 3h2l.4 2M7 13h14l-1.35 6.42a2 2 0 01-1.98 1.58H7.1a2 2 0 01-1.98-1.71L3 5h18"/>
          </svg>
          담기
        </button>
        {/* 상품명 */}
        <div className="font-semibold text-base mb-1">{product.name}</div>
        <div className="text-2xl font-bold text-gray-900">{product.price.toLocaleString()}원</div>
        {/* 남은 재고 */}
        <div className="text-xs text-gray-500 mt-1">재고: {product.stock}개</div>
      </div>
    </div>
  );
}