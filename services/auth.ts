import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export interface LoginParams {
  emailOrMobile: string;
  password: string;
}

export interface LoginResult {
  success: boolean;
  message: string;
  user?: {
    id: number;
    email: string | null;
    phone: string | null;
  };
}

export class AuthService {
  async login(params: LoginParams): Promise<LoginResult> {
    const { emailOrMobile, password } = params;

    console.log("AuthService: Login attempt for:", emailOrMobile);

    if (!emailOrMobile || !password) {
      console.log("AuthService: Missing credentials");
      return {
        success: false,
        message: "Email or mobile and password are required",
      };
    }

    try {
      const user = await prisma.user.findFirst({
        where: {
          OR: [{ email: emailOrMobile }, { phone: emailOrMobile }],
        },
        select: {
          id: true,
          email: true,
          phone: true,
          password: true,
        },
      });

      if (!user) {
        console.log("AuthService: User not found");
        return {
          success: false,
          message: "Invalid credentials",
        };
      }

      console.log("AuthService: User found:", user.id);

      if (!user.password) {
        console.log("AuthService: User has no password");
        return {
          success: false,
          message: "Invalid credentials",
        };
      }

      const passwordMatches = await bcrypt.compare(password, user.password);

      if (!passwordMatches) {
        console.log("AuthService: Password mismatch");
        return {
          success: false,
          message: "Invalid credentials",
        };
      }

      console.log("AuthService: Login successful for user:", user.id);

      const { password: _, ...userWithoutPassword } = user;

      return {
        success: true,
        message: "Login successful",
        user: userWithoutPassword,
      };
    } catch (error) {
      console.error("AuthService: Login error:", error);
      return {
        success: false,
        message: "An error occurred during login",
      };
    }
  }

  async getUserById(userId: number) {
    try {
      return await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          phone: true,
          country: true,
        },
      });
    } catch (error) {
      console.error("Get user by ID error:", error);
      return null;
    }
  }

  async getUserByEmail(email: string) {
    try {
      return await prisma.user.findUnique({
        where: { email },
        select: {
          id: true,
          email: true,
          phone: true,
          country: true,
        },
      });
    } catch (error) {
      console.error("Get user by email error:", error);
      return null;
    }
  }
}

export const authService = new AuthService();
