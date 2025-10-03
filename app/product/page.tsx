import Filter from "@/components/product/Filter";
import Pagination from "@/components/product/ProductPagination";
import ProductGrid from "@/components/product/ProductGrid";
import Sorter from "@/components/product/Sorter";
import { getCategories } from "@/services/getData";

export default async function Product({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const filterParams = await searchParams;
  const params = new URLSearchParams(filterParams as Record<string, string>);
  const categoriesData = await getCategories();

  const res = await fetch(
    `${
      process.env.DB_SERVER || "http://localhost:3000"
    }/api/products?${params.toString()}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return <div>Wystąpił błąd ładowania produktów.</div>;
  }

  const { products, page, totalPages } = await res.json();
  params.delete("page");
  const paginationUrl = `/product?${params.toString()}`;

  return (
    <div className="flex px-[40px]  border-t border-[var(--gray-200)] my-10">
      <div className="w-1/5 py-10 px-10 border-r border-[var(--gray-200)] mr-10">
        <Filter data={categoriesData} />
      </div>
      <div className="w-4/5 py-10">
        <Sorter />
        <ProductGrid data={products} />
        <Pagination page={page} totalPages={totalPages} url={paginationUrl} />
      </div>
    </div>
  );
}
