import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { handleError } from "@/lib/utils";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { emailOrMobile, password } = body;

    if (!emailOrMobile || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email or mobile and password are required",
        },
        { status: 400 }
      );
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: emailOrMobile }, { phone: emailOrMobile }],
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      return NextResponse.json(
        {
          success: false,
          message: `Invalid credentials, password: ${password}, user.password: ${user.password}`,
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Login successful",
        user: { id: user.id, email: user.email },
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error);
  }
}
