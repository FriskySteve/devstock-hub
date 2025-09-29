"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Sorter = () => {
  const [sorting, setSorting] = useState<string>("latest");
  const [showing, setShowing] = useState<string>("3");
  const showAtOnce = [3, 6, 9, 12];
  const sortOptions = [
    { val: "Latest", text: "Newly listed" },
    { val: "Asc", text: "Price highest" },
    { val: "Desc", text: "Price lowest" },
  ];
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const updateParams = () => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("sortBy", sorting);
      params.set("show", showing);
      router.push(`/product?${params.toString()}`);
    };
    updateParams();
  }, [router, searchParams, sorting, showing]);

  return (
    <div className="flex gap-[60px] pl-[40px]">
      <div className="flex items-center">
        <p className="text-[20px] font-semibold text-[var(--neutral-900)] pr-[16px]">
          Sort by
        </p>
        <select
          onChange={(element) => setSorting(element.target.value)}
          className="border rounded-md border-[var(--gray-400)] bg-[var(--base-white)] px-[16px] py-[10px] text-[14px] text-[var(--neutral-900)]"
        >
          {sortOptions.map((opt, index) => (
            <option key={index} value={opt.val}>
              {opt.text}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center">
        <p className="text-[20px] font-semibold text-[var(--neutral-900)] pr-[16px]">
          Show
        </p>
        <select
          onChange={(element) => setShowing(element.target.value)}
          className="border rounded-md border-[var(--gray-400)] bg-[var(--base-white)] px-[16px] py-[10px] text-[14px] text-[var(--neutral-900)]"
        >
          {showAtOnce.map((val, index) => (
            <option key={index} value={val}>
              {val}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Sorter;
