import { Product } from "@/lib/types";
import React from "react";
import ProductCard from "@/components/ProductCard";

type ProductGridProps = {
  data: Product[];
};

const ProductGrid = ({ data }: ProductGridProps) => {
  if (data.length === 0) return <p>No products found</p>;
  return (
    <div className="flex flex-wrap justify-between gap-y-[32px] gap-x-[48px] py-[40px]">
      {data.map((product) => (
        <ProductCard key={product.id} data={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
