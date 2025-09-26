import LittleCard from "../LittleCard";

type Brand = {
  name: string;
  logoUrl: string;
};

type BrandsContainerProps = {
  brands: Brand[];
};

export default function BrandsContainer({ brands }: BrandsContainerProps) {
  return (
    <div className="flex flex-col px-10 gap-8">
      <h4 className="text-xl font-medium text-[var(--neutral-900)]">Brands</h4>
      <div className="flex md:flex-row sm:flex-col md:justify-between sm:justify-center">
        {brands.map((brand) => (
          <LittleCard
            key={brand.name}
            name={brand.name}
            iconUrl={brand.logoUrl}
          />
        ))}
      </div>
    </div>
  );
}
