import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";

export interface GetProductsParams {
  categoryIds?: number[];
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  show?: number;
  page?: number;
}

export interface GetProductsResult {
  products: Array<{
    id: number;
    name: string;
    price: number;
    stock: number;
    images: any;
    categoryId: number;
    createdAt: Date;
    category: { id: number; name: string };
  }>;
  total: number;
  totalPages: number;
  currentPage: number;
}

export class ProductManager {
  async getProducts(params: GetProductsParams): Promise<GetProductsResult> {
    const {
      categoryIds,
      minPrice,
      maxPrice,
      sortBy = "latest",
      show = 3,
      page = 1,
    } = params;

    const skip = (page - 1) * show;

    const where: Prisma.ProductWhereInput = {};

    if (categoryIds !== undefined && categoryIds.length > 0) {
      where.categoryId = { in: categoryIds };
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) where.price.gte = minPrice;
      if (maxPrice !== undefined) where.price.lte = maxPrice;
    }

    const orderBy = this.getSortOrder(sortBy);

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        select: {
          id: true,
          name: true,
          price: true,
          stock: true,
          images: true,
          categoryId: true,
          createdAt: true,
          category: { select: { id: true, name: true } },
        },
        orderBy,
        take: show,
        skip,
      }),
      prisma.product.count({ where }),
    ]);

    const totalPages = Math.ceil(total / show);

    return {
      products: products.map((product) => ({
        ...product,
        price: product.price.toNumber(),
      })),
      total,
      totalPages,
      currentPage: page,
    };
  }

  private getSortOrder(sortBy: string): Prisma.ProductOrderByWithRelationInput {
    switch (sortBy) {
      case "latest":
        return { createdAt: "desc" };
      case "asc":
        return { price: "asc" };
      case "desc":
        return { price: "desc" };
      default:
        return { createdAt: "desc" };
    }
  }
}

export const productManager = new ProductManager();
