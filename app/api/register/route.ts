import { NextRequest, NextResponse } from "next/server";
import { UserService } from "@/services/userService";
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

    const newDate = new Date();

    const newUser = await UserService.createUser({
      email: email,
      password: password,
      phone: phone,
      country,
      createdAt: String(newDate),
      orders: [],
    });

    return NextResponse.json(
      { success: true, message: "User created successfully", data: newUser },
      { status: 201 }
    );
  } catch (error) {
    return handleError(error);
  }
}
