"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href: string;
  isActive?: boolean;
}

interface BreadcrumbProps {
  productName?: string;
  homeLabel?: string;
  separator?: React.ReactNode;
  className?: string;
  customLabels?: Record<string, string>;
}

function formatSegment(
  segment: string,
  customLabels?: Record<string, string>
): string {
  if (customLabels && customLabels[segment]) {
    return customLabels[segment];
  }

  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function isId(segment: string): boolean {
  const uuidPattern =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  const numericPattern = /^\d+$/;

  return uuidPattern.test(segment) || numericPattern.test(segment);
}

export default function Breadcrumb({
  productName,
  homeLabel = "Home",
  separator = <ChevronRight size={16} className="text-[var(--neutral-500)]" />,
  className = "",
  customLabels,
}: BreadcrumbProps) {
  const pathname = usePathname();

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const segments = pathname.split("/").filter((segment) => segment !== "");
    const breadcrumbs: BreadcrumbItem[] = [];

    if (segments.length > 0) {
      breadcrumbs.push({
        label: homeLabel,
        href: "/",
      });
    }

    let currentPath = "";
    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      const isLastSegment = i === segments.length - 1;
      currentPath += `/${segment}`;

      if (isId(segment)) {
        let label: string;

        if (productName) {
          label = productName;
        } else if (i > 0) {
          const previousSegment = segments[i - 1];
          label = formatSegment(previousSegment, customLabels);
        } else {
          label = `Item ${segment.substring(0, 8)}`;
        }

        breadcrumbs.push({
          label,
          href: currentPath,
          isActive: isLastSegment,
        });
      } else {
        breadcrumbs.push({
          label: formatSegment(segment, customLabels),
          href: currentPath,
          isActive: isLastSegment,
        });
      }
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (pathname === "/" || breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center space-x-1 text-sm my-[40px] ${className}`}
    >
      <ol className="flex items-center space-x-1">
        {breadcrumbs.map((crumb, index) => (
          <li key={crumb.href + index} className="flex items-center">
            {index > 0 && (
              <span className="mr-1" aria-hidden="true">
                {separator}
              </span>
            )}

            {crumb.isActive ? (
              <span
                className="font-medium text-[16px] text-[var(--neutral-900)]"
                aria-current="page"
              >
                {crumb.label}
              </span>
            ) : (
              <Link
                href={crumb.href}
                className="font-medium text-[16px] text-[var(--neutral-500)] hover:text-[var(--neutral-700)] transition-colors cursor-pointer"
              >
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
