"use client";
import Filter from "@/components/product/Filter";
import Pagination from "@/components/product/ProductPagination";
import ProductGrid from "@/components/product/ProductGrid";
import Sorter from "@/components/product/Sorter";
import { Category } from "@/lib/types";
import type { Product } from "@/lib/types";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getCategories, getData } from "@/services/getData";

export default function Product() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [paginationUrl, setPaginationUrl] = useState<string>("");
  const searchParams = useSearchParams();
  useEffect(() => {
    const fetchCategories = async () => {
      // const data = await getData("/api/categories");
      const data = await getCategories();
      setCategories(data);
    };

    const fetchProducts = async () => {
      const params = new URLSearchParams(searchParams);
      const { products, page, totalPages } = await getData(
        `/api/products?${params.toString()}`
      );

      setProducts(products);
      setPage(page);
      setTotalPages(totalPages);

      params.delete("page");
      setPaginationUrl(`/product?${params.toString()}`);
    };

    fetchCategories();
    fetchProducts();
  }, [searchParams]);

  return (
    <div className="flex px-[40px] border-t border-[var(--gray-200)] my-10">
      <aside className="w-1/5 py-10 px-10 border-r border-[var(--gray-200)] mr-10">
        <Filter data={categories} />
      </aside>
      <main className="w-4/5 py-10">
        <Sorter />
        <ProductGrid data={products} />
        <Pagination page={page} totalPages={totalPages} url={paginationUrl} />
      </main>
    </div>
  );
}
