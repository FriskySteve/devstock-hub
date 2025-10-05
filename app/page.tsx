import Carousel from "@/components/home/Carousel";
import CategoryContainer from "@/components/home/CategoryContainer";
import ScrollableContainer from "@/components/home/ScrollableContainer";
import { shuffle } from "@/lib/utils";
import { getBrands, getCategories, getAllProducts } from "@/services/getData";

export default async function Home() {
  const categories = await getCategories();
  const brands = await getBrands();
  const recommendedProducts = await getAllProducts();

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
      <ScrollableContainer items={brands} title="Brand" />
    </div>
  );
}
