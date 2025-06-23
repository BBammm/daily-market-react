import React from "react";
import type { Product } from "../types/product";
import ProductCard from "./ProductCard";

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export default function ProductList({ products, onAddToCart }: ProductListProps) {
  if (products.length === 0)
    return <div className="text-center text-gray-500">검색 결과가 없습니다.</div>;

  return (
    <ul className="grid gap-4">
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} onAddToCart={onAddToCart} />
        </li>
      ))}
    </ul>
  );
}