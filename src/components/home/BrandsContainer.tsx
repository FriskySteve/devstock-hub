import React from "react";
import ScrollableContainer from "../ScrollableContainer";
import LittleCard from "../LittleCard";

type Brand = {
  name: string;
  logoUrl: string;
};

type BrandsContainerProps = {
  brands: Brand[];
};

export default function BrandsContainer({ brands }: BrandsContainerProps) {
  const memoBrands = React.useMemo(() => brands, [brands]);

  return (
    <div className="flex flex-col px-10 gap-8">
      <ScrollableContainer title="Brands">
        {memoBrands.map((brand) => (
          <div key={brand.name} className="w-[260px] shrink-0">
            <LittleCard name={brand.name} iconUrl={brand.logoUrl} />
          </div>
        ))}
      </ScrollableContainer>
    </div>
  );
}
