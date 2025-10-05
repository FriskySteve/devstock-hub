import { getProductById } from "@/services/getData";
import { NextRequest, NextResponse } from "next/server";

type Params = Promise<{ id: string }>;

export async function GET(req: NextRequest, { params }: { params: Params }) {
  const { id } = await params;
  const productId = Number(id);

  try {
    const product = await getProductById(productId);
    const { deliveryDay, deliveryDay2 } = product;

    return NextResponse.json({ product, deliveryDay, deliveryDay2 });
  } catch (e) {
    console.error(e, "fetching product details failed");
  }
}
