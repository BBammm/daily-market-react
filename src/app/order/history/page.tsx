"use client";

import { useState, useEffect } from "react";
import { orderHistory } from "@/libs/orderService";
import { format } from "date-fns";

export default function OrderHistoryPage() {
  const now = new Date();
  const [startDate, setStartDate] = useState(() =>
    new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7).getTime()
  );
  const [endDate, setEndDate] = useState(() =>
    new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
  );
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      // 밀리세컨드 단위로 요청
      const data = await orderHistory(startDate, endDate);
      setOrders(data.orders);
    })();
  }, [startDate, endDate]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">주문 내역</h1>
      <div className="mb-4 flex gap-2 items-center">
        <input
          type="date"
          value={format(new Date(startDate), "yyyy-MM-dd")}
          onChange={e =>
            setStartDate(new Date(e.target.value).getTime())
          }
          className="border rounded px-2 py-1"
        />
        <span>~</span>
        <input
          type="date"
          value={format(new Date(endDate), "yyyy-MM-dd")}
          onChange={e =>
            setEndDate(new Date(e.target.value).getTime())
          }
          className="border rounded px-2 py-1"
        />
      </div>
      {/* 주문 목록 렌더 */}
      {orders.length === 0 ? (
        <div className="text-gray-500 text-center py-10">해당 기간 내 주문이 없습니다.</div>
      ) : (
        <ul className="space-y-6">
          {orders.map(order => (
            <li key={order._id} className="border rounded p-4">
              <div className="font-bold text-lg mb-2">주문일: {format(new Date(order.createdAt), "yyyy-MM-dd HH:mm")}</div>
              <ul className="text-sm mb-2">
                {order.items.map((item: any, idx: any) => (
                  <li key={idx}>
                    {item.name} × {item.quantity}개 — {item.price.toLocaleString()}원
                  </li>
                ))}
              </ul>
              <div className="font-bold">총 결제: {order.totalAmount.toLocaleString()}원</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}