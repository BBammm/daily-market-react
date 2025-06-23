import { useEffect, useState } from "react";
import type { Product } from "@/types/product";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then(res => res.json())
      .then(data => setProducts(data.products))
      .finally(() => setIsLoading(false));
  }, []);

  return { products, isLoading };
}