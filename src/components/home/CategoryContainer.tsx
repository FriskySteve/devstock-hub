"use client";

import LittleCard from "../LittleCard";

type Category = {
  name: string;
  iconUrl: string;
};

type CategoryContainerProps = {
  categories: Category[];
};

export default function CategoryContainer({
  categories,
}: CategoryContainerProps) {
  return (
    <div className="flex flex-col px-10 gap-8">
      <h4 className="text-xl font-medium text-[var(--neutral-900)]">
        Categories
      </h4>
      <div className="flex md:flex-row sm:flex-col md:justify-between sm:justify-center">
        {categories.map((category) => (
          // TODO dodac przekierwonie do kategorii
          <LittleCard
            key={category.name}
            name={category.name}
            iconUrl={category.iconUrl}
            logoUrl={category.iconUrl}
          />
        ))}
      </div>
    </div>
  );
}
