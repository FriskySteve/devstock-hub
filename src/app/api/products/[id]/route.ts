import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type Params = Promise<{ id: string }>;

export async function GET(req: NextRequest, { params }: { params: Params }) {
  const { id } = await params;
  const productId = Number(id);

  try {
    const product = await prisma.product.findUnique({
      where: { id: Number(productId) },
      include: {
        category: {
          select: { id: true, name: true },
        },
      },
    });

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

    return NextResponse.json({ product, deliveryDay, deliveryDay2 });
  } catch (e) {
    console.error(e, "fetching product details failed");
  }
}
