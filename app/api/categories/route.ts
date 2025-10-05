import { NextResponse } from "next/server";
import { getCategories } from "@/services/getData";

export async function GET() {
  try {
    const categories = await getCategories();

    return NextResponse.json({ categories });
  } catch (e) {
    console.error("Prisma failed to fetch categories", e);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
