import BrandsContainer from "@/components/home/BrandsContainer";
import Carousel from "@/components/home/Carousel";
import CategoryContainer from "@/components/home/CategoryContainer";
import { getData } from "@/components/services/getData";

export default async function Home() {
  const categoriesData = await getData("/api/categories");
  const brandsData = await getData("/api/brands");
  console.log("brandsData", brandsData);

  return (
    <div>
      <Carousel categories={categoriesData.categories} />
      <CategoryContainer categories={categoriesData.categories} />
      <BrandsContainer brands={brandsData.brands} />
    </div>
  );
}
