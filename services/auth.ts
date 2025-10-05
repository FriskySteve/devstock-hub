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
  /**
   * Validates user credentials for NextAuth credentials provider
   * @param params Login parameters (email/mobile and password)
   * @returns Login result with user data if successful
   */
  async login(params: LoginParams): Promise<LoginResult> {
    const { emailOrMobile, password } = params;

    console.log("AuthService: Login attempt for:", emailOrMobile);

    // Validate input
    if (!emailOrMobile || !password) {
      console.log("AuthService: Missing credentials");
      return {
        success: false,
        message: "Email or mobile and password are required",
      };
    }

    try {
      // Find user by email or phone
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

      // User not found
      if (!user) {
        console.log("AuthService: User not found");
        return {
          success: false,
          message: "Invalid credentials", // Generic message for security
        };
      }

      console.log("AuthService: User found:", user.id);

      // Check if user has a password (might be OAuth-only user)
      if (!user.password) {
        console.log("AuthService: User has no password");
        return {
          success: false,
          message: "Invalid credentials",
        };
      }

      // Verify password
      const passwordMatches = await bcrypt.compare(password, user.password);

      if (!passwordMatches) {
        console.log("AuthService: Password mismatch");
        return {
          success: false,
          message: "Invalid credentials",
        };
      }

      console.log("AuthService: Login successful for user:", user.id);

      // Return user data without password
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

  /**
   * Find user by ID for NextAuth session callback
   * @param userId User ID
   * @returns User data or null
   */
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

  /**
   * Find user by email for NextAuth
   * @param email User email
   * @returns User data or null
   */
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
