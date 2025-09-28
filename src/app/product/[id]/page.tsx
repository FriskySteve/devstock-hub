import Detailer from "@/components/product/details/Detailer";
import Gallery from "@/components/product/details/Gallery";
import { Description } from "@/components/product/details/Description";
import { getData } from "@/services/getData";
import Breadcrumb from "@/components/Breadcrumb";

export default async function ProductDetails({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const { product, deliveryDay, deliveryDay2 } = await getData(
    `/api/products/${id}`
  );

  console.log("Page: ", product);

  return (
    <div className="p-[40px]">
      <div>
        <Breadcrumb productName={product.name} />
      </div>
      <div className="flex justify-between gap-x-[32px]">
        <Gallery name={product.name} images={product.images} />
        <Description
          name={product.name}
          category={product.category.name}
          desc={product.description}
          price={product.price}
          deliveryDay={deliveryDay}
          deliveryDay2={deliveryDay2}
        />
        <Detailer stock={product.stock} price={product.price} />
      </div>
    </div>
  );
}
