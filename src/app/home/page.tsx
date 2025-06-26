import ProductListSection from "@/components/ProductListSection";
import { fetchProducts, fetchProductsTotalCount } from "@/libs/api";

export default async function HomePage() {
  const { items, total } = await fetchProducts({ page: 1, limit: 8 });
  return (
    <main className="max-w-[1024px] w-full mx-auto px-4 py-8">
      <ProductListSection initialProducts={items} initialTotal={total} />
    </main>
  );
}