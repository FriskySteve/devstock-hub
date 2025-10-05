import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const orderId = parseInt(params.id);

    if (isNaN(orderId)) {
      return NextResponse.json(
        { success: false, message: "Invalid order ID" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
        userId: user.id,
      },
      include: {
        items: {
          include: {
            product: {
              include: {
                category: {
                  select: {
                    id: true,
                    name: true,
                    imageUrl: true,
                  },
                },
                brand: {
                  select: {
                    id: true,
                    name: true,
                    logoUrl: true,
                  },
                },
              },
            },
          },
        },
        user: {
          select: {
            id: true,
            email: true,
            phone: true,
            country: true,
          },
        },
      },
    });

    if (!order) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Order fetch error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch order",
        error:
          process.env.NODE_ENV === "development" ? String(error) : undefined,
      },
      { status: 500 }
    );
  }
}
