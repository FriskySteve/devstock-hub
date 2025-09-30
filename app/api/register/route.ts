import { NextRequest, NextResponse } from "next/server";
import { hashPassword } from "@/lib/auth";
import { handleError } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, phone, country } = body;

    if (!email || !password || !phone || !country) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    const { default: prisma } = await import("@/lib/prisma");

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { phone }],
      },
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return NextResponse.json(
          { success: false, message: "User with this email already exists" },
          { status: 409 }
        );
      }
      if (existingUser.phone === phone) {
        return NextResponse.json(
          {
            success: false,
            message: "User with this phone number already exists",
          },
          { status: 409 }
        );
      }
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        email,
        phone,
        password: hashedPassword,
        country,
        createdAt: new Date(),
      },
      select: {
        id: true,
        email: true,
        phone: true,
        country: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "User created successfully",
        data: newUser,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return handleError(error);
  }
}
