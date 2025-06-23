"use client";

import React, { useState, useEffect, useMemo } from "react";
import debounce from "lodash.debounce";
import type { Product } from "@/types/product";
import { useCart } from "@/hooks/useCart";
import SearchBar from "@/components/SearchBar";
import ProductList from "@/components/ProductList";
import { fetchProducts, fetchProductsTotalCount } from "@/libs/api";

const PAGE_SIZE = 8;

interface Props {
  initialProducts: Product[];
  initialTotal: number;
}

export default function ProductListSection({ initialProducts, initialTotal }: Props) {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(initialTotal);
  const { addToCart } = useCart();

  const debouncedSet = useMemo(
    () => debounce((v: string) => setDebouncedSearch(v), 300),
    []
  );
  const handleSearch = (value: string) => {
    setSearch(value);
    debouncedSet(value);
    setPage(1);
  };

  useEffect(() => {
    return () => debouncedSet.cancel();
  }, [debouncedSet]);

  // 검색어 or 페이지 변경 시, 두 개의 fetch 동시 실행
  useEffect(() => {
    // (A) 페이지 데이터 fetch
    fetchProducts({
      search: debouncedSearch,
      page,
      limit: PAGE_SIZE,
    }).then(setProducts);

    // (B) 총 개수 fetch (항상 1페이지로 돌아갈 때도)
    fetchProductsTotalCount(debouncedSearch).then(setTotal);
  }, [debouncedSearch, page]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <>
      <SearchBar value={search} onChange={handleSearch} />
      <ProductList products={products} onAddToCart={addToCart} />
      <div className="flex gap-2 justify-center mt-4 items-center">
        <button
          className="border px-3 py-1 rounded disabled:opacity-50"
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
        >
          이전
        </button>
        {/* 페이지 번호 */}
        {pageNumbers.map((num) => (
          <button
            key={num}
            className={`px-3 py-1 rounded ${num === page ? "bg-blue-500 text-white" : "border"}`}
            onClick={() => setPage(num)}
            disabled={num === page}
          >
            {num}
          </button>
        ))}
        <button
          className="border px-3 py-1 rounded disabled:opacity-50"
          disabled={page === totalPages || totalPages === 0}
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
        >
          다음
        </button>
      </div>
      <div className="text-center text-xs text-gray-500 mt-2">
        {total > 0 ? `총 ${total}개 상품, ${totalPages}페이지` : "검색 결과가 없습니다."}
      </div>
    </>
  );
}