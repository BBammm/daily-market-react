"use client";

import { useCart } from "@/hooks/useCart";

export default function CartPage() {
  const { items, removeFromCart, changeQuantity, clearCart } = useCart();

  if (!items.length)
    return (
      <div className="text-center text-gray-500 py-16">
        장바구니에 담긴 상품이 없습니다.
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">장바구니</h1>
      <ul className="space-y-4">
        {items.map(({ product, quantity }) => (
          <li
            key={product.id}
            className="flex items-center gap-4 border-b py-4"
          >
            <img
              src={`/images/product_${product.id}.png`}
              alt={product.name}
              className="w-16 h-16 object-contain bg-gray-100 rounded"
            />
            <div className="flex-1">
              <div className="font-bold">{product.name}</div>
              <div className="text-gray-500">{product.price.toLocaleString()}원</div>
              <div className="flex items-center gap-2 mt-2">
                <button
                  className="px-2 rounded border"
                  onClick={() => changeQuantity(product.id, quantity - 1)}
                  disabled={quantity <= 1}
                >-</button>
                <span className="font-semibold">{quantity}</span>
                <button
                  className="px-2 rounded border"
                  onClick={() => changeQuantity(product.id, quantity + 1)}
                >+</button>
              </div>
            </div>
            <button
              className="ml-2 text-sm text-red-500 hover:underline"
              onClick={() => removeFromCart(product.id)}
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
      <button
        className="mt-8 w-full py-3 rounded bg-gray-200 text-gray-800 font-bold hover:bg-gray-300"
        onClick={clearCart}
      >
        장바구니 비우기
      </button>
    </div>
  );
}