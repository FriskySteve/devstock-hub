import Image from "next/image";
import React from "react";
import Badge from "./Badge";
import { Product } from "@/lib/types";
import CartIcon from "./icons/CartIcon";
import Link from "next/link";

type ProductCardProps = {
  data: Product;
};

const ProductCard = ({ data }: ProductCardProps) => {
  return (
    <Link href={`/product/${data.id}`}>
      {" "}
      <div className="w-[300px] h-[386px] pt-[16px] pb-[20px] px-[16px] bg-[var(--base-white)] border rounded-md border-[var(--gray-200)] flex flex-col relative">
        <div className="text-[var(--neutral-900)] absolute top-8 left-8 z-10 flex h-8 w-8 items-center justify-center rounded-md bg-[var(--base-white)] hover:text-[var(--blaze-orange-50)]">
          <CartIcon />
        </div>
        <div className="relative w-full h-50 mb-[18px]">
          <Image
            src={data.images[0]}
            alt={data.name}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, 268px"
            priority
          />
        </div>
        <Badge categoryName={data.category.name} />
        <p className="text-[18px] text-[var(--neutral-900)] pt-[16px] pb-[8px]">
          {data.name}
        </p>
        <p className="text-[28px] text-[var(--neutral-900)] font-semibold">
          ${parseFloat(data.price.toString())}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
