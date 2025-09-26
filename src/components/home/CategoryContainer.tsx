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
    <div className="flex flex-col px-10 gap-8 items-center md:items-start">
      <h4 className="text-xl font-medium text-[var(--neutral-900)]">
        Categories
      </h4>
      <div className="flex md:flex-row flex-col md:justify-between items-center gap-8 w-full ">
        {categories.map((category) => (
          // TODO dodac przekierwonie do kategorii
          // <div key={category.name}>
          <LittleCard
            key={category.name}
            name={category.name}
            iconUrl={category.iconUrl}
          />
        ))}
      </div>
    </div>
  );
}
