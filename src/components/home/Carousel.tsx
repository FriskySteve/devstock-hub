"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/Button";
import GreaterThenIcon from "../icons/GreaterThenIcon";
import LessThenIcon from "../icons/LessThenIcon";
import RightArrow from "../icons/ArrowRight";
import Link from "next/link";

type Category = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
};

type CarouselProps = {
  categories: Category[];
};

export default function Carousel({ categories }: CarouselProps) {
  const [currentId, setCurrentId] = useState(0);
  const current = categories[currentId];

  const handlePrev = () => {
    setCurrentId((prev) => (prev > 0 ? prev - 1 : categories.length - 1));
  };

  const handleNext = () => {
    setCurrentId((prev) => (prev < categories.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="relative py-8  mx-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-[var(--gray-50)]">
        <div className="flex flex-col flex-1 justify-center pl-30 md:text-left sm:text-center md:items-start sm:items-center">
          <h2 className="text-3xl font-semibold text-[var(--neutral-900)] mb-4">
            {current.name}
          </h2>
          <p className="text-[var(--neutral-600)] pb-10 pt-2">
            {current.description}
          </p>
          <Link key={current.id} href={`/product?categoryId=${current.id}`}>
            <Button style="stroke" size="l">
              Explore Category <RightArrow />
            </Button>
          </Link>
        </div>
        <div className="h-80 relative justify-items-center overflow-hidden mx-[60px] md:mr-[120px]">
          {current.imageUrl ? (
            <Image
              src={current.imageUrl}
              alt={current.name}
              fill
              sizes="900px"
              className="object-cover rounded-xl rotate-[-34.55deg]"
            />
          ) : null}
        </div>
      </div>
      <div className="absolute inset-y-0 left-0 flex items-center">
        <button
          onClick={handlePrev}
          className="flex items-center justify-center bg-[var(--primary-500)] text-[var(--base-white)] px-3 py-2 rounded-tr-[6px] rounded-br-[6px] w-11 h-[74px]"
        >
          <LessThenIcon />
        </button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center">
        <button
          onClick={handleNext}
          className="flex items-center justify-center bg-[var(--primary-500)] text-[var(--base-white)] px-3 py-2 rounded-tl-[6px] rounded-bl-[6px] w-11 h-[74px]"
        >
          <GreaterThenIcon />
        </button>
      </div>
      <div className="flex justify-center gap-2 mt-6">
        {categories.map((_, idx) => (
          <span
            key={idx}
            className={`w-3 h-3 rounded-full ${
              idx === currentId
                ? "bg-[var(--primary-500)]"
                : "bg-[var(--gray-200)]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
