import prisma from "@/lib/prisma";
import { ProductDetails } from "@/lib/types";

export async function getCategories() {
  return await prisma.category.findMany();
}
export async function getAllProducts() {
  return await prisma.product.findMany();

export async function getProductById(id: number): Promise<ProductDetails> {
  const productRaw = await prisma.product.findUnique({
    where: { id },
    include: {
      category: {
        select: { id: true, name: true },
      },
    },
  });

  if (!productRaw) {
    throw new Error("Product not found");
  }

  const product = {
    ...productRaw,
    price: productRaw.price.toNumber(),
  };

  const today = new Date();
  const randomDays = Math.floor(Math.random() * 7) + 1;
  const deliveryDate = new Date(today);
  const deliveryDate2 = new Date(today);
  deliveryDate.setDate(today.getDate() + randomDays);
  deliveryDate2.setDate(deliveryDate.getDate() + randomDays);

  const deliveryDay = deliveryDate.toLocaleDateString("en-Us", {
    day: "numeric",
    month: "short",
  });
  const deliveryDay2 = deliveryDate2.toLocaleDateString("en-Us", {
    day: "numeric",
    month: "short",
  });

  return {
    product,
    deliveryDay,
    deliveryDay2,
  };
}

export async function getBrands() {
  return await prisma.brand.findMany();
}

export async function getData(url: string) {
  const baseUrl = process.env.DB_SERVER || "http://localhost:3000";

  try {
    const respond = await fetch(`${baseUrl}${url}`);
    if (!respond.ok) {
      throw new Error(`HTTP error! status: ${respond.status}`);
    }
    const data = await respond.json();
    return data;
  } catch (e) {
    console.error("getData error:", e);
    throw e;
  }
}
