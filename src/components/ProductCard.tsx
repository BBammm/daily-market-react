import React from "react";
import Image from "next/image";
import type { Product } from "@/types/product";
import { CiShoppingCart } from "react-icons/ci";
import { useCart } from "@/hooks/useCart";


interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const imageUrl = product.id ? `/images/product_${product.id}.png` : "/images/product_default.png";

  const addCartSuccess = () => {
    addToCart(product);
  };

  return (
    <div className="rounded-2xl overflow-hidden bg-white flex flex-col mb-5">
      <div className="w-full aspect-square bg-gray-50 flex items-center justify-center rounded-xl mb-3">
        <Image
          src={imageUrl}
          alt={product.name}
          width={120}
          height={120}
          className="max-w-[55%] max-h-[55%] object-contain"
        />
      </div>
      <button
        className="border border-gray-300 text-sm font-bold py-2 px-6 rounded-lg flex items-center justify-center gap-1 mb-2 hover:bg-[#FF784A] hover:text-white transition min-w-[110px] cursor-pointer"
        onClick={addCartSuccess}
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