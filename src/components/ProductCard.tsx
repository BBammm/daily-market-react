import React from "react";
import Image from "next/image";
import type { Product } from "@/types/product";
import { CiShoppingCart } from "react-icons/ci";
import { useCart } from "@/hooks/useCart"; // API 연동형
import { toast } from "react-hot-toast";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { items, addToCart } = useCart();
  const imageUrl = product.id ? `/images/product_${product.id}.png` : "/images/product_default.png";
  const cartItem = items.find((i) => i.product.id === product.id);
  const cartQuantity = cartItem ? cartItem.quantity : 0;
  const isSoldOut = cartQuantity >= product.stock;

  const addCartSuccess = async () => {
    if (isSoldOut) {
      toast.error("더 이상 담을 수 없습니다. 재고 초과!");
      return;
    }
    try {
      await addToCart(product.id, 1);
      toast.success("장바구니에 추가했습니다.");
    } catch (e: any) {
      toast.error(e?.message || "담기에 실패했습니다.");
    }
  };

  return (
    <div className="rounded-2xl overflow-hidden bg-white flex flex-col mb-5">
      <div className="w-full aspect-square bg-gray-50 flex items-center justify-center rounded-xl mb-3 relative">
        <Image
          src={imageUrl}
          alt={product.name}
          width={120}
          height={120}
          className="max-w-[55%] max-h-[55%] object-contain"
        />
        {isSoldOut && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-xl">
            <span className="text-white text-xl font-bold tracking-widest">품절</span>
          </div>
        )}
      </div>
      <button
        className="border border-gray-300 text-sm font-bold py-2 px-6 rounded-lg flex items-center justify-center gap-1 mb-2 hover:bg-[#FF784A] hover:text-white transition min-w-[110px] cursor-pointer"
        onClick={addCartSuccess}
        type="button"
      >
        <CiShoppingCart size={20} />
        {isSoldOut ? "품절" : "담기"}
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