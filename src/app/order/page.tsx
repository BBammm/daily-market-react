"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useCart } from "@/hooks/useCart";
import { fetchPoints } from "@/libs/api"; // 실제 API 경로에 맞게
import { toast } from "react-hot-toast";

const DELIVERY_FEE = Number(process.env.NEXT_PUBLIC_DELIVERY_FEE) || 3000;
const FREE_DELIVERY_THRESHOLD = Number(process.env.NEXT_PUBLIC_FREE_DELIVERY_THRESHOLD) || 20000;

export default function OrderPage() {
  const { items, clearCart } = useCart();
  const [points, setPoints] = useState<number>(0);

  // 포인트 정보 불러오기 (GET /points)
  useEffect(() => {
    fetchPoints().then(setPoints).catch(() => setPoints(0));
  }, []);

  // 주문 합계 계산
  const totalPrice = items.reduce(
    (sum, { product, quantity }) => sum + product.price * quantity,
    0
  );

  // 배송비 계산
  const deliveryFee = totalPrice >= FREE_DELIVERY_THRESHOLD || totalPrice === 0 ? 0 : DELIVERY_FEE;

  // 포인트 적용 (최대 totalPrice만큼만)
  const appliedPoints = Math.min(points, totalPrice);

  // 최종 결제금액
  const finalAmount = totalPrice + deliveryFee - appliedPoints;

  if (!items.length)
    return (
      <div className="text-center text-gray-500 py-16">
        장바구니가 비어있습니다. <br />
        <Link href="/" className="underline text-blue-500">상품 보러가기</Link>
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">주문서</h1>
      <ul className="divide-y">
        {items.map(({ product, quantity }) => (
          <li key={product.id} className="flex items-center py-4 gap-4">
            <div className="w-20 h-20 bg-gray-50 aspect-square flex items-center justify-center rounded">
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
            </div>
            <div className="font-medium text-gray-800">수량 <span className="font-bold">{quantity}개</span></div>
          </li>
        ))}
      </ul>
      <div className="border-t pt-6 mt-6 space-y-2 text-lg">
        <div className="flex justify-between">
          <span>상품 금액 합계</span>
          <span>{totalPrice.toLocaleString()}원</span>
        </div>
        <div className="flex justify-between">
          <span>포인트 할인</span>
          <span className="text-blue-600">- {appliedPoints.toLocaleString()}원</span>
        </div>
        <div className="flex justify-between">
          <span>배송비</span>
          <span>
            {deliveryFee === 0 ? (
              <span className="text-green-600">무료</span>
            ) : (
              `${deliveryFee.toLocaleString()}원`
            )}
          </span>
        </div>
        <div className="flex justify-between font-bold text-xl border-t pt-4 mt-3">
          <span>최종 결제금액</span>
          <span className="text-[#FF784A]">{finalAmount.toLocaleString()}원</span>
        </div>
      </div>
      <button
        className="mt-6 w-full py-3 rounded-xl bg-[#FF784A] text-white text-lg font-bold shadow hover:bg-[#ff5400] transition"
        onClick={() => {
          clearCart();
          toast.success("주문이 완료되었습니다!");
        }}
      >
        주문 완료하기
      </button>
    </div>
  );
}