import Detailer from "@/components/product/details/Detailer";
import Gallery from "@/components/product/details/Gallery";
import { Description } from "@/components/product/details/Description";
import Breadcrumb from "@/components/Breadcrumb";
import { getProductById } from "@/services/prismaServices";

type Params = Promise<{ id: string }>;

export default async function ProductDetails({ params }: { params: Params }) {
  try {
    const { id } = await params;
    const productId = Number(id);

    const product = await getProductById(productId);

    if (!product) {
      return <div>Produkt nie został znaleziony.</div>;
    }

    const today = new Date();
    const randomDays = Math.floor(Math.random() * 7) + 1;
    const deliveryDate = new Date(today);
    const deliveryDate2 = new Date(today);
    deliveryDate.setDate(today.getDate() + randomDays);
    deliveryDate2.setDate(deliveryDate.getDate() + randomDays);

    const deliveryDay = deliveryDate.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
    });
    const deliveryDay2 = deliveryDate2.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
    });

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
            price={product.price.toNumber()}
            deliveryDay={deliveryDay}
            deliveryDay2={deliveryDay2}
          />
          <Detailer
            id={productId}
            stock={product.stock}
            price={product.price.toNumber()}
          />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading product details:", error);
    return (
      <div className="p-[40px]">
        <h1>Wystąpił błąd podczas ładowania produktu</h1>
      </div>
    );
  }
}

// import Detailer from "@/components/product/details/Detailer";
// import Gallery from "@/components/product/details/Gallery";
// import { Description } from "@/components/product/details/Description";
// import { getData } from "@/services/getData";
// import Breadcrumb from "@/components/Breadcrumb";

// type Params = Promise<{ id: string }>;

// export default async function ProductDetails({ params }: { params: Params }) {
//   try {
//     const { id } = await params;
//     const { product, deliveryDay, deliveryDay2 } = await getData(
//       `/api/products/${id}`
//     );

//     return (
//       <div className="p-[40px]">
//         <div>
//           <Breadcrumb productName={product.name} />
//         </div>
//         <div className="flex justify-between gap-x-[32px]">
//           <Gallery name={product.name} images={product.images} />
//           <Description
//             name={product.name}
//             category={product.category.name}
//             desc={product.description}
//             price={product.price}
//             deliveryDay={deliveryDay}
//             deliveryDay2={deliveryDay2}
//           />
//           <Detailer
//             id={parseInt(id)}
//             stock={product.stock}
//             price={product.price}
//           />
//         </div>
//       </div>
//     );
//   } catch (error) {
//     console.error("Error loading product details:", error);
//     return <div>Wystąpił błąd podczas ładowania produktu.</div>;
//   }
// }
