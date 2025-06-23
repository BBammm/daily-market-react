"use client";

import React, { useState, useEffect, useMemo } from "react";
import debounce from "lodash.debounce";
import { fetchProducts, fetchProductsTotalCount } from "@/libs/api";
import ProductList from "@/components/ProductList";
import SearchBar from "@/components/SearchBar";
import type { Product } from "@/types/product";
import Pagination from "@/shared/pagination/Pagination";

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

  useEffect(() => {
    console.log("fetch triggered, page:", page, "search:", debouncedSearch);
    fetchProducts({
      search: debouncedSearch,
      page,
      limit: PAGE_SIZE,
    }).then((data: Product[]) => {
      console.log('data = ', data);
      setProducts(data);
    });

    fetchProductsTotalCount(debouncedSearch).then(setTotal);
  }, [debouncedSearch, page]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <>
      <SearchBar value={search} onChange={handleSearch} />
      <ProductList products={products} />
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
      <div className="text-center text-xs text-gray-500 mt-2">
        {total > 0 ? `총 ${total}개 상품, ${totalPages}페이지` : "검색 결과가 없습니다."}
      </div>
    </>
  );
}