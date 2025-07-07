"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/hooks/useCart";
import { FiTrash2 } from "react-icons/fi";
import { toast } from "react-hot-toast";

export default function CartPage() {
  const {
    items,
    fetchCart,
    changeQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // 총 합계 계산 (product 없을 때 방어)
  const total = items.reduce((sum, { product, quantity }) => {
    if (!product) return sum;
    return sum + product.price * quantity;
  }, 0);

  useEffect(() => {
    console.log("장바구니 변경됨", items);
  }, [items]);

  const handleQuantity = async (productId: number, quantity: number) => {
    try {
      await changeQuantity(productId, quantity);
    } catch (e: any) {
      toast.error(e?.message || "수량 변경 실패");
    }
  };

  const handleRemove = async (productId: number) => {
    try {
      await removeFromCart(productId);
    } catch (e: any) {
      toast.error(e?.message || "삭제 실패");
    }
  };

  const handleClear = async () => {
    try {
      await clearCart();
    } catch (e: any) {
      toast.error(e?.message || "전체 비우기 실패");
    }
  };

  // 💡 조건부 렌더는 return 문에서!
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">장바구니</h1>

      {items.length === 0 ? (
        <div className="text-center text-gray-500">
          장바구니에 담긴 상품이 없습니다.
          <Link
            href="/"
            className="py-3 mt-10 rounded-xl bg-[#FF784A] text-white text-lg font-bold block"
          >
            상품 보러가기
          </Link>
        </div>
      ) : (
        <>
          <ul className="space-y-4">
            {items.map(({ product, quantity }) =>
              product ? (
                <li
                  key={product.id}
                  className="flex items-center gap-4 border-b py-4"
                >
                  <div className="w-20 h-20 aspect-square bg-gray-50 flex items-center justify-center rounded-xl">
                    <Image
                      src={`/images/product_${product.id}.png`}
                      alt={product.name}
                      width={120}
                      height={120}
                      className="max-w-[65%] max-h-[65%] object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold">{product.name}</div>
                    <div className="text-gray-500">{product.price.toLocaleString()}원</div>
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        className="w-7 h-7 flex items-center justify-center cursor-pointer rounded-full border border-gray-300 bg-white text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition disabled:opacity-40 disabled:cursor-not-allowed"
                        onClick={() => handleQuantity(product.id, quantity - 1)}
                        disabled={quantity <= 1}
                        aria-label="수량 감소"
                      >-</button>
                      <span className="font-semibold">{quantity}</span>
                      <button
                        className="w-7 h-7 flex items-center justify-center cursor-pointer rounded-full border border-gray-300 bg-white text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition disabled:opacity-40 disabled:cursor-not-allowed"
                        onClick={() => handleQuantity(product.id, quantity + 1)}
                        aria-label="수량 증가"
                        disabled={quantity >= product.stock}
                      >+</button>
                      {quantity >= product.stock && (
                        <span className="text-xs text-red-500 ml-2">최대 수량입니다</span>
                      )}
                    </div>
                  </div>
                  <button
                    className="ml-2 w-8 h-8 flex items-center justify-center rounded-full border border-red-200 bg-red-50 text-red-500 hover:bg-red-100 transition"
                    onClick={() => handleRemove(product.id)}
                    aria-label="상품 삭제"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </li>
              ) : null
            )}
          </ul>
          <div className="flex justify-between items-center mt-8">
            <button
              className="px-4 py-2 rounded bg-gray-100 text-gray-500 text-xs font-medium border border-gray-200 hover:bg-gray-200 transition"
              onClick={handleClear}
            >
              비우기
            </button>
            <div className="font-bold text-lg text-gray-800">
              총 합계: <span className="text-[#FF784A]">{total.toLocaleString()}원</span>
            </div>
          </div>
          <Link
            href="/order"
            className="mt-6 w-full py-3 rounded-xl bg-[#FF784A] text-white text-lg font-bold shadow hover:bg-[#ff5400] transition text-center block"
          >
            주문하기
          </Link>
        </>
      )}
    </div>
  );
}