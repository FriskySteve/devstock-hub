import React from "react";
import Badge from "@/components/Badge";
import ShieldIcon from "@/components/icons/ShieldIcon";

type ProductDescProps = {
  name: string;
  category: string;
  desc: string;
  price: number;
  deliveryDay: string;
  deliveryDay2: string;
};

export const Description = ({
  name,
  category,
  desc,
  price,
  deliveryDay,
  deliveryDay2,
}: ProductDescProps) => {
  return (
    <div className="relative flex flex-col gap-y-[32px]">
      <div className="flex flex-col gap-[20px]">
        <p className="text-[28px] text-[var(--neutral-900)]">{name}</p>
        <Badge categoryName={category} />
      </div>
      <p className="text-[32px] text-[var(--neutral-900)]">${price}</p>
      <p className="text-[16px] text-[var(--neutral-900)] text-wrap">{desc}</p>
      <div className="flex flex-col gap-y-[16px] self-start absolute bottom-0 ">
        <p className="text-[18px] text-[var(--neutral-500)]">
          Shipping Available
        </p>
        <div className="flex w-[312px] border rounded-md border-[var(--neutral-900)] max-w-fit p-[16px]">
          <div className="pr-[8px]">
            <ShieldIcon />
          </div>
          <div>
            <p className="text-[16px] text-[var(--neutral-900)] font-medium">
              NexusHub Courier
            </p>
            <p className="text-[16px] text-[var(--neutral-600)] max-w-full">
              Estimated arrival {deliveryDay} - {deliveryDay2}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
