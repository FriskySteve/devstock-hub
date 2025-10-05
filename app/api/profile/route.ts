import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    console.log("Full session:", JSON.stringify(session, null, 2));

    if (!session?.user) {
      console.log("No session or user");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userEmail = session.user.email;

    if (!userEmail) {
      console.log("No user email in session");
      return NextResponse.json(
        { error: "No user email in session" },
        { status: 401 }
      );
    }

    console.log("Testing database connection...");
    const userCount = await prisma.user.count();
    console.log("Total users in database:", userCount);

    const userExists = await prisma.user.findUnique({
      where: { email: userEmail },
      select: {
        id: true,
        email: true,
        phone: true,
        country: true,
        createdAt: true,
      },
    });

    console.log("User exists:", userExists);

    if (!userExists) {
      console.log("User not found in database");
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    try {
      const orderCount = await prisma.order.count();
      console.log("Total orders in database:", orderCount);
    } catch (error) {
      console.log("Orders table might not exist:", error);
      return NextResponse.json({
        success: true,
        user: {
          ...userExists,
          orders: [],
        },
      });
    }

    const user = await prisma.user.findUnique({
      where: { email: userEmail },
      select: {
        id: true,
        email: true,
        phone: true,
        country: true,
        createdAt: true,
        orders: {
          orderBy: { createdAt: "desc" },
          include: {
            items: {
              include: {
                product: {
                  select: {
                    id: true,
                    name: true,
                    images: true,
                    price: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    console.log(
      "Successfully fetched user with orders:",
      user?.orders?.length || 0
    );

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Profile API Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch user data",
        details:
          process.env.NODE_ENV === "development" ? String(error) : undefined,
      },
      { status: 500 }
    );
  }
}
