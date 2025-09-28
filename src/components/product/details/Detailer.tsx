"use client";
import React, { useState } from "react";
import { Button } from "@/components/shared/Button";
import MinusIcon from "@/components/icons/MinusIcon";
import PlusIcon from "@/components/icons/PlusIcon";
import CartIcon from "@/components/icons/CartIcon";
import { addItemToCart } from "@/services/addItemToCart";

type DetailerProps = {
  stock: number;
  price: number;
  id: number;
};

const Detailer = ({ stock, price, id }: DetailerProps) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [checked, setChecked] = useState(true);

  const handleCheckBoxClick = () => {
    setChecked((prev) => !prev);
  };

  const quantityHandler = (add: boolean) => {
    if (add) {
      if (quantity === stock) setQuantity(quantity);
      else setQuantity(quantity + 1);
    } else {
      if (quantity === 1) setQuantity(quantity);
      else setQuantity(quantity - 1);
    }
  };

  return (
    <div className="w-[423px] border rounded-md border-[var(--gray-200)] bg-[var(--base-white)] p-[24px] flex flex-col gap-y-[32px] max-h-fit">
      <div className="flex flex-col gap-y-[14px]">
        <p className="text-[18px] text-[var(--neutral-500)] font-medium">
          Colors
        </p>
        <div className="flex gap-x-[16px]">
          <div
            onClick={handleCheckBoxClick}
            className="w-[54px] h-[54px] bg-[var(--neutral-900)] border border-border rounded-md cursor-pointer flex items-center justify-center"
          >
            {checked && <span className="text-xl font-bold">✔</span>}
          </div>
          <div
            onClick={handleCheckBoxClick}
            className="w-[54px] h-[54px] text-footer border border-border rounded-md cursor-pointer flex items-center justify-center"
          >
            {!checked && (
              <span className="text-xl font-bold text-[var(--neutral-900)]">
                ✔
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-[14px]">
        <p className="text-[18px] text-[var(--neutral-500)] font-medium">
          Quantity
        </p>
        <div className="flex gap-x-[16px] items-center">
          <div className="flex border border-[var(--neutral-900)] rounded-md px-[20px] py-[14px] gap-x-[14px]">
            <div onClick={() => quantityHandler(false)}>
              <MinusIcon />
            </div>
            <p className="text-[16px] font-medium text-[var(--neutral-900)]">
              {quantity}
            </p>
            <div onClick={() => quantityHandler(true)}>
              <PlusIcon />
            </div>
          </div>
          <div className="flex gap-x-[6px]">
            <p className="text-[16px] text-[var(--neutral-900)] font-medium">
              Stock:
            </p>
            <p className="text-[16px] text-[var(--neutral-900)] font-medium">
              {stock}
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-[18px] text-[var(--neutral-500)] font-medium">
          Subtotal
        </p>
        <p className="text-[28px] text-[var(--neutral-900)] font-medium">
          ${(quantity * price).toFixed(2)}
        </p>
      </div>
      <Button
        onClick={() => addItemToCart(id, quantity)}
        style="stroke"
        size="xxl"
      >
        Add to Cart
        <CartIcon />
      </Button>
    </div>
  );
};

export default Detailer;
