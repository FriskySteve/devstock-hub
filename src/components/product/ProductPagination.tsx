import Link from "next/link";
import React from "react";
import { Button } from "@/components/shared/Button";
import ArrowLeftIcon from "@/components/icons/ArrowLeft";
import ArrowRightIcon from "@/components/icons/ArrowRight";

type PaginationProps = {
  page: number;
  totalPages: number;
  url: string;
};

const Pagination = ({ page, totalPages, url }: PaginationProps) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-between">
      <div className="flex justify-start gap-[6px]">
        {pages.map((p) => (
          <Link key={p} href={`${url}&page=${p}`}>
            <div
              className={`rounded-md flex items-center justify-center text-[16px] cursor-pointer w-[44px] h-[44px] ${
                p === page
                  ? "bg-[var(--primary-500)] text-[var(--neutral-900)]"
                  : "text-[var(--neutral-500)]"
              }`}
            >
              {p}
            </div>
          </Link>
        ))}
      </div>
      <div className="flex gap-x-[32px]">
        <Link href={`${url}&page=${page > 1 ? page - 1 : 1}`}>
          <Button style="stroke" size="m">
            <ArrowLeftIcon />
            Previous
          </Button>
        </Link>
        <Link href={`${url}&page=${page < totalPages ? page + 1 : totalPages}`}>
          <Button style="stroke" size="m">
            Next
            <ArrowRightIcon />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Pagination;
