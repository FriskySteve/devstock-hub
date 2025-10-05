"use client";
import React, { useEffect, useState } from "react";
import Dropdown from "@/components/icons/Dropdown";
import { Category } from "@/lib/types";
import CurrencyInput from "react-currency-input-field";
import { useRouter, useSearchParams } from "next/navigation";

type FilterProps = {
  data: Category[];
};

const Filter = ({ data }: FilterProps) => {
  const [selectedCat, setSelectedCat] = useState<number[]>([]);
  const [minPrice, setMinPrice] = useState<string>();
  const [maxPrice, setMaxPrice] = useState<string>();
  const [isVisibleCat, setIsVisibleCat] = useState<boolean>(true);
  const [isVisiblePrice, setIsVisiblePrice] = useState<boolean>(true);
  const searchParams = useSearchParams();
  const router = useRouter();

  const changeHandler = (value: number) => {
    const updatedCategories = selectedCat.includes(value)
      ? selectedCat.filter((id) => id !== value)
      : [...selectedCat, value];
    setSelectedCat(updatedCategories);
  };

  const visibleCatHandler = () => {
    setIsVisibleCat(!isVisibleCat);
  };
  const visiblePriceHandler = () => {
    setIsVisiblePrice(!isVisiblePrice);
  };

  useEffect(() => {
    const updateParams = () => {
      const params = new URLSearchParams(searchParams.toString());
      if (selectedCat.length > 0) {
        params.set("categoryId", selectedCat.join(" "));
      } else {
        params.delete("categoryId");
      }
      if (minPrice) params.set("minPrice", minPrice);
      else params.delete("minPrice");
      if (maxPrice) params.set("maxPrice", maxPrice);
      else params.delete("maxPrice", maxPrice);
      router.push(`/product?${params.toString()}`);
    };
    updateParams();
  }, [minPrice, maxPrice, selectedCat, searchParams, router]);

  return (
    <>
      <div className="flex justify-between items-center pb-[16px]  ">
        <p className="text-[20px] font-semibold text-[var(--neutral-900)]">
          Category
        </p>
        <div
          className="text-[var(--neutral-900)]"
          onClick={() => visibleCatHandler()}
        >
          <Dropdown />
        </div>
      </div>
      <div
        className={`flex flex-col py-[8px] gap-[20px] text-[16px] text-[var(--neutral-900)] ${
          !isVisibleCat ? "hidden" : ""
        }`}
      >
        <label className="flex gap-[16px]">
          <input
            type="checkbox"
            checked={selectedCat.length === 0}
            onChange={() => setSelectedCat([])}
            className="w-[26px] h-[26px] bg-[var(--gray-400)] accent-[var(--primary-500)]"
          />
          All
        </label>
        {data.map((category) => (
          <label key={category.id} className="flex gap-[16px]">
            <input
              type="checkbox"
              value={category.id}
              checked={selectedCat.includes(category.id)}
              onChange={() => changeHandler(category.id)}
              className="w-[26px] h-[26px] accent-[var(--primary-500)]"
            />
            {category.name}
          </label>
        ))}
      </div>
      <div className="flex justify-between items-center pb-[16px] pt-[52px] ">
        <p className="text-[20px] font-semibold text-[var(--neutral-900)]">
          Price
        </p>
        <div
          className="text-[var(--neutral-900)]"
          onClick={() => visiblePriceHandler()}
        >
          <Dropdown />
        </div>
      </div>
      <div
        className={`flex flex-col gap-[16px] ${
          !isVisiblePrice ? "hidden" : ""
        }`}
      >
        <div className="flex items-center overflow-hidden">
          <CurrencyInput
            decimalsLimit={2}
            placeholder="$ Min Price"
            prefix="$"
            onValueChange={(value) => setMinPrice(value)}
            className="bg-[var(--base-white)] border border-r-0 border-[var(--gray-400)] rounded-l-md text-[var(--neutral-900)] text-[16px] py-[14px]  w-2/3 text-center "
          />
          <CurrencyInput
            placeholder="USD"
            className="bg-[var(--base-white)] border border-[var(--gray-400)] rounded-r-md text-[var(--neutral-900)] text-[16px] py-[14px]  w-1/3 text-center"
          />
        </div>
        <div className="flex items-center overflow-hidden">
          <CurrencyInput
            decimalsLimit={2}
            placeholder="$ Max Price"
            prefix="$"
            onValueChange={(value) => setMaxPrice(value)}
            className="bg-[var(--base-white)] border border-r-0 border-[var(--gray-400)] rounded-l-md text-[var(--neutral-900)] text-[16px] py-[14px] px-[18px] w-2/3"
          />
          <CurrencyInput
            placeholder="USD"
            className="bg-[var(--base-white)] border border-[var(--gray-400)] rounded-r-md text-[var(--neutral-900)] text-[16px] py-[14px]  w-1/3 text-center"
          />
        </div>
      </div>
    </>
  );
};

export default Filter;
