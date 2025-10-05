import LittleCard from "../LittleCard";
import Link from "next/link";

type Category = {
  id: number;
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
    <div className="flex flex-col px-10 gap-8 items-center md:items-start">
      <h4 className="text-xl font-medium text-[var(--neutral-900)]">
        Category
      </h4>
      <div className="flex md:flex-row flex-col md:justify-between items-center gap-8 w-full ">
        {categories.map((category) => (
          <Link key={category.id} href={`/product?categoryId=${category.id}`}>
            <LittleCard
              key={category.name}
              name={category.name}
              iconUrl={category.iconUrl}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
