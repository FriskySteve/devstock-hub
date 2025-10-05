import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export const runtime = "nodejs";

interface OrderItem {
  productId: number;
  quantity: number;
  price: number;
}

interface Address {
  country: string;
  province: string;
  city: string;
  postalCode: string;
  addressLine: string;
  isMain: boolean;
}

interface OrderTotals {
  subtotal: number;
  shipping: number;
  insurance: number;
  serviceFee: number;
  protection: number;
  total: number;
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    console.log("Order request body:", body);

    const { items, address, shippingMethod, paymentMethod, totals } = body as {
      items: OrderItem[];
      address: Address | null;
      shippingMethod: string;
      paymentMethod: string;
      totals: OrderTotals;
    };

    if (!items || items.length === 0) {
      return NextResponse.json(
        { success: false, message: "No items in order" },
        { status: 400 }
      );
    }

    if (!totals || typeof totals.total !== "number") {
      return NextResponse.json(
        { success: false, message: "Invalid totals" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        addresses: true,
        cart: {
          include: {
            items: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    console.log("User found:", user.id);

    const productIds = items.map((item) => item.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    console.log("Products found:", products.length);

    if (products.length !== items.length) {
      const missingIds = productIds.filter(
        (id) => !products.find((p) => p.id === id)
      );
      return NextResponse.json(
        {
          success: false,
          message: "Some products not found",
          missingIds,
        },
        { status: 404 }
      );
    }

    const unavailableProducts = products.filter((product) => {
      const orderItem = items.find((item) => item.productId === product.id);
      return product.stock < (orderItem?.quantity || 0);
    });

    if (unavailableProducts.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Some products are out of stock",
          unavailableProducts: unavailableProducts.map((p) => p.name),
        },
        { status: 400 }
      );
    }

    let orderAddressId: number;

    if (address) {
      console.log("Creating new address");

      const newAddress = await prisma.address.create({
        data: {
          userId: user.id,
          country: address.country,
          province: address.province,
          city: address.city,
          postalCode: address.postalCode,
          addressLine: address.addressLine,
          isMain: address.isMain,
        },
      });
      orderAddressId = newAddress.id;

      console.log("Address created:", newAddress.id);

      if (address.isMain) {
        await prisma.address.updateMany({
          where: {
            userId: user.id,
            id: { not: newAddress.id },
          },
          data: { isMain: false },
        });
      }
    } else {
      console.log("Using existing main address");

      const mainAddress = user.addresses.find((addr) => addr.isMain);
      if (!mainAddress) {
        return NextResponse.json(
          { success: false, message: "No address selected or available" },
          { status: 400 }
        );
      }
      orderAddressId = mainAddress.id;
    }

    const order = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          userId: user.id,
          status: "PENDING",
          items: {
            create: items.map((item) => {
              const product = products.find((p) => p.id === item.productId);
              return {
                productId: item.productId,
                quantity: item.quantity,
                priceAtPurchase: product?.price || item.price,
              };
            }),
          },
        },
        include: {
          items: {
            include: {
              product: {
                select: {
                  id: true,
                  name: true,
                  price: true,
                  images: true,
                },
              },
            },
          },
        },
      });

      console.log("Order created:", newOrder.id);

      if (user.cart && user.cart.items.length > 0) {
        const cartItemIds = user.cart.items
          .filter((cartItem) =>
            items.some(
              (orderItem) => orderItem.productId === cartItem.productId
            )
          )
          .map((item) => item.id);

        if (cartItemIds.length > 0) {
          await tx.cartItem.deleteMany({
            where: { id: { in: cartItemIds } },
          });
          console.log("Cleared cart items:", cartItemIds.length);
        }
      }

      return newOrder;
    });

    console.log("Order transaction completed successfully");

    return NextResponse.json({
      success: true,
      message: "Order created successfully",
      order: {
        id: order.id,
        totalAmount: order.totalAmount,
        status: order.status,
        createdAt: order.createdAt,
        items: order.items.map((item) => ({
          id: item.id,
          quantity: item.quantity,
          purchasedPrice: item.priceAtPurchase,
          product: item.product,
        })),
        address: order.address,
      },
    });
  } catch (error) {
    console.error("Order creation error:", error);

    if (error instanceof Error) {
      if (error.message.includes("Foreign key constraint")) {
        return NextResponse.json(
          {
            success: false,
            message: "Invalid product or address reference",
          },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create order",
        error:
          process.env.NODE_ENV === "development" ? String(error) : undefined,
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get("orderId");

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    if (orderId) {
      const order = await prisma.order.findFirst({
        where: {
          id: Number(orderId),
          userId: user.id,
        },
        include: {
          items: {
            include: {
              product: {
                include: {
                  category: true,
                },
              },
            },
          },
          address: true,
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
    } else {
      const orders = await prisma.order.findMany({
        where: { userId: user.id },
        include: {
          items: {
            include: {
              product: {
                select: {
                  id: true,
                  name: true,
                  price: true,
                  images: true,
                },
              },
            },
          },
          address: true,
        },
        orderBy: { createdAt: "desc" },
      });

      return NextResponse.json({
        success: true,
        orders,
        count: orders.length,
      });
    }
  } catch (error) {
    console.error("Order fetch error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch orders",
        error:
          process.env.NODE_ENV === "development" ? String(error) : undefined,
      },
      { status: 500 }
    );
  }
}
