import ProductListSection from "@/components/ProductListSection";
import { fetchProducts } from "@/libs/api";

export default async function HomePage() {
  const { products } = await fetchProducts();
  console.log('products = ', products);

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <ProductListSection initialProducts={products} />
    </main>
  );
}