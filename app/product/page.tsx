import Filter from "@/components/product/Filter";
import Pagination from "@/components/product/ProductPagination";
import ProductGrid from "@/components/product/ProductGrid";
import Sorter from "@/components/product/Sorter";
import { getCategories } from "@/services/getData";
import { productManager } from "@/services/productManager";

export default async function Product({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const filterParams = await searchParams;
  const categoriesData = await getCategories();

  const categoryIds = filterParams.categoryId
    ? String(filterParams.categoryId)
        .split(" ")
        .map((id) => parseInt(id))
    : undefined;

  const minPrice = filterParams.minPrice
    ? Number(filterParams.minPrice)
    : undefined;

  const maxPrice = filterParams.maxPrice
    ? Number(filterParams.maxPrice)
    : undefined;

  const sortBy = filterParams.sortBy ? String(filterParams.sortBy) : "latest";

  const show = filterParams.show ? Number(filterParams.show) : 3;

  const page = filterParams.page ? Number(filterParams.page) : 1;

  const { products, totalPages, currentPage } =
    await productManager.getProducts({
      categoryIds,
      minPrice,
      maxPrice,
      sortBy,
      show,
      page,
    });

  const params = new URLSearchParams(filterParams as Record<string, string>);
  params.delete("page");
  const paginationUrl = `/product?${params.toString()}`;

  return (
    <div className="flex px-[40px] border-t border-[var(--gray-200)] my-10">
      <div className="w-1/5 py-10 px-10 border-r border-[var(--gray-200)] mr-10">
        <Filter data={categoriesData} />
      </div>
      <div className="w-4/5 py-10">
        <Sorter />
        <ProductGrid data={products} />
        <Pagination
          page={currentPage}
          totalPages={totalPages}
          url={paginationUrl}
        />
      </div>
    </div>
  );
}
