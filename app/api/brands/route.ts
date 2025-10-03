import { NextResponse } from "next/server";
import { getBrands } from "@/services/getData";

export async function GET() {
  try {
    const brands = await getBrands();

    return NextResponse.json({ brands });
  } catch (e) {
    console.error("Prisma failed to fetch brands", e);
    return NextResponse.json(
      { error: "Failed to fetch brands" },
      { status: 500 }
    );
  }
}
