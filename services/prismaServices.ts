import prisma from "@/lib/prisma";
import { getData } from "./getData";

// const prisma = new PrismaClient();

export async function getCategories() {
  return prisma.category.findMany();
}

// export async function getProducts(params: Record<string, string>) {
//   const page = params.page ? parseInt(params.page) : 1;
//   const pageSize = 10;
//   const skip = (page - 1) * pageSize;

//   // Przykład prostej paginacji oraz filtrowania (do rozbudowy wg potrzeb)
//   const products = await prisma.product.findMany({
//     skip,
//     take: pageSize,
//     // tu można dodać where z filtrowaniem z params
//   });

//   const totalProducts = await prisma.product.count();

//   return {
//     products,
//     page,
//     totalPages: Math.ceil(totalProducts / pageSize),
//   };
// }

// export async function getProducts(filterParams: Record<string, string>) {
//   const { products } = await getData(
//     `${process.env.DB_SERVER}/api/products?${new URLSearchParams(
//       filterParams
//     ).toString()}`
//   );
//   return {
//     products: products.map((product: any) => ({
//       ...product,
//       category: { name: product.category?.name || "Default Category" },
//     })),
//     page: 1,
//     totalPages: 1,
//   };
// }

export async function getProductById(id: number) {
  return prisma.product.findUnique({
    where: { id },
    include: { category: true },
  });
}

export async function getProducts(params: {
  categoryId?: string;
  minPrice?: string;
  maxPrice?: string;
  sortBy?: string;
  show?: string;
  page?: string;
}) {
  const queryParams = new URLSearchParams();

  if (params.categoryId) queryParams.append("categoryId", params.categoryId);
  if (params.minPrice) queryParams.append("minPrice", params.minPrice);
  if (params.maxPrice) queryParams.append("maxPrice", params.maxPrice);
  if (params.sortBy) queryParams.append("sortBy", params.sortBy);
  if (params.show) queryParams.append("show", params.show);
  if (params.page) queryParams.append("page", params.page);

  const { products, totalPages } = await getData(
    `${process.env.DB_SERVER}/api/products?${queryParams.toString()}`
  );

  return {
    products: products.map((product: any) => ({
      ...product,
      category: { name: product.category?.name || "Default Category" },
    })),
    page: 1,
    totalPages: 1,
  };
}
