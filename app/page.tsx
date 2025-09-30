import Carousel from "@/components/home/Carousel";
import CategoryContainer from "@/components/home/CategoryContainer";
import ScrollableContainer from "@/components/home/ScrollableContainer";
import { getData } from "@/services/getData";
import { shuffle } from "@/lib/utils";
import prisma from "@/lib/prisma";
import { Product } from "@/lib/types";

export default async function Home() {
  // const categoriesData = await getData("/api/categories");
  // const brandsData = await getData("/api/brands");
  // const recommendedProductsData = await getData("/api/products/recomended");

  // if (!categoriesData || !brandsData || !recommendedProductsData)
  //   return <p>Error while fetching data. Please wait.</p>;

  const categories = await prisma.category.findMany();
  const brands = await prisma.brand.findMany();
  const recommendedProducts = await prisma.product.findMany({});

  // console.log("RECOMMENDED PRODUCTS:", recommendedProductsData.products);
  const productsWithNumberPrice = recommendedProducts.map((product) => ({
    ...product,
    price: Number(product.price),
  }));
  const shuffledRandomProducts = shuffle(productsWithNumberPrice);

  return (
    <div className="flex flex-col gap-[80px] pb-[80px]">
      <Carousel categories={categories} />
      <CategoryContainer categories={categories} />
      <ScrollableContainer
        items={shuffledRandomProducts}
        title="Recomendation"
      />
      <ScrollableContainer items={brands} title="Brands" />
    </div>
  );
}
