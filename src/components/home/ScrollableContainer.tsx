"use client";

import React, { useRef, useState, useEffect, ReactNode } from "react";
import Button from "../Button";
import LittleCard from "../../components/LittleCard";
import ProductCard from "../ProductCard";
import { Brand } from "@/lib/types";
import { Product } from "@/lib/types";
import ArrowRight from "../icons/ArrowRight";
import ArrowLeft from "../icons/ArrowLeft";

type ScrollableContainerProps = {
  title: string;
  children?: ReactNode;
  items: (Brand | Product)[];
};

export default function ScrollableContainer({
  title,
  children,
  items,
}: ScrollableContainerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);

  const updateScrollState = () => {
    if (scrollRef.current) {
      const el = scrollRef.current;
      setShowStart(el.scrollLeft > 5);
      setShowEnd(el.scrollLeft + el.clientWidth < el.scrollWidth - 5);
    }
  };

  useEffect(() => {
    updateScrollState();
    const el = scrollRef.current;
    if (!el) return;

    el.addEventListener("scroll", updateScrollState);
    window.addEventListener("resize", updateScrollState);

    return () => {
      if (el) el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [children]);

  const scrollToStart = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  };

  const scrollToEnd = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: scrollRef.current.scrollWidth,
        behavior: "smooth",
      });
    }
  };

  let content;
  if (title === "Brands") {
    content = (items as Brand[]).map((item) => (
      <div key={item.name} className="w-[220px] ">
        <LittleCard name={item.name} iconUrl={item.logoUrl} />
      </div>
    ));
  } else {
    content = (items as Product[]).map((item) => (
      <div key={item.id} className="w-[300px] ">
        <ProductCard data={item} />
      </div>
    ));
  }

  return (
    <div className="px-10">
      <div className="flex justify-between items-center">
        <h4 className="text-xl font-medium text-[var(--neutral-900)]">
          {title}
        </h4>
        <div className="flex gap-4 mt-4">
          {showStart && (
            <Button size={"l"} style={"text"} onClick={scrollToStart}>
              See less <ArrowLeft />
            </Button>
          )}
          {showEnd && (
            <Button size={"l"} style={"text"} onClick={scrollToEnd}>
              See all <ArrowRight />
            </Button>
          )}
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex flex-row gap-8 overflow-x-auto flex-nowrap py-2 scrollbar-hide"
      >
        {content}
      </div>
    </div>
  );
}
