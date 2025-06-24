"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/hooks/useCart";
import { fetchPoints } from "@/libs/api";
import { toast } from "react-hot-toast";

const DELIVERY_FEE = Number(process.env.NEXT_PUBLIC_DELIVERY_FEE) || 3000;
const FREE_DELIVERY_THRESHOLD = Number(process.env.NEXT_PUBLIC_FREE_DELIVERY_THRESHOLD) || 20000;

export const metadata = {
  title: "주문서 | 어글리어스 쇼핑몰",
  description: "최종 결제 정보를 확인하고 주문을 완료하세요.",
  robots: { index: true, follow: true },
  openGraph: {
    title: "주문서 | 어글리어스 쇼핑몰",
    description: "어글리어스 쇼핑몰 주문서 페이지입니다.",
    url: "https://uglyus-assignment.vercel.app/order",
    type: "website",
    images: [
      {
        url: "https://placehold.co/1200x630?text=주문서",
        width: 1200,
        height: 630,
        alt: "주문서 대표이미지",
      },
    ],
  },
};

export default function OrderPage() {
  const { items, clearCart } = useCart();
  const [points, setPoints] = useState(0); // 보유 포인트
  const [usePoint, setUsePoint] = useState(false); // 포인트 사용 여부
  const [pointInput, setPointInput] = useState("");
  const [appliedPoints, setAppliedPoints] = useState(0); // 실제 적용 포인트
  const router = useRouter();

  useEffect(() => {
    fetchPoints().then(setPoints).catch(() => setPoints(0));
  }, []);

  // 주문 합계
  const totalPrice = items.reduce(
    (sum, { product, quantity }) => sum + product.price * quantity,
    0
  );
  const deliveryFee = totalPrice >= FREE_DELIVERY_THRESHOLD || totalPrice === 0 ? 0 : DELIVERY_FEE;

  // 입력값이 바뀔 때마다 적용 포인트 계산
  useEffect(() => {
    if (!usePoint) {
      setAppliedPoints(0);
      return;
    }
    const value = Math.max(
      0,
      Math.min(Number(pointInput || 0), points, totalPrice)
    );
    setAppliedPoints(value);
  }, [pointInput, points, totalPrice, usePoint]);

  // 최종 결제 금액
  const finalAmount = totalPrice + deliveryFee - appliedPoints;

  // 포인트 입력 핸들러
  const handlePointInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 숫자만 입력 허용
    const val = e.target.value.replace(/[^0-9]/g, "");
    setPointInput(val);
  };

  if (!items.length)
    return (
      <div className="max-w-2xl mx-auto px-4 py-10 text-center text-gray-500">
        주문할 상품이 없습니다.
        <Link href="/" className="py-3 mt-10 rounded-xl bg-[#FF784A] text-white text-lg font-bold block">상품 보러가기</Link>
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">주문서</h1>
      <ul className="divide-y">
        {items.map(({ product, quantity }) => (
          <li key={product.id} className="flex items-center py-4 gap-4">
            <div className="w-16 h-16 bg-gray-50 flex items-center justify-center rounded">
              <Image
                src={`/images/product_${product.id}.png`}
                alt={product.name}
                width={64}
                height={64}
                className="object-contain max-w-[65%] max-h-[65%] rounded"
              />
            </div>
            <div className="flex-1">
              <div className="font-bold">{product.name}</div>
              <div className="text-gray-500">{product.price.toLocaleString()}원</div>
            </div>
            <div className="font-medium text-gray-800">수량 {quantity}개</div>
          </li>
        ))}
      </ul>

      <div className="border-t pt-6 mt-6 mb-2 text-base">
        <div className="flex items-center justify-end gap-3 w-full">
          <div className="flex items-center gap-1">
            <input
              id="usePoint"
              type="checkbox"
              checked={usePoint}
              onChange={e => {
                setUsePoint(e.target.checked);
                if (!e.target.checked) setPointInput("");
              }}
              className="w-3 h-3 accent-[#FF784A]"
            />
            <label htmlFor="usePoint" className="font-medium text-gray-700 text-sm select-none">
              포인트 사용
            </label>
          </div>
          <input
            type="text"
            inputMode="numeric"
            placeholder="0"
            value={pointInput}
            onChange={handlePointInput}
            disabled={!usePoint}
            className="w-24 px-3 py-1 rounded border border-gray-200 bg-gray-50 text-right text-base focus:ring-2 focus:ring-[#FF784A] focus:outline-none disabled:bg-gray-100 disabled:text-gray-400 ml-3"
          />
          <span className="text-gray-700">원 사용</span>
        </div>
        <p className="text-sm text-right mt-3 text-gray-400 ml-3">
          (보유: <b className="text-[#FF784A]">{points.toLocaleString()}</b>원)
        </p>
        {usePoint && Number(pointInput) > Math.min(points, totalPrice) && (
          <div className="text-xs text-red-500 mt-1 text-right">
            사용 가능한 최대 포인트는 {Math.min(points, totalPrice).toLocaleString()}원입니다.
          </div>
        )}
      </div>

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
          <span className="text-right">
            {deliveryFee === 0 ? (
              <span className="text-green-600">무료</span>
            ) : (
              `${deliveryFee.toLocaleString()}원`
            )}
            {deliveryFee > 0 && FREE_DELIVERY_THRESHOLD - totalPrice > 0 && (
              <div className="text-xs text-right text-gray-400 mb-1">
                <span className="text-gray-800 font-bold">
                  {(FREE_DELIVERY_THRESHOLD - totalPrice).toLocaleString()}원
                </span>
                {` 더 구매 시 배송비 무료!`}
              </div>
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
          setTimeout(() => {
            router.push("/");
          }, 1000);
        }}
      >
        주문 완료하기
      </button>
    </div>
  );
}