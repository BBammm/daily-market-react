import React from "react";
import type { Product } from "@/types/product";
import { CiShoppingCart } from "react-icons/ci";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  // 데이터에 img명이 없어서 Id로 임시 대체
  const imageUrl = product.id ? `/images/product_${product.id}.png` : "/images/product_default.png"; // 예시 경로

  return (
    <div className="rounded-2xl overflow-hidden bg-white flex flex-col mb-5">
      {/* 상품 이미지 */}
      <div className="w-full aspect-square bg-gray-50 flex items-center justify-center rounded-xl mb-3">
        <img
          src={imageUrl}
          alt={product.name}
          className="max-w-[55%] max-h-[55%] object-contain"
        />
      </div>
      {/* 장바구니 담기 버튼 */}
      <button
        className="border border-gray-300 text-sm font-bold py-2 px-6 rounded-lg flex items-center justify-center gap-1 mb-2 hover:bg-[#FF784A] hover:text-white transition min-w-[110px] cursor-pointer"
        onClick={() => onAddToCart(product)}
        type="button"
      >
        <CiShoppingCart size={20} />
        담기
      </button>
      <div className="mt-2">
        <span className="inline-block bg-[#FF784A] text-white px-3 py-1 text-xs font-bold rounded-lg mb-1">
          재고: {product.stock}개
        </span>
        <div className="font-medium text-base mt-2 text-gray-600">{product.name}</div>
        <div className="text-2xl font-bold text-gray-900">{product.price.toLocaleString()}원</div>
      </div>
    </div>
  );
}