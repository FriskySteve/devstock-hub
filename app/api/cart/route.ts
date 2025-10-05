import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { NextResponse, NextRequest } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Received POST /api/cart body:", body);

    const productId = Number(body.productId);
    const quantity = Number(body.quantity);

    if (!productId || quantity < 1) {
      return NextResponse.json(
        { message: "Invalid productId or quantity" },
        { status: 400 }
      );
    }

    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { message: "Unauthorized operation" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ message: "Invalid user" }, { status: 404 });
    }

    let cart = await prisma.cart.findUnique({
      where: { userId: user.id },
      include: { items: true },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId: user.id },
        include: { items: true },
      });
    }

    const existingItem = cart.items.find(
      (item) => item.productId === productId
    );

    if (existingItem) {
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      });
    } else {
      const product = await prisma.product.findUnique({
        where: { id: productId },
      });
      if (!product) {
        return NextResponse.json(
          { message: "Product does not exist." },
          { status: 404 }
        );
      }
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId: product.id,
          quantity,
          addedPrice: product.price,
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: "Product added to cart.",
    });
  } catch (error) {
    console.error("POST /api/cart error:", error);
    return NextResponse.json(
      { message: "Internal server error in api/cart POST" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { message: "Unauthorized operation" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const cart = await prisma.cart.findUnique({
      where: { userId: user.id },
      include: {
        items: {
          include: {
            product: {
              include: {
                category: {
                  select: { id: true, name: true },
                },
              },
            },
          },
        },
      },
    });

    if (!cart || cart.items.length === 0) {
      return NextResponse.json({
        items: [],
        message: "Cart is empty",
      });
    }

    return NextResponse.json({
      success: true,
      items: cart.items,
      cartId: cart.id,
    });
  } catch (error) {
    console.error("GET /api/cart error:", error);
    return NextResponse.json(
      { message: "Internal server error in api/cart GET" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Received PATCH /api/cart body:", body);

    const itemId = Number(body.itemId);
    const quantity = Number(body.quantity);

    if (!quantity || quantity < 1 || isNaN(itemId)) {
      return NextResponse.json(
        { message: "Invalid itemId or quantity" },
        { status: 400 }
      );
    }

    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { message: "Unauthorized operation" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { cart: { include: { items: true } } },
    });

    if (!user?.cart) {
      return NextResponse.json({ message: "Cart not found" }, { status: 404 });
    }

    const item = user.cart.items.find((i) => i.id === itemId);
    if (!item) {
      return NextResponse.json(
        { message: "Cart product not found" },
        { status: 404 }
      );
    }

    const updatedItem = await prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity },
    });

    return NextResponse.json({
      success: true,
      item: updatedItem,
      message: "Cart item updated",
    });
  } catch (error) {
    console.error("PATCH /api/cart error:", error);
    return NextResponse.json(
      { message: "Internal server error in api/cart PATCH" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Received DELETE /api/cart body:", body);

    const itemId = Number(body.itemId);

    if (isNaN(itemId)) {
      return NextResponse.json({ message: "Invalid itemId" }, { status: 400 });
    }

    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { message: "Unauthorized operation" },
        { status: 401 }
      );
    }

    const item = await prisma.cartItem.findFirst({
      where: {
        id: itemId,
        cart: { user: { email: session.user.email } },
      },
    });

    if (!item) {
      return NextResponse.json(
        { message: "Product does not exist in cart" },
        { status: 404 }
      );
    }

    await prisma.cartItem.delete({ where: { id: itemId } });

    return NextResponse.json({
      success: true,
      message: "Item deleted from cart",
    });
  } catch (error) {
    console.error("DELETE /api/cart error:", error);
    return NextResponse.json(
      { message: "Internal server error in api/cart DELETE" },
      { status: 500 }
    );
  }
}
