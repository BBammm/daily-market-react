"use client";

import React, { useState } from "react";
import type { Product } from "@/types/product";
import { useCart } from "@/hooks/useCart";
import SearchBar from "@/components/SearchBar";
import ProductList from "@/components/ProductList";

interface Props {
  initialProducts: Product[];
}

export default function ProductListSection({ initialProducts }: Props) {
  const [search, setSearch] = useState("");
  const { addToCart } = useCart();

  // 검색어 필터링
  const filtered = (initialProducts ?? []).filter((item) =>
    item.name.includes(search)
  );

  return (
    <>
      <SearchBar value={search} onChange={setSearch} />
      <ProductList
        products={filtered}
        onAddToCart={addToCart}
      />
    </>
  );
}