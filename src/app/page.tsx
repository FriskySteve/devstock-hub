import Carousel from "@/components/home/Carousel";
import CategoryContainer from "@/components/home/CategoryContainer";
import ScrollableContainer from "@/components/home/ScrollableContainer";
import { getData } from "@/components/services/getData";
import { shuffle } from "@/lib/utils";

export default async function Home() {
  const categoriesData = await getData("/api/categories");
  const brandsData = await getData("/api/brands");
  const recommendedProductsData = await getData("/api/products/recomended");
  const shuffledRandomProducts = shuffle(recommendedProductsData.products);

  return (
    <div className=" pb-[80px]">
      <Carousel categories={categoriesData.categories} />
      <CategoryContainer categories={categoriesData.categories} />
      <ScrollableContainer
        items={shuffledRandomProducts}
        title="Recomendation"
      />
      <ScrollableContainer items={brandsData.brands} title="Brands" />
    </div>
  );
}
