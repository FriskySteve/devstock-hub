import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    console.log("Full session:", JSON.stringify(session, null, 2));

    if (!session?.user) {
      console.log("No session or user");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userIdString = session.user.id;
    console.log("User ID from session (string):", userIdString);

    if (!userIdString) {
      console.log("No user ID in session");
      return NextResponse.json(
        { error: "No user ID in session" },
        { status: 401 }
      );
    }

    // Konwertuj string na Int
    const userId = parseInt(userIdString);
    console.log("User ID converted to int:", userId);

    if (isNaN(userId)) {
      console.log("Invalid user ID - cannot convert to integer");
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    // Test połączenia z bazą
    console.log("Testing database connection...");
    const userCount = await prisma.user.count();
    console.log("Total users in database:", userCount);

    // Sprawdź czy user istnieje
    const userExists = await prisma.user.findUnique({
      where: { id: userId }, // Teraz używamy Int
      select: {
        id: true,
        email: true,
        phone: true,
        createdAt: true,
      },
    });

    console.log("User exists:", userExists);

    if (!userExists) {
      console.log("User not found in database");
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Sprawdź czy istnieją tabele orders
    try {
      const orderCount = await prisma.order.count();
      console.log("Total orders in database:", orderCount);
    } catch (error) {
      console.log("Orders table might not exist:", error.message);
      return NextResponse.json({
        ...userExists,
        orders: [],
      });
    }

    // Jeśli wszystko OK, pobierz pełne dane
    const user = await prisma.user.findUnique({
      where: { id: userId }, // Int
      include: {
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

    return NextResponse.json(user);
  } catch (error) {
    console.error("Profile API Error:", error);
    console.error("Error stack:", error.stack);

    return NextResponse.json(
      {
        error: "Failed to fetch user data",
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";

// export async function GET() {
//   const session = await getServerSession(authOptions);

//   if (!session) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   try {
//     const user = await prisma.user.findUnique({
//       where: { id: session.user.id },
//       include: {
//         orders: {
//           orderBy: { createdAt: "desc" },
//           include: {
//             orderItems: {
//               include: {
//                 product: {
//                   select: {
//                     id: true,
//                     name: true,
//                     imageUrl: true,
//                   },
//                 },
//               },
//             },
//           },
//         },
//       },
//     });

//     if (!user) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     return NextResponse.json(user);
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to fetch user data" },
//       { status: 500 }
//     );
//   }
// }
