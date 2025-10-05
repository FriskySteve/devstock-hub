import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authService } from "@/services/auth";

export const runtime = "nodejs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        emailOrMobile: {
          label: "Email or Mobile",
          type: "text",
          placeholder: "email@example.com or +48123456789",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.emailOrMobile || !credentials?.password) {
            console.log("Missing credentials");
            return null;
          }

          console.log("Attempting login for:", credentials.emailOrMobile);

          const result = await authService.login({
            emailOrMobile: credentials.emailOrMobile,
            password: credentials.password,
          });

          console.log("Login result:", {
            success: result.success,
            message: result.message,
          });

          if (!result.success || !result.user) {
            console.log("Login failed:", result.message);
            return null;
          }

          const user = {
            id: String(result.user.id),
            email: result.user.email,
            phone: result.user.phone,
          };

          console.log("Login successful, returning user:", user.id);
          return user;
        } catch (error) {
          console.error("Authorize error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email as string;
        token.phone = user.phone as string;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.phone = token.phone as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
