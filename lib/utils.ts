import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { NextResponse } from "next/server";
import { Product } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shuffle(items: Product[]) {
  const shuffledItems = items
    .map((p) => ({ sort: Math.random(), value: p }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value);

  const slicedItems = shuffledItems.slice(0, 6);
  return slicedItems;
}

export const handleError = (error: unknown): NextResponse => {
  return NextResponse.json(
    {
      error: error instanceof Error ? error.message : "Unknown error occurred",
    },
    { status: 500 }
  );
};
