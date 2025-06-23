import ProductListSection from "@/components/ProductListSection";
import { fetchProducts, fetchProductsTotalCount } from "@/libs/api";

export default async function HomePage() {
  const [products, total] = await Promise.all([
    fetchProducts(), // 첫 페이지, 전체 데이터
    fetchProductsTotalCount(),
  ]);
  return (
    <main className="max-w-[1024px] w-full mx-auto px-4 py-8">
      <ProductListSection initialProducts={products} initialTotal={total} />
    </main>
  );
}