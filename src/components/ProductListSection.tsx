"use client";

import React, { useState, useMemo, useCallback } from "react";
import debounce from "lodash.debounce";
import type { Product } from "@/types/product";
import { useCart } from "@/hooks/useCart";
import SearchBar from "@/components/SearchBar";
import ProductList from "@/components/ProductList";

interface Props {
  initialProducts: Product[];
}

export default function ProductListSection({ initialProducts }: Props) {
  const [search, setSearch] = useState("");          // 입력값 (실시간 반영)
  const [debouncedSearch, setDebouncedSearch] = useState(""); // debounce된 검색어
  const { addToCart } = useCart();

  const debouncedSet = useMemo(
    () => debounce((v: string) => setDebouncedSearch(v), 300),
    []
  );

  const handleSearch = (value: string) => {
    setSearch(value);
    debouncedSet(value);
  };

  React.useEffect(() => {
    return () => {
      debouncedSet.cancel();
    };
  }, [debouncedSet]);

  const filtered = (initialProducts ?? []).filter((item) =>
    item.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <>
      <SearchBar value={search} onChange={handleSearch} />
      <ProductList
        products={filtered}
        onAddToCart={addToCart}
      />
    </>
  );
}