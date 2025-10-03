import React from "react";
import { Button } from "@/components/shared/Button";

type CartDetailerProps = {
  totalQuantity: number;
  totalPrice: number;
};

const CartSummary = ({ totalQuantity, totalPrice }: CartDetailerProps) => {
  return (
    <div className="flex flex-col w-[423px] max-h-fit p-[24px] bg-[var(--base-white)] border border-border rounded-md max-[500px]:w-[350px] max-[1200px]:self-center">
      <p className="text-[18px] text-[var(--neutral-900)] font-medium pb-[16px]">
        Total Products
      </p>
      <div className="flex justify-between pb-[24px] border-b border-border">
        <p className="text-[16px] text-[var(--neutral-600)] font-medium ">
          Total Product Price ({totalQuantity} Item)
        </p>
        <p className="text-[18px] font-medium text-[var(--neutral-900)]">
          {totalPrice}
        </p>
      </div>
      <div className="pt-[24px]">
        <div className="flex justify-between items-center pb-[32px]">
          <p className="text-[18px] text-[var(--neutral-900)] font-medium">
            Subtotal
          </p>
          <p className="text-[28px] text-[var(--neutral-900)] font-medium">
            {totalPrice}
          </p>
        </div>
        <Button variant="fill" size="xl">
          <p className="text-[16px] text-[var(--base-white)]  font-medium ">
            Checkout
          </p>
        </Button>
      </div>
    </div>
  );
};

export default CartSummary;
