"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/hooks/useCart"; // 경로에 맞게!
import { FiTrash2 } from "react-icons/fi";

export const metadata = {
  title: "장바구니 | 어글리어스 쇼핑몰",
  description: "담아둔 상품을 확인하고, 수량을 변경하거나 주문을 시작하세요.",
  robots: { index: true, follow: true },
  openGraph: {
    title: "장바구니 | 어글리어스 쇼핑몰",
    description: "어글리어스 쇼핑몰의 장바구니 페이지입니다.",
    url: "https://uglyus-assignment.vercel.app/cart",
    type: "website",
    images: [
      {
        url: "https://placehold.co/1200x630?text=장바구니",
        width: 1200,
        height: 630,
        alt: "장바구니 대표이미지",
      },
    ],
  },
};

export default function CartPage() {
  const { items, removeFromCart, changeQuantity, clearCart } = useCart();

  if (!items.length)
    return (
      <div className="max-w-2xl mx-auto px-4 py-10 text-center text-gray-500">
        장바구니에 담긴 상품이 없습니다.
        <Link href="/" className="py-3 mt-10 rounded-xl bg-[#FF784A] text-white text-lg font-bold block">상품 보러가기</Link>
      </div>
    );

  // 총 합계 계산
  const total = items.reduce((sum, { product, quantity }) => sum + product.price * quantity, 0);

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">장바구니</h1>
      <ul className="space-y-4">
        {items.map(({ product, quantity }) => (
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
                  onClick={() => changeQuantity(product.id, quantity - 1)}
                  disabled={quantity <= 1}
                  aria-label="수량 감소"
                >-</button>
                <span className="font-semibold">{quantity}</span>
                <button
                  className="w-7 h-7 flex items-center justify-center cursor-pointer rounded-full border border-gray-300 bg-white text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition disabled:opacity-40 disabled:cursor-not-allowed"
                  onClick={() => changeQuantity(product.id, quantity + 1)}
                  aria-label="수량 증가"
                >+</button>
              </div>
            </div>
            <button
              className="ml-2 w-8 h-8 flex items-center justify-center rounded-full border border-red-200 bg-red-50 text-red-500 hover:bg-red-100 transition"
              onClick={() => removeFromCart(product.id)}
              aria-label="상품 삭제"
            >
              <FiTrash2 size={18} />
            </button>
          </li>
        ))}
      </ul>

      <div className="flex justify-between items-center mt-8">
        <button
          className="px-4 py-2 rounded bg-gray-100 text-gray-500 text-xs font-medium border border-gray-200 hover:bg-gray-200 transition"
          onClick={clearCart}
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
    </div>
  );
}