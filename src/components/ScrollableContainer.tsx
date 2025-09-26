"use client";

import React, { useRef, useState, useEffect, ReactNode } from "react";
import { Button } from "./Button";
import LittleCard from "../components/LittleCard";

type Brand = {
  name: string;
  logoUrl: string;
};

type ScrollableContainerProps = {
  title: string;
  children?: ReactNode;
  brands: Brand[];
};

export default function ScrollableContainer({
  title,
  children,
  brands,
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

  return (
    <div className="px-10">
      <div className="flex justify-between items-center">
        <h4 className="text-xl font-medium text-[var(--neutral-900)]">
          {title}
        </h4>
        <div className="flex gap-4 mt-4">
          {showStart && (
            // TODO dodac ikone strzalki
            <Button size={"l"} style={"text"} onClick={scrollToStart}>
              Scroll to Start
            </Button>
          )}
          {showEnd && (
            <Button size={"l"} style={"text"} onClick={scrollToEnd}>
              Scroll to End
            </Button>
          )}
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex flex-row gap-8 overflow-x-auto flex-nowrap py-2"
      >
        {brands.map((brand) => (
          <div key={brand.name} className="w-[260px] ">
            <LittleCard name={brand.name} iconUrl={brand.logoUrl} />
          </div>
        ))}
      </div>
    </div>
  );
}
