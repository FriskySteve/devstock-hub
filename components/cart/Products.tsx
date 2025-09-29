"use client";

import { CartItem } from "@/lib/types";
import React, { Dispatch, SetStateAction } from "react";
import Product from "./Product";

type CartProductsProps = {
  cart?: CartItem[];
  fetchCart: () => void;
  setSelected: Dispatch<SetStateAction<CartItem[]>>;
  selected: CartItem[];
};

const Products = ({
  selected,
  cart = [],
  fetchCart,
  setSelected,
}: CartProductsProps) => {
  const selectAllHandler = () => {
    if (selected.length === cart.length) {
      setSelected([]);
    } else {
      setSelected([...cart]);
    }
  };

  return (
    <div className="flex flex-col gap-y-[32px]">
      <div className="flex gap-x-[16px]">
        <input
          onChange={selectAllHandler}
          checked={selected.length === cart.length && cart.length > 0}
          type="checkbox"
          className="min-w-[26px] min-h-[26px] accent-[var(--primary-500)]"
        />
        <p className="text-[16px] text-[var(--neutral-900)] font-medium">
          Select All
        </p>
      </div>

      <div className="flex flex-col gap-y-[32px]">
        {cart.length > 0 ? (
          cart.map((item) => (
            <Product
              selected={selected}
              setSelected={setSelected}
              fetchCart={fetchCart}
              key={item.id}
              item={item}
            />
          ))
        ) : (
          <p className="text-neutral-400">Brak produktów w koszyku</p>
        )}
      </div>
    </div>
  );
};

export default Products;
