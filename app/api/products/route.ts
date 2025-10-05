import { NextRequest, NextResponse } from "next/server";
import { productManager } from "@/services/productManager";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;

    const categoryIds = searchParams
      .get("categoryId")
      ?.split(" ")
      .map((id) => parseInt(id));

    const minPrice = searchParams.get("minPrice")
      ? Number(searchParams.get("minPrice"))
      : undefined;

    const maxPrice = searchParams.get("maxPrice")
      ? Number(searchParams.get("maxPrice"))
      : undefined;

    const sortBy = searchParams.get("sortBy") || "latest";
    const show = Number(searchParams.get("show")) || 3;
    const page = Number(searchParams.get("page")) || 1;

    const result = await productManager.getProducts({
      categoryIds,
      minPrice,
      maxPrice,
      sortBy,
      show,
      page,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
