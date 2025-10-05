import { NextRequest, NextResponse } from "next/server";
import { authService } from "@/services/auth";
import { handleError } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { emailOrMobile, password } = body;
    console.log("Login: ", emailOrMobile, password);
    const result = await authService.login({ emailOrMobile, password });
    console.log("Login result: ", result);

    if (!result.success) {
      const status =
        result.message === "User not found"
          ? 404
          : result.message === "Invalid credentials"
          ? 401
          : 400;
      return NextResponse.json(result, { status });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
}
